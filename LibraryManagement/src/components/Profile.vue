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
          :src="reader?.avatar || 'https://i.pinimg.com/736x/ef/cc/c5/efccc5499c237afce586fc566800c622.jpg'"
          alt="Avatar"
          class="rounded-circle border shadow-sm"
          style="width: 150px; height: 150px; object-fit: cover;"
        />
        <div v-if="!isEditing" class="mt-3">
          <h5 class="mb-0 fw-semibold">{{ reader?.firstname || 'Chưa cập nhật' }}</h5>
          <small class="text-muted">#{{ reader?.firstname || 'Mã bạn đọc' }}</small>
        </div>
     
      </div>

      <!-- Thông tin bên phải -->
      <div class="w-100">
        <h5 class="card-title mb-3 border-bottom pb-2">Thông tin tài khoản</h5>

        <div class="row">
             <div class="col-sm-6 mb-2">
            <strong>Firstname:</strong>
            <div v-if="!isEditing">{{ reader?.firstname || 'Chưa cập nhật' }}</div>
            <input 
              v-else 
              type="text" 
              class="form-control form-control-sm mt-1" 
              v-model="editForm.firstname"
              placeholder="Nhập họ tên"
              required
            />
          </div>
          <div class="col-sm-6 mb-2">
            <strong>Last name:</strong>
            <div v-if="!isEditing">{{ reader?.lastname || 'Chưa cập nhật' }}</div>
            <input 
              v-else 
              type="text" 
              class="form-control form-control-sm mt-1" 
              v-model="editForm.lastname"
              placeholder="Nhập họ"
              required
            />
        </div>
          <div class="col-sm-6 mb-2">
            <strong>Email:</strong>
            <div v-if="!isEditing">{{ reader?.email || 'Chưa cập nhật' }}</div>
            <input 
              v-else 
              type="email" 
              class="form-control form-control-sm mt-1" 
              v-model="editForm.email"
              readonly

            />
          </div>
          <div class="col-sm-6 mb-2" v-if="reader?.phone!== null">
            <strong>Số điện thoại:</strong>
            <div v-if="!isEditing">{{ reader?.phone || 'Chưa cập nhật' }}</div>
            <input 
              v-else 
              type="tel" 
              class="form-control form-control-sm mt-1" 
              v-model="editForm.phone"
              placeholder="Nhập số điện thoại"
            />
        </div>
          <div class="col-sm-6 mb-2">
            <strong>Ngày sinh:</strong>
            <div v-if="!isEditing">{{ reader?.birthday || 'Chưa cập nhật' }}</div>
            <input 
              v-else 
              type="date" 
              class="form-control form-control-sm mt-1" 
              v-model="editForm.birthday"
              required
            />
          </div>
          <div class="col-sm-6 mb-2">
            <strong>Giới tính:</strong>
            <div v-if="!isEditing">
                {{ reader?.gender == 'male' ? 'Nam' : reader?.gender == 'female' ? 'Nữ' : 'Khác' }}</div>

            <select 
              v-else 
              class="form-select form-select-sm mt-1" 
              v-model="editForm.gender"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div class="col-12 mb-2">
            <strong>Địa chỉ:</strong>
            <div v-if="!isEditing">{{ reader?.address || 'Chưa cập nhật' }}</div>
            <textarea 
              v-else 
              class="form-control form-control-sm mt-1" 
              v-model="editForm.address"
              rows="2"
              placeholder="Nhập địa chỉ"
            ></textarea>
          </div>
          <div class="col-sm-6 mb-2">
            <strong>Điểm uy tín:</strong>
            <div :class="{
              'text-success': reader?.point >= 70,
              'text-warning': reader?.point >= 30 && reader?.point < 70,
              'text-danger': reader?.point < 30
            }">
              {{ reader?.point ?? 'Chưa cập nhật' }} điểm
            </div>
          </div>

           <div class="col-sm-6 mb-2">
            <strong>Tiền phạt:</strong>
            <div :class="{
              'text-success': reader?.fine == 0,
              'text-warning fw-bold': reader?.fine > 0,
            }">
              {{ reader?.fine ?? 'Chưa cập nhật' }} VNĐ
            </div>
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
  name: 'Profile',
  props: {
    reader: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isEditing: false,
      editForm: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        address: ''
      }
    }
  },
  watch: {
    reader: {
      handler(newReader) {
        if (newReader) {
          this.editForm = {
            firstname: newReader.firstname || '',
            lastname: newReader.lastname || '',
            email: newReader.email || '',
            phone: newReader.phone || '',
            birthday: newReader.birthday || '',
            gender: newReader.gender || '',
            address: newReader.address || ''
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
        firstname: this.reader.firstname || '',
        lastname: this.reader.lastname || '',
        email: this.reader.email || '',
        phone: this.reader.phone || '',
        birthday: this.reader.birthday || '',
        gender: this.reader.gender || '',
        address: this.reader.address || ''
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
    }
  }
};
</script>
