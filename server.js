require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authenticateToken = require("./authmiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Workout = require("./models/Workout");
const User = require("./models/User");
const saltRounds = 10;
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(express.static(path.join(__dirname, "public")));

console.log("URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");

        app.listen(3000, () => {
            console.log("Server running");
        });
    })
    .catch(err => {
        console.error(err);
    });

console.log(mongoose.connection.readyState);

app.get("/workouts", authenticateToken, async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.userId });

        res.json(workouts);

    } catch (err) {
        console.timeEnd("Workout.find");

        res.status(500).json({
            message: err.message
        });
    }
});

app.get("/workouts/:id", authenticateToken, async (req, res) => {
    try {
        const id = req.params.id

        const workout = await Workout.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

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

app.put("/workouts/:id", authenticateToken, async (req, res) => {
    try {
        const { exercise, weight, reps, sets, image } = req.body;

        const updatedWorkout = await Workout.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId,
            },
            {
                exercise,
                weight,
                reps,
                sets,
                image
            },
            {
                new: true,
                runValidators: true
            }
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

app.post("/workouts", authenticateToken, async (req, res) => {
    try {
        const workout = await Workout.create({
            ...req.body,
            userId: req.user.userId
        });

        console.time("Workout.create");

        res.status(201).json(workout);

    } catch (err) {
        console.timeEnd("Workout.create");
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
});

app.delete("/workouts/:id", async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

        if (!deletedWorkout) {
            return res.status(404).json({
                message: "Workout not Found"
            });
        }

        res.json({
            message: "Workout Deleted",
            workout: deletedWorkout
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = {
            username,
            email,
            password: hashedPassword
        };
        const newUser = await User.create(user);

        res.status(201).json({
            message: "User Successfully Registered.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email / Password"
            })
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid Email / Password"
            })
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_secret,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
});

app.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        res.json({
            username: user.username,
            displayname: user.displayname,
            email: user.email,
            bio: user.bio,
            pfp: user.pfp

        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.put("/profile", authenticateToken, async (req, res) => {
    try {
        const { username, displayname, pfp, bio } = req.body;

        const updatedProfile = await User.findByIdAndUpdate(
            req.user.userId,
            {
                username,
                displayname,
                pfp,
                bio
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedProfile) {
            return res.status(404).json({
                message: "Profile Not Found"
            })
        }

        res.json(updatedProfile);

    }catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
});