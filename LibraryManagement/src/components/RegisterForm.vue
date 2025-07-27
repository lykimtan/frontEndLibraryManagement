<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light py-4">
    <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%;">
      <div class="text-center mb-4">
        <i class="fa-solid fa-user-plus fa-3x text-success mb-2"></i>
        <h4 class="fw-bold text-success mb-0">Đăng Ký Tài Khoản</h4>
        <p class="text-muted small">Tạo tài khoản mới để sử dụng thư viện</p>
      </div>

      <Form @submit="submitForm" :validation-schema="registerFormSchema">
        <!-- First Name -->
        <div class="mb-3">
          <label for="firstName" class="form-label fw-semibold">
            <i class="fa-solid fa-user me-1"></i>Họ
          </label>
          <Field
            type="text"
            id="firstName"
            name="firstName"
            class="form-control"
            placeholder="Nhập họ"
          />
          <ErrorMessage name="firstName" class="error-feedback"/>
        </div>

        <!-- Last Name -->
        <div class="mb-3">
          <label for="lastName" class="form-label fw-semibold">
            <i class="fa-solid fa-user me-1"></i>Tên
          </label>
        <Field 
          type="text"
          id="lastName"
          name="lastName"
          class="form-control"
          placeholder="Nhập tên"
        />
        <ErrorMessage name="lastName" class="error-feedback"/>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label fw-semibold">
            <i class="fa-solid fa-envelope me-1"></i>Email
          </label>
          <Field 
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email"
            class="form-control"
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>

        <!-- Birthday -->
        <div class="mb-3">
          <label for="birthday" class="form-label fw-semibold">
            <i class="fa-solid fa-calendar me-1"></i>Ngày sinh
          </label>
          <Field
            type="date"
            name="birthday"
            id="birthday"
            placeholder="Nhập ngày sinh"
            class="form-control"
          />
        </div>

        <!-- Gender -->
        <div class="mb-3">
          <label class="form-label fw-semibold">
            <i class="fa-solid fa-venus-mars me-1"></i>Giới tính
          </label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <Field
                class="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="Nam"
              />
              <label class="form-check-label" for="male">
                <i class="fa-solid fa-mars text-primary me-1"></i>Nam
              </label>
            </div>
            <div class="form-check">
              <Field
                class="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="Nữ"
              />
              <label class="form-check-label" for="female">
                <i class="fa-solid fa-venus text-danger me-1"></i>Nữ
              </label>
            </div>
            <div class="form-check">
              <Field
                class="form-check-input"
                type="radio"
                name="gender"
                id="other"
                value="Khác"
              />
              <label class="form-check-label" for="other">
                <i class="fa-solid fa-genderless text-secondary me-1"></i>Khác
              </label>
            </div>
          </div>
        </div>

        <!-- Address -->
        <div class="mb-3">
          <label for="address" class="form-label fw-semibold">
            <i class="fa-solid fa-map-marker-alt me-1"></i>Địa chỉ
          </label>
          <Field
            as="textarea"
            id="address"
            name="address"
            class="form-control"
            placeholder="Nhập địa chỉ đầy đủ"
            rows="2"
          />
          <ErrorMessage name="address" class="error-feedback"/>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label fw-semibold">
            <i class="fa-solid fa-lock me-1"></i>Mật khẩu
          </label>
          <div class="input-group">
            <Field
              :type="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              class="form-control"
              placeholder="Tối thiểu 6 ký tự"
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
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label fw-semibold">
            <i class="fa-solid fa-lock me-1"></i>Nhập lại mật khẩu
          </label>
          <div class="input-group">
            <Field
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              name="confirmPassword"
              class="form-control"
              placeholder="Nhập lại mật khẩu"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="toggleConfirmPassword"
              tabindex="-1"
            >
              <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
          <ErrorMessage name="confirmPassword" class="error-feedback" />
        </div>

        <div v-if="errorMessage" class="alert alert-danger py-2">
          <i class="fa-solid fa-triangle-exclamation me-2"></i>
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success py-2">
          <i class="fa-solid fa-check-circle me-2"></i>
          {{ successMessage }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-success w-100 fw-semibold mb-3"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Đang đăng ký...' : 'Đăng Ký' }}
        </button>

        <!-- Login Link -->
        <div class="text-center small">
          Đã có tài khoản?
          <router-link to="/login" class="fw-bold text-decoration-none text-success">
            Đăng nhập ngay
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import readerService from "@/services/reader.service";

export default {

  components: {
    Form,
    Field, 
    ErrorMessage,
  },

  name: "RegisterForm",
  data() {
    const registerFormSchema = yup.object().shape({
      firstName: yup
        .string()
        .required('Họ phải có giá trị')
        .max(50, "Họ có nhiều nhất 50 ký tự"), 
      lastName: yup
        .string()
        .required('Tên phải có giá trị')
        .max(50,'Tên phải có nhiều nhất 50 ký tự'),
      email: yup
        .string()
        .required('Email không được để trống')
        .email("Email không đúng")
        .max(50, "Email không được quá 50 ký tự"),
      address: yup
        .string()
        .required('Địa chỉ không được để trống')
        .min(5,'Địa chỉ phải có ít nhất 5 ký tự')
        .max(200, 'Địa chỉ phải ít hơn 200 ký tự'),
      birthday: yup
        .date()
        .required('Ngày sinh không được để trống')
        .max(new Date(), 'Ngày sinh không hợp lệ'),
      gender: yup
        .string()
        .required('Vui lòng chọn giới tính'),
      password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      confirmPassword: yup
        .string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    });
    return {
      registerFormSchema,
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitForm(values) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      try {
        const userData = {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          birthday: values.birthday,
          gender: values.gender,
          address: values.address,
          password: values.password
        };

        const response = await readerService.createReader(userData);
        
        this.successMessage = "Đăng ký thành công! Chuyển hướng đến trang đăng nhập...";
        
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 2000);
        
      } catch (error) {
            console.error("Registration error:", error);
            const status = error.response?.status;
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            if (status === 400) {
              this.errorMessage = serverMessage || "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
            } else if (status === 409) {
              this.errorMessage = serverMessage || "Email đã được sử dụng. Vui lòng chọn email khác.";
            } else if (status === 500) {
              this.errorMessage = "Lỗi server. Vui lòng thử lại sau.";
            } else if (error.request) {
              this.errorMessage = "Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng.";
            } else {
              this.errorMessage = serverMessage || "Có lỗi xảy ra. Vui lòng thử lại.";
            }
      } finally {
        this.loading = false;
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },

  watch: {
    errorMessage(newVal) {
      if(newVal) {
        setTimeout(()=> {
          this.errorMessage = ''
        }, 5000)
      }
    }
  }

};


</script>

<style scoped>
.form-control:focus,
.form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
  border-color: #198754;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.form-control.is-invalid:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.card {
  border-radius: 15px;
}

.btn-success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.btn-success:disabled {
  transform: none;
  box-shadow: none;
}

.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}

textarea.form-control {
  resize: vertical;
  min-height: 60px;
}

.input-group .btn {
  border-left: 0;
}

.input-group .form-control {
  border-right: 0;
}

.error-feedback {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
  display: block;
}

.field-error {
  border-color: #dc3545 !important;
}
</style>