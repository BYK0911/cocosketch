import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import elementPlus from 'element-plus'
import '@/assets/iconfont/iconfont.css'
import 'element-plus/theme-chalk/index.css'
import '@/assets/main.css'
import './store'

createApp(App).use(router).use(elementPlus).mount('#app')
