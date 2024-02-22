import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import elementPlus from 'element-plus'
import '@/assets/main.css'
import '@/assets/iconfont/iconfont.css'
import 'element-plus/theme-chalk/index.css'

createApp(App).use(router).use(elementPlus).mount('#app')
