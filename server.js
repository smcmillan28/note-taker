// Declaring dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

// Set up the express app so that it can be hosted on heroku
const app = express();
const PORT = 8080;
// const PORT = process.env.PORT || 8080;

// Setting up express app for posting data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/Develop/public")));

let rawdata = fs.readFileSync("./Develop/db/db.json");
let notes = JSON.parse(rawdata);
console.log(notes);

console.log(uniqid());

// Setup routes
// Three GET requests for the index/notes/api routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/Develop/public/notes.html")));

app.get("/api/notes", (req, res) => res.json(notes));

// Post request that takes in a new note and saves it to notes array as JSON object
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    fs.appendFile("./Develop/db/db.json", "," + JSON.stringify(newNote), function(err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("New note logged!");
        }
      });
    res.json(newNote);
});

// Delete request that removes note from array when button clicked on notes page
app.delete("/api/notes/:id", (req, res) => {
    const noteIndex = notes.findIndex(({ id }) => id === req.params.id);
    if (noteIndex >= 0) {
        notes.splice(noteIndex, 1);
    }
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));