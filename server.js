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
app.use(express.static(path.join(__dirname, "/Develop/public")));

const notes = [];

// Setup routes
// Three GET methods for the index/notes/api routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/notes.html")));

app.get("/api/notes", (req, res) => res.json(notes));

// Post route that takes in a new note and saves it to notes array as JSON object
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));