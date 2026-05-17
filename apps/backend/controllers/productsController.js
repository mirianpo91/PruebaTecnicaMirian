const service = require('../services/productsService')

const {
  badRequest,
  notFound,
  serverError
} = require('../utils/errors')

const {
  isValidId,
  isValidString,
  parsePrice
} = require('../utils/validators')

const DEFAULT_IMAGE = 'https://placehold.co/300x200'

const delay = (ms) =>
    new Promise(r => setTimeout(r, ms))

// Obtener todos los productos
async function getAllProducts(req, res) {
  try {
    await delay(200)

    const data = await service.getAll()

    return res.json({ data })
  } catch (err) {
    return serverError(res, err, 'Error al obtener productos')
  }
}

// Obtener un producto por ID
async function getProductById(req, res) {
  try {
    const id = Number(req.params.id)

    if (!isValidId(id)) {
      return badRequest(res, 'ID inválido')
    }

    const product = await service.getById(id)

    if (!product) {
      return notFound(res, 'Producto no encontrado')
    }

    return res.json({ data: product })
  } catch (err) {
    return serverError(res, err, 'Error al obtener producto')
  }
}

// Crear un nuevo producto
async function createProduct(req, res) {
  try {
    const { name, category, price, image } = req.body

    if (!isValidString(name) || !isValidString(category)) {
      return badRequest(res, 'name y category son requeridos')
    }

    const parsedPrice = parsePrice(price)

    if (parsedPrice === null) {
      return badRequest(res, 'price inválido')
    }

    const product = await service.create({
      name,
      category,
      price: parsedPrice,
      image: (image && image.trim()) || DEFAULT_IMAGE
    })

    return res.status(201).json({ data: product })
  } catch (err) {
    return serverError(res, err, 'Error al crear producto')
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id)

    if (!isValidId(id)) {
      return badRequest(res, 'ID inválido')
    }

    const updated = await service.update(id, req.body)

    if (!updated) {
      return notFound(res, 'Producto no encontrado')
    }

    return res.json({ data: updated })
  } catch (err) {
    return serverError(res, err, 'Error al actualizar producto')
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id)

    if (!isValidId(id)) {
      return badRequest(res, 'ID inválido')
    }

    const ok = await service.remove(id)

    if (!ok) {
      return notFound(res, 'Producto no encontrado')
    }

    return res.status(204).send()
  } catch (err) {
    return serverError(res, err, 'Error al eliminar producto')
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}