<template>
        <h1 class="text-center fw-bold">Chào mừng đến với Library-Service 
            <br>
        <i class="fa-solid fa-book-open"></i>
        </h1>
        <p class="text-center text-dark mb-5">
            Hệ thống quản lý thư viện hiện đại và tiện lợi
        </p>
        <FormLogin />

</template>
<script>
import FormLogin from '@/components/FormLogin.vue';

export default {
    name: 'LoginPage',
    components: {
        FormLogin
    }
}

</script>