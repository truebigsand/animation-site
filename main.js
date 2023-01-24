import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

import App from './src/App.vue'
import Home from './src/views/Home.vue'
import Animation from './src/views/Animation.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/animation/:id', component: Animation }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')