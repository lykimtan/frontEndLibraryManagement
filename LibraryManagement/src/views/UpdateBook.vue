<template>
    <div class="container">
        <div v-if="error" class="alert alert-danger">
            {{ error }}
        </div>

        <div v-if="success" class="alert alert-success">
            {{ success }}
        </div>
        
        <div v-if="loading" class="text-center">
            <p>Đang tải thông tin sách...</p>
        </div>
        
        <!-- Chỉ render FormBookInfo khi đã có book data -->
        <FormBookInfo
            v-if="book && !loading"
            :book="book"
            @submit="handleSubmit"
            @cancel="handleCancel"
            class="mt-4"
        />
        
        <!-- Hiển thị thông báo nếu không có book và không loading -->
        <div v-if="!book && !loading && !error" class="text-center">
            <p>Không tìm thấy thông tin sách</p>
        </div>
    </div>
</template>

<script>
import FormBookInfo from '@/components/FormBookInfo.vue';
import bookService from '@/services/book.service';


export default {
  name: 'UpdateBook',
  components: {
    FormBookInfo
  },
  data() {
    return {
      book: null,
      error: null,
      success: null,
      loading: false
    };
  },

  methods: {
    async getBookDetails(bookId) {
      try {
        this.loading = true;
        console.log('Fetching book with ID:', bookId);
        const response = await bookService.getBookById(bookId);
        this.book = response;
        console.log('Book loaded successfully:', this.book);
      } catch (error) {
        console.error('Error fetching book:', error);
        this.error = 'Failed to fetch book details';
      } finally {
        this.loading = false;
      }
    },


    async handleSubmit(bookData) {
      try {
        const bookId = this.$route.params.bookId; // Sử dụng route params
        console.log('Updating book with ID:', bookId);
        console.log('Book data:', bookData);
        
        await bookService.updateBook(bookId, bookData);
        this.success = 'Cập nhật sách thành công!';
        
        // Navigate về trang sách sau 2s
        setTimeout(() => {
          this.$router.push({ name: 'Books' });
        }, 1500);
        
      } catch (error) {
        console.error('Error updating book:', error);
        this.error = 'Failed to update book';
      }
    },

    handleCancel() {
      this.$router.push({ name: 'Books' });
    },
  },


  created() {
    const bookId = this.$route.params.bookId;
    console.log('Book ID from route:', bookId);
    this.getBookDetails(bookId);
    console.log('Book details fetched:', this.book);
  }
};
</script>