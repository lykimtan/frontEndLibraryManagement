<template>
  <div class="col-md-6 offset-md-3 mt-4">
  <div class="card shadow-sm border-0">
    <div class="card-body">
      <h5 class="card-title mb-4"><i class="fa-solid fa-lock"></i> Thay đổi mật khẩu</h5>

      <form @submit.prevent="handleChangePassword">
        <!-- Mật khẩu hiện tại -->
        <div class="mb-3">
          <label for="oldPassword" class="form-label">Mật khẩu hiện tại</label>
          <input
            type="password"
            class="form-control"
            id="oldPassword"
            v-model="form.oldPassword"
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
        </div>
        <div v-if="error" class="alert alert-danger py-2" role="alert">
          {{ error }}
        </div>

        <!-- Mật khẩu mới -->
        <div class="mb-3">
          <label for="newPassword" class="form-label">Mật khẩu mới</label>
          <input
            type="password"
            class="form-control"
            id="newPassword"
            v-model="form.newPassword"
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        <!-- Xác nhận mật khẩu mới -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Nhập lại mật khẩu mới"
            required
          />
        </div>

        <!-- Thông báo lỗi -->
        <div v-if="localError" class="alert alert-danger py-2" role="alert">
          {{ localError }}
        </div>
        <div v-if="success" class="alert alert-success py-2" role="alert">
          {{ success }}
        </div>

        <div class="text-end">
          <button type="submit" class="btn btn-primary">Cập nhật mật khẩu</button>
        </div>
      </form>
    </div>
  </div>
</div>

</template>
<script>

export default {
    name: 'FormChangePassword',
    props: {
        error: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            
            localError: null,
            success: null
        };

    },

    methods: {
        handleChangePassword() {
            if (this.form.newPassword !== this.form.confirmPassword) {
                this.error = 'Mật khẩu mới và xác nhận không khớp.';
                return;
            }
            const payload = {
                oldPassword: this.form.oldPassword,
                newPassword: this.form.newPassword
            }
            this.$emit('change-password', payload);
        }

    }

}

</script>