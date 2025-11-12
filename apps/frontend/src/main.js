import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Styles (SASS 7-1)
import './styles/main.scss'

// Stores
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(PrimeVue)

// Inicializar usuario simulado
const userStore = useUserStore()
userStore.initUser()

app.mount('#app')
