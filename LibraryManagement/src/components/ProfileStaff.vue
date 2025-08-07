<template>
<div class="col-md-8 offset-md-2">
  <div class="card shadow-sm border-0">
    <div v-if="isEditing">
        <h3 class="text-center">Cập nhật thông tin tài khoản</h3>
    </div>
    <div class="card-body d-flex flex-column flex-md-row align-items-center gap-4">

      <!-- Avatar bên trái -->
      <div class="text-center text-md-center border rounded p-3 bg-light">
        <img
          :src="staff?.avatar || 'https://i.pinimg.com/1200x/de/8a/26/de8a26f45a89d4072e037db4e85e3f97.jpg'"
          alt="Avatar"
          class="rounded-circle border shadow-sm"
          style="width: 150px; height: 150px; object-fit: cover;"
        />
        <div v-if="!isEditing" class="mt-3">
          <h5 class="mb-0 fw-semibold">{{ staff?.name || 'Chưa cập nhật' }}</h5>
          <small class="text-muted">#{{ staff?.name || 'Mã nhân viên' }}</small>
        </div>
     
      </div>

      <!-- Thông tin bên phải -->
      <div class="w-100">
        <h5 class="card-title mb-4 border-bottom pb-2">Thông tin tài khoản</h5>

        <div class="row gy-3">
          <!-- Tên và Email -->
          <div class="col-md-6">
            <label class="form-label fw-bold">Họ tên:</label>
            <div v-if="!isEditing">{{ staff?.name || 'Chưa cập nhật' }}</div>
            <input
              v-else
              type="text"
              class="form-control form-control-sm mt-1"
              v-model="editForm.name"
              placeholder="Nhập họ tên"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">Email:</label>
            <div v-if="!isEditing">{{ staff?.email || 'Chưa cập nhật' }}</div>
            <input
              v-else
              type="email"
              class="form-control form-control-sm mt-1"
              v-model="editForm.email"
              readonly
            />
          </div>

          <!-- Số điện thoại và Chức vụ -->
          <div class="col-md-6" v-if="staff?.phone !== null">
              <label class="form-label fw-bold">Số điện thoại:</label>
              <div v-if="!isEditing">{{ staff?.phone || 'Chưa cập nhật' }}</div>
              <input
                v-else
                type="tel"
                class="form-control form-control-sm mt-1"
                v-model="editForm.phone"
                placeholder="Nhập số điện thoại"
              />
          </div>

          <div class="col-md-6" v-if="staff?.position !== null">
              <label class="form-label fw-bold">Chức vụ:</label>
              <div v-if="!isEditing">{{ staff?.position || 'Chưa cập nhật' }}</div>
              <input
                v-else
                type="text"
                class="form-control form-control-sm mt-1"
                v-model="editForm.position"
                placeholder="Nhập chức vụ"
              />
          </div>

    <!-- Địa chỉ -->
        <div class="col-12">
          <label class="form-label fw-bold">Địa chỉ:</label>
          <div v-if="!isEditing">{{ staff?.address || 'Chưa cập nhật' }}</div>
          <textarea
            v-else
            class="form-control form-control-sm mt-1"
            v-model="editForm.address"
            rows="2"
            placeholder="Nhập địa chỉ"
          ></textarea>
          </div>
        </div>

        <!-- Nút chỉnh sửa / Lưu / Hủy -->
        <div class="mt-3 text-end">
          <div v-if="!isEditing">
            <button class="btn btn-outline-primary btn-sm" @click="openChangePassword">
              <i class="fa-solid fa-key"></i> Đổi mật khẩu
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="editProfile">
              <i class="bi bi-pencil"></i> Chỉnh sửa
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="openFormCreateStaff">
              <i class="fa-solid fa-circle-plus"></i> Tạo tài khoản nhân viên mới
            </button>
          </div>

          <div v-else class="d-flex gap-2 justify-content-end">
            <button class="btn btn-success btn-sm" @click="saveProfile">
              <i class="bi bi-check"></i> Lưu
            </button>
            <button class="btn btn-secondary btn-sm" @click="cancelEdit">
              <i class="bi bi-x"></i> Hủy
            </button>
          </div>
        </div>
      </div>

      

    </div>
  </div>
</div>


</template>

<script>
export default {
  name: 'ProfileStaff',
  props: {
    staff: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isEditing: false,
      editForm: {
        name: '',
        email: '',
        phone: '',
        position: '',
        address: ''
      }
    }
  },
  watch: {
    staff: {
      handler(newStaff) {
        if (newStaff) {
          this.editForm = {
            name: newStaff.name || '',
            email: newStaff.email || '',
            phone: newStaff.phone || '',
            position: newStaff.position || '',
            address: newStaff.address || ''
          };
        }
      },
      immediate: true
    }
  },
  methods: {
    editProfile() {
      this.isEditing = true;
    },
    
    cancelEdit() {
      this.isEditing = false;
      // Reset form về dữ liệu gốc
      this.editForm = {
        name: this.staff.name || '',
        email: this.staff.email || '',
        phone: this.staff.phone || '',
        position: this.staff.position || '',
        address: this.staff.address || ''
      };
    },
    
    async saveProfile() {
      try {
        // Emit event để parent component xử lý
        this.$emit('update-profile', this.editForm);
        this.isEditing = false;
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Có lỗi xảy ra khi lưu thông tin');
      }
    },

    openChangePassword() {
      this.$emit('open-change-password');
    },
    openFormCreateStaff() {
      this.$emit('open-form-create-staff');
    }
  }
};
</script>
