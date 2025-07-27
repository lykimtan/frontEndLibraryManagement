import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },

    {
        path: '/books',
        name: 'Books',
        component: () => import('@/views/Book.vue')
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },

    {
        path: '/create_request/:bookId',
        name: 'CreateRequest',
        component: () => import('@/views/CreateRequest.vue')
    },

    {
        path: '/requests',
        name: 'Requests',
        component: () => import('@/views/Request.vue')
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;