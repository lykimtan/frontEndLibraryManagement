<script>
export default {
    name: 'BookList',
    props: {
        books: {
            type: Array,
            default: () => []
         }
    },
    methods: {
        goToRequest(book) {
            console.log('Creating request for book:', book);
            alert(`Tạo yêu cầu mượn sách: ${book.tensach}`);
        },
        getBookImage(book) {
            return book.image || '/src/assets/bookstock.png';
        }
    }
}
</script>

<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      <div class="col" v-for="book in books" :key="book._id">
        <div class="card h-100 shadow-sm book-card">
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
            <p class="card-text mb-1"><strong>Tác giả:</strong> {{ book.tacgia || 'N/A' }}</p>
            <p class="card-text mb-1"><strong>Nhà xuất bản:</strong> {{ book.nxb_name || 'N/A' }}</p>
            <p class="card-text mb-1"><strong>Đơn giá:</strong> {{ book.dongia || 'N/A' }}</p>
            <p class="card-text mb-3"><strong>Số quyển:</strong> {{ book.soquyen || 0 }}</p>
            <button
              type="button"
              class="btn btn-outline-primary mt-auto"
              @click="goToRequest(book)"
              :disabled="!book.soquyen || book.soquyen <= 0"
            >
              Tạo yêu cầu mượn sách
            </button>
          </div>
        </div>
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