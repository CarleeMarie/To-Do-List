// this is where the page/server will run from
// require express, fs, path (activity on how to set up express server js #13)
const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('/db/db.json');  
const storeNotes = require('/db/store_notes.js')
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');
const app = express();
const PORT = 3001;

// TODO: you will need to access the file system (fs), so you can write, retrieve, delete info from the db.json file

// Implements Express (middleware) for the parsing of JSON data.
app.use(express.json());

// Implements Express for the parsing of URL encoded data.
app.use(express.urlencoded());


// The middleware sets up the HTML routes that will be needed
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
// `GET /api/notes` request for notes - should read the `db.json` file and return all saved notes as JSON:
app.get('/api/notes', (req, res) => {
  res.status(200).json(noteData);
});
     

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
  

// POST request to add a to-do item
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Prepare a response object to send back to the client
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.product) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Note ${response.data.product} has been added!`);
  } else {
    res.json('Note body must at least contain one character.');
  }

  // Log the response body to the console
  console.log(req.body);
});

  

  //`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
);

// res.sendFile(path.join(__dirname, 'public/notes.html'))

app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Prepare a response object to send back to the client
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.product) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Review for ${response.data.product} has been added!`);
  } else {
    res.json('Request body must at least contain a product name');
  }

  // Log the response body to the console
  console.log(req.body);
});


fs.writeFile(`./db/${newNote.product}.json`, noteString, (err) =>
  err
    ? console.error(err)
    : console.log(
      `Note for ${newNote.product} has been written to JSON file`
  )
);
JSON.stringify(note)

// App (Express) is listening on port 3001
app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`)
);



