import { apiClient } from './api'

/**
 * Servicio para gestionar productos
 */
export const productsService = {
  /**
   * Obtener todos los productos
   * @returns {Promise<Array>} Lista de productos
   */
  async getAll() {
    try {
      const response = await apiClient.get('/products')
      return response.data
    } catch (error) {
      console.error('Error en productsService.getAll:', error)
      throw error
    }
  },

  /**
   * Obtener un producto por ID
   * @param {number} id - ID del producto
   * @returns {Promise<Object>} Producto
   */
  async getById(id) {
    return await apiClient.get(`/products/${id}`)
  },

  /**
   * Crear un nuevo producto
   * @param {Object} product - Datos del producto
   * @param {string} product.name - Nombre del producto
   * @param {string} product.category - Categoría del producto
   * @param {number} product.price - Precio del producto
   * @param {string} [product.image] - URL de la imagen
   * @returns {Promise<Object>} Producto creado
   */
  async create(product) {
    try {
      return await apiClient.post('/products', product)
    } catch (error) {
      console.error('Error en productsService.create:', error)
      throw error
    }
  },

  /**
   * Actualizar un producto
   * @param {number} id - ID del producto
   * @param {Object} product - Datos actualizados del producto
   * @returns {Promise<Object>} Producto actualizado
   */
  async update(id, product) {
    try {
      return await apiClient.put(`/products/${id}`, product)
    } catch (error) {
      console.error('Error en productsService.update:', error)
      throw error
    }
  },

  /**
   * Eliminar un producto
   * @param {number} id - ID del producto
   * @returns {Promise<Object>} Resultado de la eliminación
   */
  async delete(id) {
    return await apiClient.delete(`/products/${id}`)
  }
}

