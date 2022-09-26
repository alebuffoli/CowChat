// CSS.
import 'solana-wallets-vue/styles.css'
import './main.css'
import Toast, { POSITION }  from "vue-toastification";
import "vue-toastification/dist/index.css";

// Day.js
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

// Routing.
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


// Create the app.
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 1,
    position:POSITION.TOP_RIGHT
  }).mount('#app')
