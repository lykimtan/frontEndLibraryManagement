<template>
  <div class="d-flex justify-content-center align-items-center min-vh-90 bg-light">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
      <div class="text-center mb-4">
        <i class="fa-solid fa-user-circle fa-3x text-primary mb-2"></i>
        <h4 class="fw-bold text-primary mb-0">Đăng Nhập</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label fw-semibold">Email</label>
          <div class="input-group">
            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="email"
              placeholder="Nhập email"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label fw-semibold">Mật khẩu</label>
          <div class="input-group">
            <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="form-control"
              v-model="password"
              placeholder="Nhập mật khẩu"
              required
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="togglePassword"
              tabindex="-1"
            >
              <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Error -->
        <div v-if="errorMessage" class="alert alert-danger py-2">
          <i class="fa-solid fa-triangle-exclamation me-2"></i>
          {{ errorMessage }}
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="btn btn-primary w-100 fw-semibold"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Đang đăng nhập...' : 'Đăng Nhập' }}
        </button>

        <!-- Register link -->
        <div class="text-center mt-3 small">
          Chưa có tài khoản?
          <router-link to="/register" class="fw-bold text-decoration-none">
            Đăng ký
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import readerService from "@/services/reader.service";

export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
      showPassword: false
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";
      this.loading = true;

      try {
        const response = await readerService.login(this.email, this.password);

        if (response.success) {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          this.$router.push({ name: "Books" });
        } else {
          this.errorMessage = response.message || "Đăng nhập không thành công.";
        }
      } catch (err) {
        console.error(err);
        this.errorMessage = "Có lỗi xảy ra. Vui lòng thử lại.";
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
input::placeholder {
  font-size: 0.9rem;
}

input:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

.input-group-text {
  background-color: #f1f3f5;
  border-right: 0;
}

.input-group .form-control {
  border-left: 0;
}

button:focus {
  box-shadow: none;
}
</style>
