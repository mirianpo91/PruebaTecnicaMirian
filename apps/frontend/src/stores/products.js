import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productsService } from '../services/productsService'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Categorías derivadas de los productos
  const categories = computed(() => {
    return Array.from(new Set(products.value.map(p => p.category)))
  })

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      products.value = await productsService.getAll()
    } catch (e) {
      error.value = e.message || String(e)
      console.error('Error fetching products:', e)
    } finally {
      loading.value = false
    }
  }

  async function addProduct(product) {
    loading.value = true
    error.value = null
    try {
      const newProduct = await productsService.create(product)
      products.value.push(newProduct)
      return newProduct
    } catch (e) {
      error.value = e.message || String(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(id, productData) {
    loading.value = true
    error.value = null
    try {
      const updatedProduct = await productsService.update(id, productData)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = updatedProduct
      }
      return updatedProduct
    } catch (e) {
      error.value = e.message || String(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id) {
    loading.value = true
    error.value = null
    try {
      await productsService.delete(id)
      products.value = products.value.filter(p => p.id !== id)
    } catch (e) {
      error.value = e.message || String(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return { 
    products, 
    categories, 
    loading, 
    error, 
    fetchProducts, 
    addProduct,
    updateProduct,
    deleteProduct
  }
})
