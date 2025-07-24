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
    <div class="mt-5">
      <h2 class="text-center mb-4">
        <img src="@/assets/rule.svg" alt="" class="icon">
         Các quy định khi mượn – trả sách
        </h2>

      <div class="accordion" id="accordionRules">

        <!-- 1. Điểm uy tín -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#ruleOne" aria-expanded="true" aria-controls="ruleOne">
              1. Điểm Uy Tín Người Dùng
            </button>
          </h2>
          <div id="ruleOne" class="accordion-collapse collapse show" data-bs-parent="#accordionRules">
            <div class="accordion-body">
              <ul>
                <li>Người dùng được cấp 100 điểm uy tín khi đăng ký tài khoản thành công.</li>
                <li>Điểm được dùng để đánh giá trách nhiệm và lịch sử mượn trả.</li>
                <li>Nếu điểm ≤ 0, không thể mượn sách cho đến khi điểm được phục hồi.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 2. Thời gian mượn -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ruleTwo" aria-expanded="false" aria-controls="ruleTwo">
              2. Thời Gian Mượn và Trả Sách
            </button>
          </h2>
          <div id="ruleTwo" class="accordion-collapse collapse" data-bs-parent="#accordionRules">
            <div class="accordion-body">
              <ul>
                <li>Thời gian mượn tối đa là 14 ngày.</li>
                <li>Được gia hạn 1 lần tối đa 7 ngày nếu không có yêu cầu khác.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 3. Trả trễ & mất sách -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ruleThree" aria-expanded="false" aria-controls="ruleThree">
              3. Xử Lý Trả Trễ & Mất Sách
            </button>
          </h2>
          <div id="ruleThree" class="accordion-collapse collapse" data-bs-parent="#accordionRules">
            <div class="accordion-body">
              <ul>
                <li>Trả trễ bị trừ 10 điểm/ngày trễ.</li>
                <li>Mất hoặc làm hư sách phải đền gấp đôi giá trị sách và trừ thêm 50 điểm.</li>
                <li>Lịch sử mượn trả sẽ được lưu trữ để quản lý đánh giá.</li>
                <li>Người dùng có thể yêu cầu khôi phục điểm trong trường hợp đặc biệt.</li>
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