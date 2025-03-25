const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    preferredDays: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
    },
});

module.exports = mongoose.model("Request", RequestSchema);
