import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)

  function setCurrentUser(user) {
    currentUser.value = user
  }

  function initUser() {
    // Simular usuario logueado
    setCurrentUser({
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com'
    })
  }

  return { currentUser, setCurrentUser, initUser }
})

