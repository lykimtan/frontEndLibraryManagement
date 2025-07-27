<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold p-4"> Danh mục các yêu cầu đã gửi</h1>
        <div v-if="error" class="alert alert-danger">
        {{ error }}
        </div>

        <div v-if="success" class="alert alert-success">
        {{ success }}
        <RequestList
            
         />
         </div>
      <div v-if="!error && !success">
        <p class="text-center">Không có yêu cầu nào.</p>
      </div>

      </div>

</template>
<script>
import RequestList from '@/components/RequestList.vue';
import BookService from '@/services/book.service';

export default {
    components: {
        RequestList
    },
    data() {
        return {
            error: null,
            success: null,
            readerId: null
        }
    }
}
</script>
