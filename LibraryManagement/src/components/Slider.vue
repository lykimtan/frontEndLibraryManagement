<template>
  <div class="slider-wrapper mx-auto pt-2">
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner rounded">
        <div class="carousel-item active" data-bs-interval="5000">
          <img src="@/assets/slider1.jpg" class="d-block w-100 img-fluid" alt="slider-img" />
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="@/assets/slider2.jpg" class="d-block w-100 img-fluid" alt="slider-img" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/slider3.jpg" class="d-block w-100 img-fluid" alt="slider-img" />
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
};
</script>

<style scoped>
.slider-wrapper {
  max-width: 700px; /* thu nhỏ chiều rộng tổng thể */
  margin: 0 auto;
}

.carousel-item img {
  height: 300px; /* giảm chiều cao */
  object-fit: cover; /* đảm bảo ảnh lấp đầy */
  border-radius: 10px;
}
</style>
