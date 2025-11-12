const express = require('express')
const cors = require('cors')
const productsController = require('./controllers/productsController')

const app = express()
app.use(cors())
app.use(express.json())

// Rutas de productos
app.get('/products', productsController.getAllProducts)
app.get('/products/:id', productsController.getProductById)
app.post('/products', productsController.createProduct)
app.put('/products/:id', productsController.updateProduct)
app.delete('/products/:id', productsController.deleteProduct)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Backend running on port', PORT))
