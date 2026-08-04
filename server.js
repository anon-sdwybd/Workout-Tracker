require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const WorkoutSchema = new mongoose.Schema({
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

const Workout = mongoose.model("Workout", WorkoutSchema);


const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

console.log("URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch(err => {
        console.error(err);
    });

app.get("/workouts", async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.get("/workouts/:id", async (req, res) => {
    try {
        const id = req.params.id

        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({
                message: "Workout not Found"
            });
        }

        return res.json(workout);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
});

app.put("/workouts/:id", async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({
                message: "Workout not Found"
            });
        }

        res.json(updatedWorkout);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.post("/workouts", async (req, res) => {
    try {
        const workout = await Workout.create(req.body);

        res.status(201).json(workout);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
});

app.delete("/workouts/:id", async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        
        if (!deletedWorkout){
            return res.status(404).json({
                message: "Workout not Found"
            });
        }

        res.json({
            message: "Workout Deleted",
            workout: deletedWorkout
        });

    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running");
});