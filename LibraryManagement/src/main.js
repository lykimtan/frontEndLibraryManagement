import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
import "@fortawesome/fontawesome-free/css/all.min.css"

import router from './router'

createApp(App).use(router).mount('#app')
