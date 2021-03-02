// Declaring dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

// Set up the express app so that it can be hosted on heroku
const app = express();
const PORT = 8080;
// const PORT = process.env.PORT || 8080;

// Setting up express app for posting data and pulling in css/js files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/Develop/public")));

// Pulling data from db.json file so we can use fs library to amend database
const file_name = "./Develop/db/db.json";
let rawdata = fs.readFileSync(file_name);
let notes = JSON.parse(rawdata);
console.log(notes);

// Setup routes
// GET requests for the index/notes/api routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/index.html")));

app.get("/api/notes", (req, res) => res.json(notes));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/notes.html")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/index.html")));

// Post request that takes in a new note and saves it to notes array as JSON object
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();
    notes.push(newNote);
    fs.writeFileSync(file_name, JSON.stringify(notes));
    res.json(newNote); 
});

// Delete request that removes note from array when button clicked on notes page
app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const noteIndex = notes.findIndex(p => p.id == id);
    notes.splice(noteIndex, 1);
    fs.writeFileSync(file_name, JSON.stringify(notes));
    return res.send();
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));