<template>
  <div class="container">
    <h2 class="mb-4">Tạo yêu cầu mượn sách</h2>
    <p>Vui lòng điền các thông tin sau để tiến hành tạo yêu cầu mượn sách</p>
    
    <!-- Loading state -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <!-- Book data -->
  <div v-else-if="currentBook"
  class="d-flex flex-column flex-md-row align-items-stretch gap-4">
    <BookCard :book="currentBook" class="flex-fill" />
    <FormCreateBorrow 
    :bookId="bookId" 
    :book="currentBook" 
    :readerId="readerId" 
    @submit:request="handleSubmitRequest"
    class="flex-fill" />
</div>
  </div>
</template>

<script>
import FormCreateBorrow from '@/components/FormCreateBorrow.vue';
import BookCard from '@/components/BookCard.vue';
import bookService from '@/services/book.service'
import libraryService from '@/services/library.service';

export default {
  name: 'CreateRequest',
  components: {
    FormCreateBorrow,
    BookCard
  },
  data() {
    return {
      currentBook: null,
      loading: false,
      error: null, 
      readerId: null,
    };
  },
  computed: {
    bookId() {
      return this.$route.params.bookId;
    }
  },
  async created() {
    await this.fetchBookById();
    await this.getInfoReader();
  },
  watch: {
    '$route.params.bookId': {
      handler: 'fetchBookById',
      immediate: false
    }
  },
  methods: {
    async fetchBookById() {
      if (!this.bookId) {
        this.error = 'Book ID is required';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await bookService.getBookById(this.bookId);
        this.currentBook = response.data || response;
        console.log('Book data loaded:', this.currentBook);
      } catch (error) {
        console.error('Error fetching book:', error);
        this.error = 'Không thể tải thông tin sách. Vui lòng thử lại.';
        this.setDefaultBook();
      } finally {
        this.loading = false;
      }
    },

    async getInfoReader() {
        const reader = localStorage.getItem('user');
        if(!reader) {
            this.error = 'Bạn cần đăng nhập để mượn sách.';
            //chuyen huong den trang dang nhap sau 2s
            setTimeout(()=> {
                this.$router.push({ name: 'Login'})
            }, 2000);
            return;
        }
        const readerId  = JSON.parse(reader)._id;
        this.readerId = readerId;
        return readerId;
    },

    async handleSubmitRequest(payload) {
        if (!payload || !payload.bookId || !payload.readerId || !payload.expectedReturnDate) {
            this.error = 'Vui lòng điền đầy đủ thông tin yêu cầu.';
            return;
        }

        this.loading = true;
        this.error = null;

        try {
     
            await libraryService.borrowRequest(payload);
            this.$emit('request:submitted', payload);
            this.$router.push({ 
                name: 'Books',
                query: { success: 'Yêu cầu mượn sách đã được gửi thành công!' }
            });
        } catch (error) {
            console.error('Error submitting request:', error);
            this.error = 'Không thể gửi yêu cầu mượn sách. Vui lòng thử lại.';
        } finally {
            this.loading = false;
        }
    }

    
  }
};
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}

.container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.alert {
  margin-bottom: 1.5rem;
}
</style>