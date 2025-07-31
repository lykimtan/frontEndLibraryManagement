<script setup>
import { ref, onMounted, watch } from 'vue';
import router from '@/router';

const userName = ref('Tài khoản');
//function lấy thông tin từ localStorage để update userName
const updateUserName = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      userName.value = user.name || user.email || "Tài khoản";
    } catch (error) {
      console.error("Error parsing user data:", error);
      userName.value = "Tài khoản";
    }
  } else {
    userName.value = "Tài khoản";
  }
};

// Update khi component mount
onMounted(() => {
  updateUserName();
});

// Listen cho storage changes (khi login/logout)
window.addEventListener('storage', updateUserName);

watch(() => router.currentRoute.value, () => {
  updateUserName();
});

// Function logout
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  userName.value = 'Tài khoản';
  router.push('/login');
};
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
          
          <!-- Hiển thị button login nếu chưa đăng nhập -->
          <li class="nav-item" v-if="userName === 'Tài khoản'">
            <router-link to="/login" class="btn btn-outline-light ms-3">
              <i class="fa-solid fa-sign-in-alt me-1"></i> 
              Đăng nhập
            </router-link>
          </li>
          
          <!-- Hiển thị dropdown account nếu đã đăng nhập -->
          <li class="nav-item dropdown" v-else>
            <a
              class="btn btn-outline-light ms-3 dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-circle-user me-1"></i> 
              {{ userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link to="/profile" class="dropdown-item">
                  <i class="fa-solid fa-user me-2"></i>Tài khoản
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a href="#" @click.prevent="handleLogout" class="dropdown-item">
                  <i class="fa-solid fa-sign-out-alt me-2"></i>Đăng xuất
                </a>
              </li>
            </ul>
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

.btn {
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  transform: translateY(-1px);
}
</style>