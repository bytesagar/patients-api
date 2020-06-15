const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    //mongoose bad objectid error
    if (err.name === 'CastError') {
        const message = `Patient not found with the id ${err.value}`;
        error = new CustomError(message, 404)
    }

    //mongoose duplicate key error handler
    if (err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new CustomError(message, 400)
    }

    const { statusCode, message } = error
    res.status(statusCode || 500).json({
        success: false,
        error: message
    })
}

module.exports = errorHandler