<template>
  <div class="products-page">
    <div class="products-page__header">
      <h2 class="products-page__title">Productos</h2>
      <p class="products-page__subtitle">Gestiona tu catálogo de productos</p>
    </div>

    <div class="products-page__controls">
      <ProductFilter :categories="store.categories" v-model:filter="filter" />
    </div>

    <div class="products-page__grid">
      <template v-if="store.loading">
        <p>Loading...</p>
      </template>

      <template v-else>
        <EmptyState v-if="filtered.length === 0" />

        <ProductCard
          v-for="p in filtered"
          :key="p.id"
          :product="p"
          @delete="handleDelete"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard/ProductCard.vue'
import ProductFilter from '../components/ProductFilter/ProductFilter.vue'
import EmptyState from '../components/EmptyState/EmptyState.vue'
import {useToast} from 'primevue/usetoast'

const store = useProductsStore()
const toast = useToast()
const filter = ref('all')

onMounted(() => {
  store.fetchProducts()
})

const filtered = computed(() => {
  if (filter.value === 'all') return store.products
  return store.products.filter(p => p.category === filter.value)
})

async function handleDelete(id) {
  toast.add({
    severity: 'info',
    summary: 'Eliminando...',
    detail: 'Procesando solicitud',
    life: 1500
  })

  try {
    await store.deleteProduct(id)

    toast.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: 'Producto eliminado correctamente',
      life: 3000
    })

  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar',
      life: 3000
    })
  }
}
</script>

<style lang="scss">
@use '../styles/pages/_products.scss';
</style>

