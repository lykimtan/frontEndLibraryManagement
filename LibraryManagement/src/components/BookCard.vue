<template>
    <div class="container py-5 d-flex justify-content-center">
        <div class="card h-100 shadow-sm book-card">
          <img
            :src="bookImage"
            class="card-img-top mx-auto mt-3 rounded"
            alt="Book cover"
            style="width: 180px; height: 260px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-primary">
              {{ book.tensach || 'Tên sách không có' }}
            </h5>
            <p class="card-text mb-1"><strong>Tác giả:</strong> {{ book.tacgia || 'Chưa có thông tin' }}</p>
            <p class="card-text mb-1"><strong>Đơn giá:</strong> {{ book.dongia || 'N/A' }}</p>
            <p class="card-text mb-3"><strong>Số quyển:</strong> {{ book.soquyen || 0 }}</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "BookCard",
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bookImage: this.getBookImage()
    };
  },
  methods: {
    getBookImage() {
      // Nếu book có hình ảnh
      if (this.book && this.book.image) {
        return this.book.image;
      }
      // Hình ảnh mặc định
      return 'https://via.placeholder.com/180x260?text=No+Image';
    }
  }
};
</script>

<style scoped>
.book-card {
  transition: transform 0.2s ease-in-out;
}

.book-card:hover {
  transform: translateY(-5px);
}
</style>