const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    Height: {
        type: String,
    },
    Weight: {
        type: String,
    },
    BloodGroup: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }


})

module.exports = mongoose.model("Patient", patientSchema)