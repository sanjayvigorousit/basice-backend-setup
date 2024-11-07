const { validationResult } = require("express-validator");
const { errorResponse } = require("../helper");

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let responseData = {
            statusCode: 401,
            message: errors.array()[0].msg,
            data: null
        }
        return errorResponse(res, responseData)
    }
    return next()
}

module.exports = checkValidation