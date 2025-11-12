const fs = require('fs').promises
const path = require('path')

const DB_PATH = path.join(__dirname, '../data/database.json')

// Helper para leer la base de datos
async function readDatabase() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // Si el archivo no existe, crear uno con datos iniciales
    const initialData = { products: [] }
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2))
    return initialData
  }
}

// Helper para escribir en la base de datos
async function writeDatabase(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

// Obtener todos los productos
async function getAllProducts(req, res) {
  try {
    const db = await readDatabase()
    // Simular latencia de red
    setTimeout(() => {
      res.json(db.products)
    }, 300)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', message: error.message })
  }
}

// Obtener un producto por ID
async function getProductById(req, res) {
  try {
    const db = await readDatabase()
    const id = Number(req.params.id)
    const product = db.products.find(p => p.id === id)
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', message: error.message })
  }
}

// Crear un nuevo producto
async function createProduct(req, res) {
  try {
    const { name, category, price, image } = req.body
    
    if (!name || !category) {
      return res.status(400).json({ error: 'name y category son requeridos' })
    }
    
    const db = await readDatabase()
    const id = db.products.length 
      ? Math.max(...db.products.map(p => p.id)) + 1 
      : 1
    
    const newProduct = {
      id,
      name,
      category,
      price: Number(price) || 0,
      image: image || 'https://placehold.co/300x200'
    }
    
    db.products.push(newProduct)
    await writeDatabase(db)
    
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto', message: error.message })
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id)
    const { name, category, price, image } = req.body
    
    const db = await readDatabase()
    const productIndex = db.products.findIndex(p => p.id === id)
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    
    const updatedProduct = {
      ...db.products[productIndex],
      ...(name && { name }),
      ...(category && { category }),
      ...(price !== undefined && { price: Number(price) }),
      ...(image && { image })
    }
    
    db.products[productIndex] = updatedProduct
    await writeDatabase(db)
    
    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', message: error.message })
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id)
    const db = await readDatabase()
    const beforeLength = db.products.length
    db.products = db.products.filter(p => p.id !== id)
    
    if (db.products.length === beforeLength) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    
    await writeDatabase(db)
    res.json({ success: true, message: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto', message: error.message })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}

