<template>
  <article class="product-card p-card">
    <div class="product-card__media">
      <img class="product-card__image" :src="product.image" alt="product image" />
    </div>
    <div class="product-card__body">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__category">{{ product.category }}</p>
      <p class="product-card__price">{{ formatPrice(product.price) }}</p>
      <div class="product-card__actions">
        <button class="product-card__button" @click="onView">Ver</button>
        <button class="product-card__button product-card__button--delete" @click="onDelete">Borrar</button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { formatPrice } from '../../utils/formatters'

const props = defineProps({ product: { type: Object, required: true } })
const emit = defineEmits(['delete'])

function onView() { alert(JSON.stringify(props.product, null, 2)) }

function onDelete() {
  const confirmDelete = confirm('¿Seguro que quieres eliminar este producto?')

  if (!confirmDelete) return

  emit('delete', props.product.id)
}
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
  background: $color__white;
  align-items: flex-start;
}

.product-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: $spacing__4;
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
  height: 120px;
  object-fit: cover;
  border-radius: $border-radius__8;
}

.product-card__actions {
  display: flex;
  gap: $spacing__8;
  margin-top: $spacing__12;
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

  &--delete {
    background: $color__accent-red;

    &:hover {
      background: darken($color__accent-red, 10%);
    }
  }
}
</style>

