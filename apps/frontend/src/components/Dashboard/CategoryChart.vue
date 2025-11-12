<template>
  <div class="category-chart">
    <div
      v-for="category in categories"
      :key="category.name"
      class="category-chart__item"
    >
      <div class="category-chart__header">
        <span class="category-chart__name">{{ category.name }}</span>
        <span class="category-chart__count">{{ category.count }}</span>
      </div>
      <div class="category-chart__bar">
        <div
          class="category-chart__fill"
          :style="{ width: `${(category.count / maxCount) * 100}%` }"
        ></div>
      </div>
    </div>
    <p v-if="categories.length === 0" class="category-chart__empty">
      No hay categorías disponibles
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: { type: Array, default: () => [] }
})

const maxCount = computed(() => {
  if (props.categories.length === 0) return 1
  return Math.max(...props.categories.map(c => c.count))
})
</script>

<style lang="scss" scoped>
@use './CategoryChart.scss';
</style>

