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

const store = useProductsStore()
const filter = ref('all')

onMounted(() => {
  store.fetchProducts()
})

const filtered = computed(() => {
  if (filter.value === 'all') return store.products
  return store.products.filter(p => p.category === filter.value)
})
</script>

<style lang="scss">
@use '../styles/pages/_products.scss';
</style>

