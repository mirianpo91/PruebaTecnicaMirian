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

const navigateTo = (view) => {
  navigationStore.setCurrentView(view)
}

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    view: 'dashboard'
  },
  {
    label: 'Productos',
    icon: 'pi pi-box',
    view: 'products'
  }
]

const items = computed(() =>
    menuItems.map((item) => ({
      label: item.label,
      icon: item.icon,
      command: () => navigateTo(item.view),
      class:
          navigationStore.currentView === item.view
              ? 'p-menuitem-active'
              : ''
    }))
)
</script>

<style lang="scss" scoped>
@use './Navbar.scss';
</style>

