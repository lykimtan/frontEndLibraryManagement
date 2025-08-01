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
  name: 'CreateNXB',
  components: {
    NXBFormInfo
  },
  data() {
    return {
      nxb: {
        tennxb: '',
        diaChi: '',
      },
        error: null,
        success: null,
        loading: false
    };
  },

  methods: {
    async handleSubmit(nxbData) {
      try {
        console.log('NXB data:', nxbData);
        await nxbService.createNXB(nxbData);
        this.success = 'Thêm NXB thành công!';
        // Navigate về trang NXB sau 1,5s
        setTimeout(() => {
          this.$router.push({ name: 'NXB' });
        }, 1500);
        
      } catch (error) {
        console.error('Error Adding NXB:', error);
        this.error = 'Failed to add NXB';
      }
    },

    handleCancel() {
      this.$router.push({ name: 'NXB' });
    },
  },
};
</script>