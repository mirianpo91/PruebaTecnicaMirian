<template>
  <div class="category-chart">
    <div
      v-for="category in sortedCategories"
      :key="category.name"
      class="category-chart__item">

      <div class="category-chart__header">
        <span class="category-chart__name" :title="category.name">
          {{ category.name }}
        </span>

        <span class="category-chart__count">
          {{ category.count }}
        </span>
      </div>

      <div class="category-chart__bar">
        <div
            class="category-chart__fill"
            role="progressbar"
            :aria-label="`${category.name}: ${category.count}`"
            :aria-valuenow="category.count"
            aria-valuemin="0"
            :aria-valuemax="maxCount"
            :style="{
            width: `${getWidth(category.count)}%`,
            backgroundColor: category.color || '#3b82f6'
          }"
        />
      </div>
    </div>
    <p v-if="!sortedCategories.length" class="category-chart__empty">
      No hay categorías disponibles
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
    validator: (items) =>
        items.every(
            (item) =>
                typeof item.name === 'string' &&
                typeof item.count === 'number'
        )
  }
})

const sortedCategories = computed(() => {
  return [...props.categories].sort(
      (a, b) => b.count - a.count
  )
})

const maxCount = computed(() => {
  return Math.max(
      ...sortedCategories.value.map(
          (category) => Number(category.count) || 0
      ),
      1
  )
})

const getWidth = (count) => {
  if (!count || count <= 0) return 0

  return Math.min(
      (count / maxCount.value) * 100,
      100
  )
}
</script>

<style lang="scss" scoped>
@use './CategoryChart.scss';
</style>

