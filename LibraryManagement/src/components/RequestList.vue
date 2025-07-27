<script>
export default {
    name: 'RequestList',
    props: {
        requests: {
            type: Array,
            default: () => []
         }
    },
    methods: {

    }
}
</script>

<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      <div class="col" v-for="request in requests" :key="request._id">
        <form class="card h-100 shadow-sm book-card">
          <img
            :src="getBookImage(book)"
            class="card-img-top mx-auto mt-3 rounded"
            alt="Book cover"
            style="width: 180px; height: 260px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-primary">
              {{ book.tensach || 'Tên sách không có' }}
            </h5>
            <p class="card-text mb-1"><strong>Ngày mượn: </strong> {{ request.borrowDate || 'Chưa có thông tin' }}</p>
            <p class="card-text mb-1"><strong>Ngày trả dự kiến: </strong> {{ request.expectedReturnDate || 'Chưa có thông tin' }}</p>
            <p class="card-text mb-1"><strong>Trạng thái:</strong> {{ request.status || 'N/A' }}</p>
            <button
              type="button"
              class="btn btn-outline-primary mt-auto"
              @click="goToDelete(request)">
              Xoá yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.book-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.1rem;
}
</style>