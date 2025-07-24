import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/home.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },

    {
        path: '/books',
        name: 'Books',
        component: () => import('@/views/Book.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;