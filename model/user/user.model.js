const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    fullName: {
        type: String,
        default: null
    },
    role: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    }],
    email: {
        type: String,
        default: null
    },
    mobileCode: {
        type: String,
        default: "+91"
    },
    mobileNumber: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
}, { timestamps: true })

module.exports = mongoose.model("Users", userSchema)