import { ref, computed } from 'vue'
import { productsService } from '../services/productsService'

/**
 * Composable para gestionar productos
 * Proporciona estado y métodos para trabajar con productos
 */
export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Categorías únicas derivadas de los productos
   */
  const categories = computed(() => {
    return Array.from(new Set(products.value.map(p => p.category)))
  })

  /**
   * Obtener todos los productos
   */
  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      products.value = await productsService.getAll()
    } catch (err) {
      error.value = err.message || 'Error al cargar productos'
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Crear un nuevo producto
   * @param {Object} productData - Datos del producto
   */
  async function createProduct(productData) {
    loading.value = true
    error.value = null
    try {
      const newProduct = await productsService.create(productData)
      products.value.push(newProduct)
      return newProduct
    } catch (err) {
      // El service ya hace console.error, pero aquí también necesitamos gestionar el error
      const errorMessage = err.message || 'Error al crear producto'
      error.value = errorMessage
      // Validación adicional: si el error es de validación, formatear el mensaje
      if (err.message && err.message.includes('validation')) {
        error.value = 'Los datos del producto no son válidos'
      }
      console.error('Error en createProduct:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualizar un producto
   * @param {number} id - ID del producto
   * @param {Object} productData - Datos actualizados
   */
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
    } catch (err) {
      // Gestión de errores similar a createProduct pero con lógica ligeramente diferente
      const errorMessage = err.message || 'Error al actualizar producto'
      error.value = errorMessage
      if (err.message && err.message.includes('404')) {
        error.value = 'El producto no existe'
      } else if (err.message && err.message.includes('validation')) {
        error.value = 'Los datos del producto no son válidos'
      }
      console.error('Error en updateProduct:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Eliminar un producto
   * @param {number} id - ID del producto
   */
  async function deleteProduct(id) {
    loading.value = true
    error.value = null
    try {
      await productsService.delete(id)
      products.value = products.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err.message || 'Error al eliminar producto'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener un producto por ID
   * @param {number} id - ID del producto
   */
  async function getProductById(id) {
    loading.value = true
    error.value = null
    try {
      return await productsService.getById(id)
    } catch (err) {
      error.value = err.message || 'Error al obtener producto'
      throw err
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
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
  }
}

