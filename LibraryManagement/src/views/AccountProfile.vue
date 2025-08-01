<template>
    <div class="container">
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>
        <h1 class="text-center">Profile</h1>
       <Profile v-if="!isStaff()"
        :reader="reader"
        @update-profile="editProfile"
        @open-change-password="isChangePassword = !isChangePassword"
        />

        <ProfileStaff v-else
        :staff="staff"
        @update-profile="editProfileStaff"
        @open-change-password="isChangePassword = !isChangePassword"
        @open-form-create-staff="isCreateStaff = !isCreateStaff"  
        />


        <ChangePassword v-if="isChangePassword && !isStaff()"
        @change-password="handleChangePassword"
        :error="error"
        />

        <ChangePassword v-else-if="isChangePassword && isStaff()"
        @change-password="handleChangePasswordStaff"
        :error="error"
        />

        <FormCreateStaff v-if="isStaff() && isCreateStaff"
        @create-staff="editProfileStaff"
        :error="error"
        :success="success"
        />
    </div>




</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue';
import Profile from '@/components/Profile.vue';
import readerService from '@/services/reader.service';
import staffService from '@/services/staff.service';
import ProfileStaff from '@/components/ProfileStaff.vue';
import FormCreateStaff from '@/components/FormCreateStaff.vue';
import { Form } from 'vee-validate';

export default {
  name: 'AccountProfile',
  components: {
    Profile,
    ProfileStaff,
    ChangePassword,
    FormCreateStaff
  },

  data() {
    return {
        readerId: '',
        error: null,
        success: null,
        reader: null,
        staff: null,
        loading: false,
        isChangePassword: false,
        isCreateStaff: false
    };
  },
  methods: {

     isStaff() {
            const user = localStorage.getItem('user');
            if (!user) return false;
            const userInfo = JSON.parse(user);
            return userInfo && userInfo.role === 'staff'; // Kiểm tra role của user
        },
    
    async getReaderId() {
        const reader = localStorage.getItem('user');
        if(!reader) {
            this.error = 'Vui lòng đăng nhập để xem thông tin tài khoản';
            //chuyen huong den trang dang nhap sau 2s
            setTimeout(()=> {
                this.$router.push({ name: 'Login'})
            }, 2000);
            return;
        }
        const readerId  = JSON.parse(reader)._id;
        this.readerId = readerId;
        console.log(readerId);
        return readerId;
    },

    async getReaderInfo(readerId){
        this.loading = true;
        try {
            const reader = await readerService.getReaderById(readerId);
            this.reader = reader;
            this.loading = false;
            console.log('Reader info:', this.reader);
        }
        catch(error) {
            console.error('Error fetching reader info:', error);
            this.loading = false;
            this.error = 'Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.';
            // Clear error message sau 5s
            setTimeout(() => {
                this.error = null;
            }, 5000);
        }
    },

    async getStaffInfo(readerId){
        this.loading = true;
        try {
            const staff = await staffService.getStaffById(readerId);
            this.staff = staff;
            this.loading = false;
            console.log('Staff info:', this.staff);
        }
        catch(error) {
            console.error('Error fetching staff info:', error);
            this.loading = false;
            this.error = 'Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.';
            // Clear error message sau 5s
            setTimeout(() => {
                this.error = null;
            }, 5000);
        }
    },

    async editProfile(formdata) {
        try {
            this.loading = true;
            const updatedProfile = await readerService.updateInfoReader(this.readerId, formdata);
            this.reader = updatedProfile;
            this.success = 'Cập nhật thông tin thành công';
        } catch (error) {
            console.error('Error updating profile:', error);
            this.error = 'Không thể cập nhật thông tin. Vui lòng thử lại sau.';
        } finally {
            this.loading = false;
            setTimeout(() => {
                this.success = null;
                this.error = null;
            }, 3000);
        }
    },

    async editProfileStaff(formdata) {
        try {
            this.loading = true;
            const updatedProfile = await staffService.updateStaffInfo(this.readerId, formdata);
            this.staff = updatedProfile;
            this.success = 'Cập nhật thông tin thành công';
        } catch (error) {
            console.error('Error updating profile:', error);
            this.error = 'Không thể cập nhật thông tin. Vui lòng thử lại sau.';
        } finally {
            this.loading = false;
            setTimeout(() => {
                this.success = null;
                this.error = null;
            }, 3000);
        }
    },

    async handleChangePassword(payload) {
        try{
            this.loading = true;
            const response = await readerService.changePasswordReader(this.readerId, payload);
            this.success = response.message || 'Đổi mật khẩu thành công';
            this.isChangePassword = false;
        } catch (error) {
            console.error('Error changing password:', error);
            this.error = error.response.data.message || 'Không thể đổi mật khẩu. Vui lòng thử lại sau.';
        } finally {
            this.loading = false;
            setTimeout(() => {
                this.success = null;
                this.error = null;
            }, 3000);
        }
    },
     async handleChangePasswordStaff(payload) {
        try{
            this.loading = true;
            const response = await staffService.changePassword(this.readerId, payload);
            this.success = response.message || 'Đổi mật khẩu thành công';
            this.isChangePassword = false;
        } catch (error) {
            console.error('Error changing password:', error);
            this.error = error.response.data.message || 'Không thể đổi mật khẩu. Vui lòng thử lại sau.';
        } finally {
            this.loading = false;
            setTimeout(() => {
                this.success = null;
                this.error = null;
            }, 3000);
        }
    }
  },
  created() {
    const isStaff = this.isStaff();
    if(!isStaff) {
      console.log('AccountProfile component created');
        this.getReaderId();
        this.getReaderInfo(this.readerId);
    } else {
        console.log('Staff profile component created');
        this.getReaderId().then(readerId => {
            this.getStaffInfo(readerId);
        });
    }
  }
};
</script>
