const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const logger = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercise"];

const db = mongojs(databaseUrl, collections);
db.on("error", error => {
    console.log("Database Error:", error);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

//Routes
require("./public/routes/html-routes.js")(app);
app.use(require("./public/routes/api.js"));


// Listen on port 3000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
