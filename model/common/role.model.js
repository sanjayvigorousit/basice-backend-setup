const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "user"
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Roles", roleSchema)