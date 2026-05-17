const currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
})

export const formatPrice = (value) => {
    const number = Number(value)

    return currencyFormatter.format(
        Number.isNaN(number) ? 0 : number
    )
}