const repo = require('../repositories/productsRepository')

function getNextId(products) {
    return products.length
        ? Math.max(...products.map(p => p.id)) + 1
        : 1
}

async function getAll() {
    return repo.getProducts()
}

async function getById(id) {
    const products = await repo.getProducts()
    return products.find(p => p.id === id)
}

async function create(data) {
    const products = await repo.getProducts()

    const product = {
        id: getNextId(products),
        name: data.name,
        category: data.category,
        price: data.price,
        image: data.image
    }

    products.push(product)

    await repo.saveProducts(products)

    return product
}

async function update(id, data) {
    const products = await repo.getProducts()

    const index = products.findIndex(p => p.id === id)
    if (index === -1) return null

    products[index] = {
        ...products[index],
        ...data
    }

    await repo.saveProducts(products)

    return products[index]
}

async function remove(id) {
    const products = await repo.getProducts()

    const filtered = products.filter(p => p.id !== id)

    if (filtered.length === products.length) return false

    await repo.saveProducts(filtered)

    return true
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}