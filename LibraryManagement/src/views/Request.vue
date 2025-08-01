//vào sửa API khi lấy request thì lấy thêm tên sách và ảnh
<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold p-4"> Danh mục các yêu cầu đã gửi</h1>
      
        <InputSearch @search="handleSearch" />

         <div class="card shadow-sm border-0 mb-4">
    <div class="card-body">
        <h5 class="card-title mb-3 text-primary fw-bold">Bộ lọc trạng thái</h5>
        <div class="d-flex flex-column flex-md-row gap-4 align-items-start">
        <div class="form-check">
            <input
            type="checkbox"
            class="form-check-input"
            id="pending"
            v-model="filterStatus.pending"
            />
            <label class="form-check-label ms-2" for="pending">
            Đang chờ duyệt
            </label>
        </div>

        <div class="form-check">
            <input
            type="checkbox"
            class="form-check-input"
            id="approved"
            v-model="filterStatus.approved"
            />
            <label class="form-check-label ms-2" for="approved">
            Đã duyệt
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
            id="rejected"
            v-model="filterStatus.rejected"
            />
            <label class="form-check-label ms-2" for="rejected">
            Bị từ chối
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
        <RequestList v-if="!isStaff() && filteredRequestCount > 0"
            :requests="filteredRequests"
            @delete-request="deleteRequest"
         />

         <AllRequest v-if="isStaff() && filteredRequestCount > 0"
            :staff-id="readerId"
            :requests="filteredRequests"
            @delete-request="deleteRequest"
            @approve-request="handleApprove"
            @reject-request="handleReject"
            @borrowed-request="handleBorrowed"
            @returned-request="handleReturned"
            @lost-request="handleLost"    
            @pay-fine="handlePayFine"
         />

         

         
      <div v-else class="text-center py-5">
            <p class="text-muted">
                {{ searchText ? 'Vui lòng xem lại từ khoá' : 'Không có yêu cầu nào.' }}
            </p>
      </div>

      </div>

</template>
<script>
import RequestList from '@/components/RequestList.vue';
import InputSearch from '@/components/InputSearch.vue';
import BookService from '@/services/book.service';
import LibraryService from '@/services/library.service';
import AllRequest from '@/components/AllRequest.vue';
import readerService from '@/services/reader.service';

export default {
    components: {
        RequestList,
        InputSearch,
        AllRequest
    },
    data() {
        return {
            requests: [],
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
            if (this.filterStatus.pending) {
                filtered = filtered.filter(request => request.status === 'pending');
            }

            if (this.filterStatus.borrowed) {
                filtered = filtered.filter(request => request.status === 'borrowed');
            }

            if (this.filterStatus.rejected) {
                filtered = filtered.filter(request => request.status === 'rejected');
            }

        
            if (this.filterStatus.approved) {
                filtered = filtered.filter(request => request.status === 'approved');
            }

            if (this.filterStatus.lost) {
                filtered = filtered.filter(request => request.status === 'lost');
            }

            // Filter theo search text
            if (this.searchText) {
                const searchLower = this.searchText.toLowerCase();
                filtered = filtered.filter((request, index) => {
                    const requestString = [request.bookId, request.readerId, request.status, request.book?.tensach, request.book?.tacgia, request.reader?.email, request.reader?.firstname]
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
        }
    },

    async created() {  
    await this.getInfoReader();
    await this.fetchRequests();
    const isStaff = this.isStaff();
    console.log('Is staff:', isStaff);
    },

    methods: {

        isStaff() {
            const user = localStorage.getItem('user');
            if (!user) return false;
            const userInfo = JSON.parse(user);
            return userInfo && userInfo.role === 'staff'; // Kiểm tra role của user
        },
        handleSearch(searchValue) {
            this.searchText = searchValue;
        },
        
        handleSortChange() {
            console.log('Sort changed to:', this.sortBy);
        },

        async fetchRequests() {
            try {
                if(this.isStaff()) {
                    this.requests = await LibraryService.getAllBorrowRequest();
                } else {
                    this.requests = await LibraryService.getRequestsByReaderId(this.readerId);
                }
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
            this.error = 'Bạn cần đăng nhập để xem các yêu cầu mượn sách.';
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

        async deleteRequest(requestId) {
            console.log("Deleting request ID:", requestId);
            if(confirm("Bạn có chắc muốn xoá yêu cầu mượn sách này không ?")) {
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
        },

        async handleApprove(requestId) {
            if(!this.readerId) {
                alert("Không xác định được ID của bạn")
            }
            console.log("Approving request ID:", requestId);
            if(confirm("Bạn có chắc muốn duyệt yêu cầu mượn sách này không ?")) {
                try {
                    await LibraryService.approveRequest(requestId, this.readerId);
                    // Cập nhật lại danh sách requests sau khi duyệt
                    await this.fetchRequests();
                    
                    this.success = "Yêu cầu mượn đã được duyệt thành công.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                } catch (error) {
                    console.error('Error approving request:', error);
                    this.error = "Không thể duyệt yêu cầu mượn.";
                    
                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        }, 
        async handleBorrowed(requestId) {
            if(!this.readerId) {
                alert("Không xác định được ID của bạn")
            }
            console.log("Borrowing request ID:", requestId);
            if(confirm("Bạn có chắc muốn mượn sách này không ?")) {
                try {
                    await LibraryService.borrowed(requestId, this.readerId);
                    // Cập nhật lại danh sách requests sau khi duyệt
                   await this.fetchRequests();
                    
                    this.success = "Giao dịch mượn sách thành công.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                } catch (error) {
                    console.error('Error approving request:', error);
                    this.error = "Không thể duyệt yêu cầu mượn.";
                    
                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        },

        async handleReturned(requestId) {
            if(!this.readerId) {
                alert("Không xác định được ID của bạn")
            }
            console.log("Returning request ID:", requestId);
            if(confirm("Bạn có chắc muốn trả sách này không ?")) {
                try {
                    await LibraryService.returnBook(requestId, this.readerId);
                    // Cập nhật lại danh sách requests sau khi duyệt
                   await this.fetchRequests();
                    this.success = "Sách đã được trả thành công.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                } catch (error) {
                    console.error('Error returning book:', error);
                    this.error = "Không thể trả cuốn sách này.";
                    
                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        }, 

        async handleReject(requestId, staffId, reason) {
            if(!this.readerId) {
                alert("Không xác định được ID của bạn")
            }
            console.log("Rejecting request ID:", requestId);
            if(confirm("Bạn có chắc muốn từ chối yêu cầu mượn sách này không ?")) {
                try {
                    await LibraryService.rejectRequest(requestId, staffId, reason);
                    // Cập nhật lại danh sách requests sau khi duyệt
                   await this.fetchRequests();
                    this.success = "Yêu cầu mượn đã được từ chối.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                } catch (error) {
                    console.error('Error rejecting request:', error);
                    this.error = "Không thể từ chối yêu cầu mượn.";
                    
                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        },

        async handleLost(requestId) {
            if(!this.readerId) {
                alert("Không xác định được ID của bạn")
            }
            console.log("Lost request ID:", requestId);
            if(confirm("Bạn có chắc muốn đánh dấu sách này là mất không ?")) {
                try {
                    await LibraryService.lostBook(requestId, this.readerId);
                    // Cập nhật lại danh sách requests sau khi duyệt
                   await this.fetchRequests();
                    this.success = "Sách đã được đánh dấu là mất.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                } catch (error) {
                    console.error('Error marking book as lost:', error);
                    this.error = "Thao tác chưa được thực hiện. Vui lòng thử lại.";

                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        },

        async handlePayFine(readerId) {
            console.log("Paying fine for reader ID:", readerId);
            if(confirm("Bạn có chắc muốn thanh toán tiền phạt cho độc giả này không ?")) {
                try {
                    await readerService.payFine(readerId);
                    await this.fetchRequests();
                    this.success = "Thanh toán tiền phạt thành công.";
                    setTimeout(() => {
                        this.success = null;
                    }, 3000);
                    
                }catch(error) {
                    console.error('Error deleting request:', error);
                    this.error = "Không thể thanh toán tiền phạt này.";
                    // Clear error message sau 5s
                    setTimeout(() => {
                        this.error = null;
                    }, 5000);
                }
            }
        },
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
