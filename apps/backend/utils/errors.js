function httpError(res, status, message, error = null) {
    if (error) console.error(error)

    return res.status(status).json({
        error: message
    })
}

const badRequest = (res, msg) =>
    httpError(res, 400, msg)

const notFound = (res, msg) =>
    httpError(res, 404, msg)

const serverError = (res, err, msg) =>
    httpError(res, 500, msg, err)

module.exports = {
    httpError,
    badRequest,
    notFound,
    serverError
}