import { createApp } from 'vue'
import './style.css'
import App from "./App.vue"
import router from './utils/router.js'
// element ui 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'






// createApp(App).mount('#app')
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.provide('$test', router)
app.mount('#app')
