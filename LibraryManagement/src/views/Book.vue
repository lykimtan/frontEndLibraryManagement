<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold p-4"> Danh mục sách</h1>
        <InputSearch @search="handleSearch" />
        <div>
            <BookList 
                v-if="filteredBookCount > 0"
                :books="filteredBooks" 
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
            loading: false
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
        }
    },
    async mounted() {
        console.log('Book component mounted');
        await this.retrieveBooks();
    }
}
</script>
<style scoped>
.icon{
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}
</style>