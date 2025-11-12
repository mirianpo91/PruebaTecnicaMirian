<template>
  <article class="product-card p-card">
    <div class="product-card__media">
      <img class="product-card__image" :src="product.image" alt="product image" />
    </div>
    <div class="product-card__body">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__category">{{ product.category }}</p>
      <p class="product-card__price">€ {{ product.price }}</p>
      <button class="product-card__button" @click="onView">Ver</button>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({ product: { type: Object, required: true } })
function onView() { alert(JSON.stringify(props.product, null, 2)) }
</script>

<style lang="scss" scoped>
@use './ProductCard.scss';
@use '../../styles/abstracts/variables' as *;
@use '../../styles/abstracts/colors' as *;
@use '../../styles/base/_typography' as *;

.product-card { 
  display: flex; 
  gap: $spacing__16; 
  padding: $spacing__16; 
  border: 1px solid $color__light-grey; 
  border-radius: $border-radius__default; 
}

.product-card__title {
  @include title-medium();
  color: $color__black;
  margin-bottom: $spacing__8;
}

.product-card__category {
  @include body-medium();
  color: $color__mid-grey;
  margin-bottom: $spacing__4;
}

.product-card__media {
  flex-shrink: 0;
}

.product-card__image { 
  width: 120px; 
  height: 80px; 
  object-fit: contain; 
  border-radius: $border-radius__4; 
}

.product-card__button {
  @include label-medium();
  padding: $spacing__8 $spacing__16;
  margin-top: $spacing__12;
  background: $color__primary;
  color: $color__white;
  border: none;
  border-radius: $border-radius__4;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: darken($color__primary, 10%);
  }
}
</style>

