import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const currentView = ref('dashboard')

  const views = {
    dashboard: 'Dashboard',
    products: 'Productos'
  }

  function setCurrentView(view) {
    if (views[view]) {
      currentView.value = view
    }
  }

  return { currentView, views, setCurrentView }
})

