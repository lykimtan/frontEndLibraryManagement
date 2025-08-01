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
        path: '/create-book',
        name: 'CreateBook',
        component: () => import('@/views/AddBook.vue')
    },

    {
        path: '/nxb',
        name: 'NXB',
        component: () => import('@/views/NXB.vue')
    },

    {
        path: '/create_nxb',
        name: 'CreateNXB',
        component: () => import('@/views/AddNXB.vue')
    },

    {
        path: '/update-nxb/:nxbId',
        name: 'UpdateNXB',
        component: () => import('@/views/UpdateNXB.vue'),
        props: true
    },

     {
        path: '/update-book/:bookId',
        name: 'UpdateBook',
        component: () => import('@/views/UpdateBook.vue'),
        props: true
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

    {
        path: '/history',
        name: 'History',
        component: () => import('@/views/History.vue')
    },

    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/AccountProfile.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;