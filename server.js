// this is where the page/server will run from
// require express, fs, path (activity on how to set up express server js #13)
const express = require('express');
const fs = require('fs');
const path = require('path'); 

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

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

// `GET /notes` returns the information in the db.json file.  
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));  
});

// `GET *` returns the `notes.html` file. Serves the "home page".
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));  
});

// `GET *` returns the `index.html` file. Serves the "home page".
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));  
});

// API ROUTES
// `GET /api/notes` request for notes - should read the `db.json` file and return all saved notes as JSON:

app.get('/api/notes', (req, res) => {
  const noteData = require('/db/db.json');
  res.status(200).json(noteData);
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

//   // Log the response body to the console
//   console.log(req.body);
// });


readAndAppend(newNote, '/.db/db.json')
  

//   //`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// );

// // res.sendFile(path.join(__dirname, 'public/notes.html'))

// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Prepare a response object to send back to the client
//   let response;

//   // Check if there is anything in the response body
//   if (req.body && req.body.product) {
//     response = {
//       status: 'success',
//       data: req.body,
//     };
//     res.json(`Review for ${response.data.product} has been added!`);
//   } else {
//     res.json('Request body must at least contain a product name');
//   }

//   // Log the response body to the console
//   console.log(req.body);
// });

// // Write the string to a file
// // First - read the existing file, encode it with utf8
// fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
//   if(err){
//     console.error(err);
//   } else {
//   const notes = JSON.parse(data);
//     //pushing the new note to the notes array
//   notes.push(newNote);

//   fs.writeFile(`./db/db.json`, noteString, (err) =>
//     err
//       ? console.error(err)
//       : console.log(
//         `Note for ${newNote.product} has been written to JSON file`
//     )
// );
// })

// JSON.stringify(note)

// App (Express) is listening on port 3001
app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`)
);

// // TODO - below is sample code block for posting and saving entered data
// // POST request to add a review
// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Destructuring assignment for the items in req.body
//   const { product, review, username } = req.body;

//   // If all the required properties are present
//   if (product && review && username) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//       note_id: uuid(),
//     };

//     // Convert the data to a string so we can save it
//     const reviewString = JSON.stringify(newReview);

//     // Write the string to a file
//     fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
//       err
//         ? console.error(err)
//         : console.log(
//             `Review for ${newReview.product} has been written to JSON file`
//           )
//     );

//     const response = {
//       status: 'success',
//       body: newReview,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });

