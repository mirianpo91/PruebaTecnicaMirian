import { ref } from 'vue'

/**
 * Composable genérico para manejar operaciones asíncronas
 * Útil para cualquier operación que necesite estado de loading y error
 * 
 * @param {Function} asyncFn - Función asíncrona a ejecutar
 * @returns {Object} Objeto con loading, error y execute
 */
export function useAsync(asyncFn) {
  const loading = ref(false)
  const error = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      const result = await asyncFn(...args)
      return result
    } catch (err) {
      error.value = err.message || 'Ha ocurrido un error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    execute
  }
}

