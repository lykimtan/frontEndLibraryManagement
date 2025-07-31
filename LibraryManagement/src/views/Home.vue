<template>
  <div class="container py-4">
    <!-- Slider -->
    <Slider />

    <!-- Tiêu đề chính -->
    <h1 class="text-center text-success fw-bold mt-4 mb-5">Welcome to LibraryService</h1>

    <!-- Thông tin chính -->
<!-- Thông tin chính -->
<div class="container py-4">
  <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
    <div class="col col-md-4 col-sm-6">
      <div class="card h-100 border-0 shadow-sm">
        <img src="@/assets/librarian.png" class="card-img-top p-3 img-fluid" alt="">
        <div class="card-body text-center">
          <h5 class="card-title">Phản hồi nhanh</h5>
          <p class="card-text text-secondary">Độc giả sẽ được phản hồi các yêu cầu mượn sách một cách nhanh chóng và chính xác.</p>
        </div>
      </div>
    </div>

    <div class="col col-md-4 col-sm-6">
      <div class="card h-100 border-0 shadow-sm">
        <img src="@/assets/bookstock.png" class="card-img-top p-3 img-fluid" alt="">
        <div class="card-body text-center">
          <h5 class="card-title">Kho sách khổng lồ</h5>
          <p class="card-text text-secondary">Hệ thống sách phong phú, đa dạng, đáp ứng mọi nhu cầu học tập và giải trí.</p>
          <router-link to="/books" class="btn btn-outline-primary btn-sm mt-2">Xem danh mục sách</router-link>
        </div>
      </div>
    </div>

    <div class="col col-md-4 col-sm-6">
      <div class="card h-100 border-0 shadow-sm">
        <img src="@/assets/bookstock.png" class="card-img-top p-3 img-fluid" alt="">
        <div class="card-body text-center">
          <h5 class="card-title">Hỗ trợ thủ thư</h5>
          <p class="card-text text-secondary">Quản lý mượn trả, cập nhật dữ liệu sách nhanh chóng và dễ dàng.</p>
        </div>
      </div>
    </div>
  </div>
</div>



    <!-- Quy định -->
    <div class="rules-section container mt-5">
  <h2 class="text-center mb-4 fw-bold d-flex justify-content-center align-items-center gap-2">
    <img src="@/assets/rule.svg" alt="icon" class="icon" width="40" height="40" />
    Các quy định khi mượn – trả sách
  </h2>

  <div class="accordion shadow-sm rounded" id="accordionRules">

    <!-- 1. Điểm uy tín -->
    <div class="accordion-item border-0 mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button fw-semibold text-primary" type="button" data-bs-toggle="collapse"
          data-bs-target="#ruleOne" aria-expanded="true" aria-controls="ruleOne">
          📌 1. Điểm Uy Tín Người Dùng
        </button>
      </h2>
      <div id="ruleOne" class="accordion-collapse collapse show" data-bs-parent="#accordionRules">
        <div class="accordion-body bg-light rounded-bottom">
          <ul class="mb-0 ps-3">
            <li>Người dùng được cấp <strong>100 điểm uy tín</strong> khi đăng ký tài khoản thành công.</li>
            <li>Điểm dùng để đánh giá trách nhiệm và lịch sử mượn trả sách.</li>
            <li>Nếu điểm ≤ 0, <span class="text-danger fw-semibold">người dùng không thể mượn sách</span> cho đến khi điểm được phục hồi.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. Thời gian mượn -->
    <div class="accordion-item border-0 mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold text-primary" type="button" data-bs-toggle="collapse"
          data-bs-target="#ruleTwo" aria-expanded="false" aria-controls="ruleTwo">
          ⏳ 2. Thời Gian Mượn và Trả Sách
        </button>
      </h2>
      <div id="ruleTwo" class="accordion-collapse collapse" data-bs-parent="#accordionRules">
        <div class="accordion-body bg-light rounded-bottom">
          <ul class="mb-0 ps-3">
            <li>Thời gian mượn tối đa là <strong>14 ngày</strong>.</li>
            <li>Được phép gia hạn <strong>1 lần</strong> tối đa 7 ngày nếu không có yêu cầu khác.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 3. Trả trễ & mất sách -->
    <div class="accordion-item border-0 mb-3">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-semibold text-primary" type="button" data-bs-toggle="collapse"
          data-bs-target="#ruleThree" aria-expanded="false" aria-controls="ruleThree">
          ⚠️ 3. Xử Lý Trả Trễ & Mất Sách
        </button>
      </h2>
      <div id="ruleThree" class="accordion-collapse collapse" data-bs-parent="#accordionRules">
        <div class="accordion-body bg-light rounded-bottom">
          <ul class="mb-0 ps-3">
            <li>Trả trễ bị <strong class="text-danger">trừ 10 điểm</strong> cho mỗi ngày trễ.</li>
            <li>Mất hoặc làm hư sách phải đền <strong>gấp đôi</strong> giá trị sách và trừ thêm <strong>50 điểm</strong>.</li>
            <li>Lịch sử mượn trả được lưu trữ phục vụ việc đánh giá và xử lý.</li>
            <li>Có thể gửi yêu cầu <em>khôi phục điểm</em> trong những trường hợp đặc biệt.</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</div>


  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'

export default {
  name: 'Home',
  components: {
    Slider
  }
}
</script>

<style scoped>


.icon {
    height: 40px;
    width: 40px;
    margin-right: 10px;
}
</style>