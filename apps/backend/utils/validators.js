function isValidId(id) {
    return !Number.isNaN(Number(id))
}

function isValidString(str) {
    return typeof str === 'string' && str.trim().length > 0
}

function parsePrice(price) {
    const n = Number(price)
    return Number.isNaN(n) ? null : n
}

module.exports = {
    isValidId,
    isValidString,
    parsePrice
}