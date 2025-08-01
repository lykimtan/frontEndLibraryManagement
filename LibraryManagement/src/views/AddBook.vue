<template>
    <div class="container">
        <div v-if="error" class="alert alert-danger">
            {{ error }}
        </div>

        <div v-if="success" class="alert alert-success">
            {{ success }}
        </div>
        <!-- Chỉ render FormBookInfo khi đã có book data -->
        <FormBookInfo
            :book="book"
            @submit="handleSubmit"
            @cancel="handleCancel"
            class="mt-4"
        />
        
    </div>
</template>

<script>
import FormBookInfo from '@/components/FormBookInfo.vue';
import bookService from '@/services/book.service';


export default {
  name: 'CreateBook',
  components: {
    FormBookInfo
  },
  data() {
    return {
      book: {
        tensach: '',
        tacgia: '',
        nxb: '',
        dongia: '',
        soquyen: '',
        image: ''
      },
      error: null,
      success: null,
      loading: false
    };
  },

  methods: {


    async handleSubmit(bookData) {
      try {
        console.log('Book data:', bookData);
        await bookService.createBook(bookData);
        this.success = 'Thêm sách thành công!';
        // Navigate về trang sách sau 1,5s
        setTimeout(() => {
          this.$router.push({ name: 'Books' });
        }, 1500);
        
      } catch (error) {
        console.error('Error Adding Book:', error);
        this.error = 'Failed to add book';
      }
    },

    handleCancel() {
      this.$router.push({ name: 'Books' });
    },
  },
};
</script>