<template>
  <div class="product-filter p-flex p-ai-center">
    <label class="product-filter__label" for="category">Categoria:</label>
    <select class="product-filter__select" id="category" v-model="localFilter">
      <option value="all">Todas</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>
</template>

<script setup>
import { toRef, watch, ref } from 'vue'
const props = defineProps({ categories: { type: Array, default: () => [] }, filter: { type: String } })
const emits = defineEmits(['update:filter'])

const localFilter = ref(props.filter ?? 'all')

watch(localFilter, (v) => emits('update:filter', v))
</script>

<style lang="scss" scoped>
@use './ProductFilter.scss';
</style>

