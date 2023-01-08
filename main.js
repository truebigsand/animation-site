import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

import App from './App.vue'
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

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)