const express = require('express')
const router = express.Router()

const productController = require('../controllers/productsController')

// GET all
router.get('/', productController.getAllProducts)

// GET by id
router.get('/:id', productController.getProductById)

// CREATE
router.post('/', productController.createProduct)

// UPDATE
router.put('/:id', productController.updateProduct)

// DELETE
router.delete('/:id', productController.deleteProduct)

module.exports = router