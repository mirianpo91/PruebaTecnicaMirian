<template>
  <Menubar :model="items" class="navbar">
    <template #start>
      <span class="navbar__logo">Mini Product Panel</span>
    </template>
    <template #end>
      <div class="navbar__user">
        <i class="pi pi-user navbar__user-icon"></i>
        <span class="navbar__user-name">{{ userStore.currentUser?.name }}</span>
      </div>
    </template>
  </Menubar>
</template>

<script setup>
import { computed } from 'vue'
import Menubar from 'primevue/menubar'
import { useUserStore } from '../../stores/user'
import { useNavigationStore } from '../../stores/navigation'

const userStore = useUserStore()
const navigationStore = useNavigationStore()

const items = computed(() => [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => {
      navigationStore.setCurrentView('dashboard')
    },
    class: navigationStore.currentView === 'dashboard' ? 'p-menuitem-active' : ''
  },
  {
    label: 'Productos',
    icon: 'pi pi-box',
    command: () => {
      navigationStore.setCurrentView('products')
    },
    class: navigationStore.currentView === 'products' ? 'p-menuitem-active' : ''
  }
])
</script>

<style lang="scss" scoped>
@use './Navbar.scss';
</style>

