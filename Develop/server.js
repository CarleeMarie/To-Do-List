// this is where the page/server will run from
// require express, fs, path (activity on how to set up express server js #13)
const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('/db/db.json');  

const app = express();
const PORT = 3001;

// TODO: you will need to access the file system (fs), so you can write, retrieve, delete info from the db.json file

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// this is the middleware and sets up the HTML routes that will be needed
app.use(express.static('public'));
app.get('/api/notes', (req, res) =>
     res.sendFile(path.join(__dirname, '/public/')));

// HTML ROUTES

// `GET /notes` returns the `notes.html` file.  Serves the notes page.
// app.get('/api/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, 'notes.html'));  // TODO: does this need public in front of it?? Do I even need this - see line 15?
// });

// `GET *` returns the `index.html` file. Serves the "home page".
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));  // TODO: does this need public in front of it??
// });

// Serve the CSS file:
// app.get('/css', (req, res) => 
//   res.sendFile(path.join(__dirname, '/public/assets/css/styles.css'))
//   );


// API ROUTES
// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON:
app.get('/api/notes', (req, res) =>
  res.json(noteData));    

  // GET route that returns any specific note
app.get('/api/notes/:title', (req, res) => {
    // Coerce the specific search term to lowercase
    const requestedTitle = req.params.title.toLowerCase();
  
    // Iterate through the note titles to check if it matches `req.params.title`
    for (let i = 0; i < noteData.length; i++) {
      if (requestedTitle === noteData[i].title.toLowerCase()) {
        return res.json(noteData[i]);
      }
    }
  
    // Return a message if the term doesn't exist in our DB
    return res.json('No match found');
  });
  


app.post('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  //`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
);

// activating the middleware
app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`)
);



