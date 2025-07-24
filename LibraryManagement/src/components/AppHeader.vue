<script setup>
import router from '@/router';
</script>

<template>
  <nav class="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img src="@/assets/openbook.svg" alt="Logo" class="logo me-2" />
        <div>
          <strong class="fs-5 text-white">LIBRARY SERVICE</strong><br />
          <small class="text-light">For reader</small>
        </div>
      </router-link>

      <button
        class="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link">Danh mục sách</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mượn sách
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/requests" class="dropdown-item">Yêu cầu đã gửi</router-link>
              </li>
              <li>
                <router-link to="/history" class="dropdown-item">Lịch sử mượn</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Giới thiệu</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/account" class="btn btn-outline-light ms-3">
              <i class="fa-solid fa-circle-user me-1"></i> Tài khoản
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar {
background: linear-gradient(90deg, #555555, #333333);
  padding: 0.7rem 1.5rem;
}

.logo {
  width: 40px;
  height: 40px;
}

.navbar .nav-link {
  color: #f8f9fa;
  font-weight: 500;
  margin: 0 0.5rem;
  transition: color 0.2s ease-in-out;
}

.navbar .nav-link:hover,
.navbar .nav-link.router-link-active {
  color: #ffd700;
}

.dropdown-menu {
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.dropdown-item:hover {
  background-color: #e9f7ef;
  color: #218838;
}
</style>
