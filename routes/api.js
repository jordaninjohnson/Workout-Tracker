const router = require("express").Router();
const Exercise = require("../models/exerciseSchema.js");

router.post("/api/workouts", ({ body }, res) => {
    Exercise.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    const id = params.id;
        Exercise.findOneAndUpdate({_id : id}, { $push: { exercises: body } }, { new: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    // console.log("api Route workouts running");
    Exercise.find({})
        // .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    // console.log("hit /api/workouts/range");
    Exercise.find({})
        // .sort({ date: -1 })
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
