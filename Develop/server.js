// Declaring dependencies
const express = require("express");
const path = require("path");

// Set up the express app so that it can be hosted on heroku
const app = express();
const PORT = 8080;
// const PORT = process.env.PORT || 8080;

// Setting up express app for posting data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup routes

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));