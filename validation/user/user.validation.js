const { check } = require("express-validator")
const userModel = require("../../model/user/user.model")

const userSignUp = (req, res) => {
    return [
        // check('name')
        // .notEmpty().withMessage('Name is required')
        // .isAlpha('en-US', { ignore: ' ' }).withMessage('Name should contain only letters'),

        check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .custom((email) => {
            return userModel.findOne({email}).then((result) => {
                if (result) {
                    return Promise.reject("Email already taken!")
                }
            })
        }),
        
        check('mobileCode')
        .notEmpty().withMessage('Mobile counntry code is required'),

        check('mobileNumber')
        .notEmpty().withMessage('Mobile number is required')
        .isNumeric().withMessage('Mobile number should contain only numbers')
        .isLength({ min: 10, max: 10 }).withMessage('Mobile number should be 10 digits')
        .custom((mobileNumber) => {
            return userModel.findOne({mobileNumber}).then((result) => {
                if (result) {
                    return Promise.reject("Mobile number already taken!")
                }
            })
        }),
    ]
}

const userLogin = (req, res) => {
    return [
        check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .custom((email) => {
            return userModel.findOne({email}).then((result) => {
                if (!result) {
                    return Promise.reject("Invalid credentials!")
                }
            })
        }),
        
        check('password')
        .notEmpty().withMessage('Invalid credentials!'),
    ]
}

module.exports = {
    userSignUp,
    userLogin
}