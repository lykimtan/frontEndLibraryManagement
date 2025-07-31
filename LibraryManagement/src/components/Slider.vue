<template>
  <div class="slider-wrapper mx-auto">
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="5000">
          <img src="@/assets/slider1.jpg" class="slider-img" alt="slider-1" />
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="@/assets/slider2.jpg" class="slider-img" alt="slider-2" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/slider3.jpg" class="slider-img" alt="slider-3" />
        </div>
      </div>

      <button class="carousel-control-prev custom-nav" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="carousel-control-next custom-nav" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <i class="bi bi-chevron-right"></i>
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
  max-width: 900px;
  margin: 2rem auto;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.carousel-inner {
  border-radius: 1.5rem;
}

.slider-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.slider-img:hover {
  transform: scale(1.015);
}

.custom-nav {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control-prev.custom-nav {
  left: 15px;
}

.carousel-control-next.custom-nav {
  right: 15px;
}

.custom-nav i {
  font-size: 1.5rem;
  color: #333;
}

.custom-nav:hover {
  background-color: #0d6efd;
  color: #fff;
}

.custom-nav:hover i {
  color: #fff;
}

/* Optional: indicator dots if you add them */
.carousel-indicators [data-bs-target] {
  background-color: #6c757d;
}

.carousel-indicators .active {
  background-color: #0d6efd;
}
</style>
