const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email ID");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    message: {
        type: String,
        required: true,
        minLength: 3
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// now we need to create a collection
const User = new mongoose.model("User", contactSchema);

module.exports = User;