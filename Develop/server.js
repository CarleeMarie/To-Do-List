// this is where the page/server will run from
// require express, fs, path (activity on how to set up express server js #13)
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// TODO: you will need to access the file system (fs), so you can write, retrieve, delete info from the db.json file

// need middleware, routes (could use a route folder to separate)



app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// API ROUTES
app.get('/api/notes', (req, res) =>
  res.json());    //* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.


app.post('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/paths.html'))
  //`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

//The following HTML routes should be created:

// * `GET /notes` should return the `notes.html` file.

// * `GET *` should return the `index.html` file.





