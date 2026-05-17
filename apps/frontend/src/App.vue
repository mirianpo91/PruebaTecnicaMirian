<template>
  <div class="app">
    <Navbar />
    <main class="app__main">
      <section class="app__content">
        <DashboardView v-if="navigationStore.currentView === 'dashboard'" />
        <ProductsView v-else-if="navigationStore.currentView === 'products'" />
      </section>
    </main>
    <Toast />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar/Navbar.vue'
import DashboardView from './views/dashboardView.vue'
import ProductsView from './views/productsView.vue'
import { useNavigationStore } from './stores/navigation'
import { useProductsStore } from './stores/products'
import Toast from 'primevue/toast'

const navigationStore = useNavigationStore()
const productsStore = useProductsStore()

onMounted(() => {
  // Cargar productos al iniciar para que el dashboard tenga datos
  productsStore.fetchProducts()
})
</script>

<style lang="scss">
@use './styles/abstracts/variables' as *;
@use './styles/abstracts/colors' as *;
@use './styles/base/_typography' as *;

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
  padding: $spacing__16;
}

.app__header {
  h1 {
    @include headline-large();
    color: $color__primary;
    margin-bottom: $spacing__24;
  }
}
</style>
