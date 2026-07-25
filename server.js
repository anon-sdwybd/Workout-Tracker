const express = require("express");

const app = express();

let workouts = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/workouts", (req, res) => {
    res.json(workouts);
});

app.post("/workouts", (req, res) => {
    const workout = req.body;

    workouts.push(workout);

    res.json({
        message: "Workout added",
        workout: workout
    });
});

app.listen(3000, () => {
    console.log("Server running");
});