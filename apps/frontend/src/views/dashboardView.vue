<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <h2 class="dashboard__title">Dashboard</h2>
      <p class="dashboard__subtitle">Resumen general de productos</p>
    </div>

    <div class="dashboard__stats">
      <StatCard
        v-for="stat in stats"
        :key="stat.id"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <div class="dashboard__sections">
      <div class="dashboard__section">
        <h3 class="dashboard__section-title">Categorías más populares</h3>
        <CategoryChart :categories="categoryStats" />
      </div>

      <div class="dashboard__section">
        <h3 class="dashboard__section-title">Productos recientes</h3>
        <RecentProducts :products="recentProducts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '../stores/products'
import StatCard from '../components/Dashboard/StatCard.vue'
import CategoryChart from '../components/Dashboard/CategoryChart.vue'
import RecentProducts from '../components/Dashboard/RecentProducts.vue'
import {formatPrice} from "../utils/formatters";

const productsStore = useProductsStore()

const stats = computed(() => [
  {
    id: 1,
    title: 'Total Productos',
    value: productsStore.products.length,
    icon: 'pi pi-box',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Categorías',
    value: productsStore.categories.length,
    icon: 'pi pi-tags',
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Precio Promedio',
    value: formatPrice(averagePrice.value),
    icon: 'pi pi-euro',
    color: 'accent'
  },
  {
    id: 4,
    title: 'Productos Activos',
    value: productsStore.products.length,
    icon: 'pi pi-check-circle',
    color: 'success'
  }
])

const averagePrice = computed(() => {
  if (productsStore.products.length === 0) return '0.00'
  const total = productsStore.products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0)
  return (total / productsStore.products.length).toFixed(2)
})

const categoryStats = computed(() => {
  const categoryCount = {}
  productsStore.products.forEach(product => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1
  })
  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const recentProducts = computed(() => {
  return [...productsStore.products]
    .sort((a, b) => (b.id || 0) - (a.id || 0))
    .slice(0, 5)
})
</script>

<style lang="scss">
@use '../styles/pages/_dashboard.scss';
</style>

