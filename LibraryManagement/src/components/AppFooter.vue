<template>
  <footer class="bg-dark text-white pt-4 pb-2 mt-5">
    <div class="container">
      <div class="row">

        <!-- Thông tin thư viện -->
        <div class="col-md-4 mb-3">
          <h5>Library <img class="icon_header" src="@/assets/openbook.svg" alt="Library Icon"> Service</h5>
          <p>Hệ thống quản lý mượn trả sách hiện đại, hỗ trợ người dùng dễ dàng tra cứu và theo dõi sách mượn.</p>
        </div>

        <!-- Liên kết nhanh -->
        <div class="col-md-4 mb-3">
          <h5>Liên kết nhanh</h5>
          <ul class="list-unstyled">
            <li><a href="/home" class="text-white text-decoration-none">Trang chủ</a></li>
            <li><a href="/books" class="text-white text-decoration-none">Danh sách sách</a></li>
            <li><a href="/borrow-history" class="text-white text-decoration-none">Lịch sử mượn</a></li>
            <li><a href="/admin" class="text-white text-decoration-none">Quản trị</a></li>
          </ul>
        </div>

        <!-- Liên hệ -->
        <div class="col-md-4 mb-3">
          <h5>Liên hệ</h5>
          <ul class="list-unstyled">
            <li><i class="bi bi-geo-alt-fill me-2"></i>123 Nguyễn Văn Cừ, Quận 5, TP.HCM</li>
            <li><i class="bi bi-telephone-fill me-2"></i>(+84) 123 456 789</li>
            <li><i class="bi bi-envelope-fill me-2"></i>support@thuviendemo.vn</li>
          </ul>
        </div>

      </div>

      <hr class="border-light" />

      <div class="text-center">
        <p class="mb-0">&copy; 2025 LyKimTan - B2205905</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
    name: 'AppFooter'
}
</script>