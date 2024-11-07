const { errorResponse, successResponse } = require("../../helper");
const roleModel = require("../../model/common/role.model");
const userModel = require("../../model/user/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const fileUploader = require("../../services/fileUploader.service");

const signUp = async (req, res) => {
    var response = {}
    try {
        const { firstName, lastName, fullName, email, mobileCode, mobileNumber, password } = req.body
        const files = req.files.file

        const fileName = await fileUploader({
                file: files, 
                location: '/files/',
                allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
            }, res
        )

        if (!fileName.status) {
            response = {
                statusCode: 400,
                message: fileName.message,
                data: null
            }
            return errorResponse(res, response)
        }
        console.log("fileName", fileName.message);
        
        const getRoles = await roleModel.findOne({ name : "admin" })
        if (!getRoles) {
            response = {
                statusCode: 404,
                message: "Role not found, Please try again!",
                data: null
            }
            return errorResponse(res, response)
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await new userModel({ 
            firstName   : firstName,
            lastName    : lastName,
            fullName    : fullName,
            role        : [getRoles._id],
            email       : email,
            mobileCode  : mobileCode,
            mobileNumber: mobileNumber,
            status      : true,
            password    : hashedPassword
        }).save()

        const rawData = {
            id: result._id,
            role: result.role,
            email: result.email,
            status: result.status,
            fullName: result.fullName,
            mobileNumber: result.mobileNumber,
        }
        const token = jwt.sign(rawData, process.env.JWT_SECRET, { expiresIn: '1h' });

        response = {
            statusCode: 200,
            message: "User created successfully",
            data: token
        }
        return successResponse(res, response)
    } catch (error) {
        logger.error(`Error create user : ${error.message}`);
        response = {
            statusCode: 500,
            message: "something went wrong!",
            data: null
        }
        return errorResponse(res, response)
    }
}

const login = async (req, res) => {
    var response = {}
    try {
        const { email, password } = req.body;
        console.log("email, password", email, password);

        // Check if user exists
        const existsUser = await userModel.findOne({ email });
        if (!existsUser) {
            response = {
                statusCode: 400,
                message: "Invalid credentials!",
                data: null
            };
            return errorResponse(res, response);
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, existsUser.password);
        console.log("isMatch", isMatch);
        if (!isMatch) { // Fix: Check if the password does not match
            response = {
                statusCode: 400,
                message: "Invalid credentials!",
                data: null
            };
            return errorResponse(res, response);
        }

        // Generate JWT token
        const rawData = {
            id: existsUser._id,
            role: existsUser.role,
            email: existsUser.email,
            status: existsUser.status,
            fullName: existsUser.fullName,
            mobileNumber: existsUser.mobileNumber,
        };
        const token = jwt.sign(rawData, process.env.JWT_SECRET, { expiresIn: '1h' });

        response = {
            statusCode: 200,
            message: "User loged in successfully",
            data: token
        }
        return successResponse(res, response)
    } catch (error) {
        logger.error(`Error login user : ${error.message}`);
        response = {
            statusCode: 500,
            message: "something went wrong!",
            data: null
        }
        return errorResponse(res, response)
    }
}

module.exports = {
    signUp,
    login
}