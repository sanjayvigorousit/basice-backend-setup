const errorResponse = (res, data) => {
    return res.status(data.statusCode || 500).json({
        statusCode  : data.statusCode || 500,
        message     : data.message || "something went wrong!",
        data        : data.data || null,
    })
}

const successResponse = (res, data) => {
    return res.status(data.statusCode || 200).json({
        statusCode  : data.statusCode || 200,
        message     : data.message || "success",
        data        : data.data || null,
    })
}

module.exports = {
    errorResponse,
    successResponse
}