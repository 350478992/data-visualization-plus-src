import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App)

const store = createPinia();
store.use(piniaPersist) // 注入可持续化存储插件

app.use(store)

app.mount('#app')
