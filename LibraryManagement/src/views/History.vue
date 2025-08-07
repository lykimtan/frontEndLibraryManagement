<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold p-4"> Lịch sử mượn</h1>
      
        <InputSearch @search="handleSearch" />

         <div class="card shadow-sm border-0 mb-4">
  <div class="card-body">
    <h5 class="card-title mb-3 text-primary fw-bold">Bộ lọc trạng thái</h5>
        <div class="d-flex flex-column flex-md-row gap-4 align-items-start">
        <div class="form-check">
            <input
            type="checkbox"
            class="form-check-input"
            id="returned"
            v-model="filterStatus.returned"
            />
            <label class="form-check-label ms-2" for="returned">
            Đã trả
            </label>
        </div>

        <div class="form-check">
            <input
            type="checkbox"
            class="form-check-input"
            id="borrowed"
            v-model="filterStatus.borrowed"
            />
            <label class="form-check-label ms-2" for="borrowed">
            Đã mượn
            </label>
        </div>

        <div class="form-check">
            <input
            type="checkbox"
            class="form-check-input"
            id="lost"
            v-model="filterStatus.lost"
            />
            <label class="form-check-label ms-2" for="lost">
            Mất sách
            </label>
        </div>

           <div class="d-flex align-items-start gap-2">
            <label for="sortBy" class="form-label fw-bold text-secondary">Sắp xếp theo thời gian:</label>
            <select 
                id="sortBy" 
                class="form-select" 
                v-model="sortBy"
                style="max-width: 250px;"
            >
                <option value="default">Mặc định</option>
                <option value="date-desc">Mới nhất trước</option>
                <option value="date-asc">Cũ nhất trước</option>
            </select>
        </div>
        </div>
    </div>
    </div>
        <div v-if="error" class="alert alert-danger">
        {{ error }}
        </div>

        <div v-if="success" class="alert alert-success">
        {{ success }}</div>
        <BorrowHistory
            v-if="filteredRequestCount > 0"
            :requests="filteredRequests"
            @delete-request="deleteRequest"
            :reader="reader"
         />
         
      <div v-else class="text-center py-5">
            <p class="text-muted">
                {{ searchText ? 'Vui lòng xem lại từ khoá' : 'Không có yêu cầu nào.' }}
            </p>
      </div>

      </div>

</template>

<script>
import InputSearch from '@/components/InputSearch.vue';
import BorrowHistory from '@/components/BorrowHistory.vue';
import BookService from '@/services/book.service';
import LibraryService from '@/services/library.service';
import readerService from '@/services/reader.service';

export default {
    components: {
        BorrowHistory,
        InputSearch,
    },
    data() {
        return {
            requests: [],
            reader: {},
            error: null,
            searchText: '',
            success: null,
            readerId: null,
            filterStatus: {
                pending: false,
                approved: false,
                rejected: false,
                borrowed: false,
                returned: false
            },
            sortBy: 'default' // 'default', 'date-asc', 'date-desc'
        }
    },

    computed: {
        RequestString() {
            return this.requests.map((request) => {
                const { bookId, readerId, status} = request;
                const { tensach, tacgia} = request.book;

                return [bookId, readerId, status, tensach, tacgia]
                    .filter(item => item) 
                    .join(' ')
                    .toLowerCase();
            });
        },
        filteredRequests() {
            let filtered = this.requests;
            
            // Filter theo status
            if (this.filterStatus.returned) {
                filtered = filtered.filter(request => request.status === 'returned');
            }

            if (this.filterStatus.borrowed) {
                filtered = filtered.filter(request => request.status === 'borrowed');
            }

            // Filter theo search text
            if (this.searchText) {
                const searchLower = this.searchText.toLowerCase();
                filtered = filtered.filter((request, index) => {
                    const requestString = [request.bookId, request.readerId, request.status, request.book?.tensach, request.book?.tacgia]
                        .filter(item => item)
                        .join(' ')
                        .toLowerCase();
                    return requestString.includes(searchLower);
                });
            }

            // Sắp xếp theo thời gian
            if (this.sortBy === 'date-asc') {
                filtered = filtered.sort((a, b) => {
                    const dateA = new Date(a.createdDate);
                    const dateB = new Date(b.createdDate);
                    return dateA - dateB; // Cũ nhất trước
                });
            } else if (this.sortBy === 'date-desc') {
                filtered = filtered.sort((a, b) => {
                    const dateA = new Date(a.createdDate);
                    const dateB = new Date(b.createdDate);
                    return dateB - dateA; // Mới nhất trước
                });
            }
            
            return filtered;
        },
        filteredRequestCount() {
            return this.filteredRequests.length;
        },
    },

    async created() {  
    await this.getInfoReader();
    if (this.readerId) { // Chỉ fetch khi có readerId
        await this.fetchRequests();
        await this.getDetailedInfoReader(this.readerId);
    }
    },

    methods: {
        handleSearch(searchValue) {
            this.searchText = searchValue;
        },
        
        handleSortChange() {
            console.log('Sort changed to:', this.sortBy);
        },
        async fetchRequests() {
            try {
                this.requests = await LibraryService.getRequestsHistoryByReaderId(this.readerId);
                console.log("Requests fetched:", this.requests);
                if (!this.requests || this.requests.length === 0) {
                    return this.requests = [];
                } 
                return this.requests;
            } catch (error) {
                console.error("Error fetching requests:", error);
                // this.error = "Failed to fetch requests.";
            }
        },

        async getInfoReader() {
        const reader = localStorage.getItem('user');
        if(!reader) {
            this.error = 'Bạn cần đăng nhập để xem lịch sử mượn sách';
            //chuyen huong den trang dang nhap sau 2s
            setTimeout(()=> {
                this.$router.push({ name: 'Login'})
            }, 2000);
            return;
        }
        const readerId  = JSON.parse(reader)._id;
        this.readerId = readerId;
        console.log("Reader ID:", readerId);
        return readerId;
        },

        async getDetailedInfoReader(readerId) {
            return readerService.getReaderById(readerId)
                .then(reader => {
                    this.reader = reader;
                    console.log("Reader info fetched:", this.reader);
                })
                .catch(error => {
                    console.error("Error fetching reader info:", error);
                    this.error = "Không thể lấy thông tin người đọc.";
                });     
        } ,

        async deleteRequest(requestId) {
            console.log("Deleting request ID:", requestId);
            if(confirm("Bạn có chắc muốn xoá lịch sử mượn này không ?")) {
                try {
                    await LibraryService.deleteRequest(requestId);
                    //xoá xong loại bỏ request có id đã bị xoá khỏi mảng requests để phần tử đó không hiển thị nữa
                    this.requests = this.requests.filter(request => request._id !== requestId);
                    
                    this.success = "Yêu cầu mượn đã được xoá thành công.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                }catch(error) {
                    console.error('Error deleting request:', error);
                    this.error = "Không thể xoá yêu cầu mượn.";
                    
                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        }
    },
    async mounted() {
        console.log('Request component mounted');
        const successMessage = this.$route.query.success;
        if(successMessage) {
            this.success = successMessage;
            setTimeout(() => {
                this.success = null;
                this.$router.replace({query: {}});
            }, 3000);
        }
    },

}
</script>
