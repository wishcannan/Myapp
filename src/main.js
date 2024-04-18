import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'



// createApp(App).mount('#app')
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
// app.provide('$message', ElMessage)
app.mount('#app')
