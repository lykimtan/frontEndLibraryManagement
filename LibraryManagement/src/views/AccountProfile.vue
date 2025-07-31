<template>
    <div class="container">
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>
        <h1 class="text-center">Profile</h1>
       <Profile
        :reader="reader"
        @update-profile="editProfile"
        @open-change-password="isChangePassword = !isChangePassword"
        />

        <ChangePassword v-if="isChangePassword"
        @change-password="handleChangePassword"
        :error="error"
        />
    </div>




</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue';
import Profile from '@/components/Profile.vue';
import readerService from '@/services/reader.service';

export default {
  name: 'AccountProfile',
  components: {
    Profile,
    ChangePassword
  },

  data() {
    return {
        readerId: '',
        error: null,
        success: null,
        reader: null,
        loading: false,
        isChangePassword: false,
    };
  },
  methods: {
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
    }
  },
  created() {
    console.log('AccountProfile component created');
    this.getReaderId();
    this.getReaderInfo(this.readerId);
  }
};
</script>
