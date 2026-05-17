<template>
  <div class="recent-products">
    <div
      v-for="product in products"
      :key="product.id"
      class="recent-products__item"
    >
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="recent-products__image"
      />
      <div v-else class="recent-products__image-placeholder">
        <i class="pi pi-image"></i>
      </div>
      <div class="recent-products__content">
        <p class="recent-products__name">{{ product.name }}</p>
        <p class="recent-products__category">{{ product.category }}</p>
      </div>
      <div class="recent-products__price">
        <span>{{ formatPrice(product.price) }}</span>
      </div>
    </div>
    <p v-if="products.length === 0" class="recent-products__empty">
      No hay productos disponibles
    </p>
  </div>
</template>

<script setup>
import { formatPrice } from '../../utils/formatters'
defineProps({
  products: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
@use './RecentProducts.scss';
</style>

