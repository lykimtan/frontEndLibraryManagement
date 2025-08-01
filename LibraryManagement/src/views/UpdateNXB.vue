<template>
    <div class="container">
        <div v-if="error" class="alert alert-danger">
            {{ error }}
        </div>

        <div v-if="success" class="alert alert-success">
            {{ success }}
        </div>
        <!-- Chỉ render FormBookInfo khi đã có book data -->
        <NXBFormInfo
            v-if="nxb && !loading"
            :nxb="nxb"
            @submit="handleSubmit"
            @cancel="handleCancel"
            class="mt-4"
        />
        
    </div>
</template>

<script>
import FormBookInfo from '@/components/FormBookInfo.vue';
import NXBFormInfo from '@/components/NXBFormInfo.vue';
import nxbService from '@/services/nxb.service';

export default {
  name: 'UpdateNXB',
  components: {
    NXBFormInfo
  },
  data() {
    return {
      nxb: null,
      error: null,
       success: null,
       loading: false
    };
  },

  methods: {
    async getNXBDetails(nxbId) {
        try {
            this.loading = true;
            console.log('Fetching NXB with ID:', nxbId);
            const response = await nxbService.getNXBById(nxbId);
            this.nxb = response;
            console.log('NXB loaded successfully:', this.nxb);
        } catch (error) {
            console.error('Error fetching NXB:', error);
            this.error = 'Failed to fetch NXB details';
        } finally {
            this.loading = false;
        }
    },
    async handleSubmit(nxbData) {
      try {
        const nxbId = this.$route.params.nxbId;
        console.log('NXB data:', nxbData);
        console.log('Updating NXB with ID:', nxbId);
        await nxbService.updateNXB(nxbId, nxbData);
        this.success = 'Cập nhật NXB thành công!';
        // Navigate về trang NXB sau 1,5s
        setTimeout(() => {
            this.$router.push({ name: 'NXB' });
        }, 1500);
        
      } catch (error) {
        console.error('Error Updating NXB:', error);
        this.error = 'Failed to update NXB';
      }
    },

    handleCancel() {
      this.$router.push({ name: 'NXB' });
    },
  },

  created() {
    const nxbId = this.$route.params.nxbId; // Lấy ID từ route params
    console.log('UpdateNXB created with ID:', nxbId);
    if (nxbId) {
        this.getNXBDetails(nxbId);
    } else {
        this.error = 'NXB ID không hợp lệ';
    }
  }
};
</script>