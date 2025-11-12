<template>
  <div class="stat-card" :class="`stat-card--${color}`">
    <div class="stat-card__icon">
      <i :class="icon"></i>
    </div>
    <div class="stat-card__content">
      <p class="stat-card__value">{{ value }}</p>
      <p class="stat-card__title">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, required: true },
  color: { type: String, default: 'primary' }
})
</script>

<style lang="scss" scoped>
@use './StatCard.scss';
</style>

