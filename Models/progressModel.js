const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    workoutName: {
        type: String,
        required: true,
    },
    intensity: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    height: {
        type: Date,
        required: true,
    },
    age: {
        type: String,
        required: true
    },
    weightGoal: {
        type: String,
        required: true,
    },



    });

module.exports = mongoose.model("demoplans", ProgressSchema);
