<template>
  
        <h1 class="text-center fw-bold">Chào mừng đến với Library-Service</h1>
        <p class="text-center text-light mb-5">
            Hệ thống quản lý thư viện hiện đại và tiện lợi
        </p>
        <RegisterForm />

</template>
<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
    name: 'RegisterPage',
    components: {
        RegisterForm
    }
}

</script>