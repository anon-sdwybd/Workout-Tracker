const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    exercise: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""
    }

});

WorkoutSchema.index({ userId: 1 })
module.exports = mongoose.model("Workout", WorkoutSchema);