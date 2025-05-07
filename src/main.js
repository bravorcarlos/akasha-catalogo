// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'  // Importamos el plugin de persistencia

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)  // Usamos el plugin de persistencia

app.use(pinia)
app.use(router)

app.mount('#app')
