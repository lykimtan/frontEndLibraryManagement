<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold p-4"> Danh mục sách</h1>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>
        <InputSearch @search="handleSearch" />
        <div>
            <BookList 
                v-if="filteredBookCount > 0"
                :books="filteredBooks" 
                @delete-book="handleDeleteBook"
            />
            <div v-else class="text-center py-5">
                <img class="icon" src="@/assets/notfound.svg" alt="">
                <h4 class="text-muted">Không tìm thấy sách nào phù hợp với từ khoá tìm kiếm</h4>
                <p class="text-muted">
                    {{ searchText ? 'Vui lòng xem lại từ khoá' : 'Loading books...' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue';
import BookList from '@/components/BookList.vue';
import BookService from '@/services/book.service';

export default {
    name: 'BookPage',
    components: {
        InputSearch,
        BookList
    },
    data() {
        return {
            books: [],
            searchText: '',
            loading: false,
            error: null,
            success: null
        };
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { tensach, nxb, tacgia, soquyen } = book;
                return [tensach, nxb, tacgia, soquyen]
                    .filter(item => item) 
                    .join(' ')
                    .toLowerCase();
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            
            const searchLower = this.searchText.toLowerCase();
            return this.books.filter((_book, index) => 
                this.bookStrings[index].includes(searchLower)
            );
        },
        filteredBookCount() {
            return this.filteredBooks.length;
        }
    },
    methods: {
        handleSearch(searchValue) {
            this.searchText = searchValue;
        },
        async retrieveBooks() {
            this.loading = true;
            try {
                this.books = await BookService.getAllBooks();
                console.log('Books loaded:', this.books);
            } catch (error) {
                console.error('Error retrieving books:', error);
            } finally {
                this.loading = false;
            }
        },

        async handleDeleteBook(bookId) {
            if (confirm("Bạn có chắc muốn xoá sách này không?")) {
            try {
                console.log('Deleting book with ID:', bookId);
                
                const response = await BookService.deleteBook(bookId); // ← Thêm const
                
                console.log('Delete response:', response);
                this.success = 'Xoá sách thành công!';
                await this.retrieveBooks(); // Reload danh sách
                
                // Clear success message sau 3s
                setTimeout(() => {
                    this.success = null;
                }, 3000);    
            } catch (error) {
                console.error('Error deleting book:', error);
                this.error = error.response?.data?.message || 'Không thể xoá sách này.';
                
                // Clear error message sau 5s
                setTimeout(() => {
                    this.error = null;
                }, 5000);
            }
        }
    },
    

        
    },
    async mounted() {
        console.log('Book component mounted');
        await this.retrieveBooks();

        const successMassage = this.$route.query.success;
        if(successMassage) {
            this.success = successMassage;
            setTimeout(() => {
                this.success = null;
                this.$router.replace({query: {}}); //xoá bỏ query sau khi đã thông báo xong
            }, 3000);
        }
    },
    }
</script>
<style scoped>
.icon{
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}
</style>