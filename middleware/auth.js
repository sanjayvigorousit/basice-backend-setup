const jwt = require("jsonwebtoken")

// Middleware function to check token
const verifyUserToken = (req, res, next) => {
    // Get token from headers
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // Check if token exists
    if (!token) {
        let responseData = {
            statusCode: 401,
            message: "Access denied. No token provided.",
            data: null
        }
        return errorResponse(res, responseData) 
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in environment variables
        req.user = decoded; // Attach the decoded user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        let responseData = {
            statusCode: 401,
            message: "Invalid or expired token.",
            data: null
        }
        return errorResponse(res, responseData) 
    }
};

module.exports = {
    verifyUserToken
}