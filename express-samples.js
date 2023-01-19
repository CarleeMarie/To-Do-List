const { appendFile } = require("fs");
const { get } = require("http");

// Express.js is a framework for Node.js to write APIs, handle HTTP requests and implement middleware in your server-side application.

// GET, POST, DELETE, PUT create ROUTES for data to be used to send data from front end to server

// You can use the same route for different types of calls (app.post('/api/reviews), app.get('/api/reviews)), but CANNOT HAVE 2 OF THE SAME TYPE OF CALL ON THE SAME ROUTE.

// you must use (req, res) together, even if there is no specific request, to get a response. The req is what we pass from our side and the res is what the user gets back.

// Express automatically creates the response object, but you have to request it in order to use it - hence it is always req first, res second.

// the PATH is the part of the route that comes after the base URL
// POST routes also accept the path as the 1st argument

// the 2nd argument after the app.method, (req, res) => {} is a CALLBACK.

//GET route for static homepage
app.get('/', (req, res) =>  // <- the / indicates the main route/root
    res.sendFile('index.html'));  // <- serves a the static homepage to the website/user

//GET route for all reviews
app.get('/api/reviews', (req, res) =>  // <- gets data from the reviews page
    res.json(reviewData));  // <- serves the reviewData page

// POST route for static homepage 
app.get('/', (req, res) =>
    res.sendFile('index.html'));
    
// GET route for all reviews
app.get('/api/reviews', (req, res) =>
    res.json(reviewData));

// POST route to add a single review - POST IS WHAT WE RECEIVE FROM THE EXPRESS.JS SERVER WHEN WE MAKE A REQUEST (see next fetch code block)
app.post('/api/reviews', (req, res) => {
    const newReview = req.body
    writeToFile(destination, newReview)

res.json(`${req.method} received`);   // the ${req.method} in this case it the post method from the first line of this block of code.
});

// You can create fetch() request that the server-side routes understand and respond to.
// POST requests will send a request body that we capture on the server-side.

// Fetch request to add a new pet - FETCH SENDS THE REQUEST TO THE EXPRESS.JS SERVER  - specifically sending to the /api/pets location
const addPet = (pet) => {
    fetch('/api/pets', {
        method: 'POST',  // the default method of fetch is GET, so you only need to put this in when the method is something other than GET
        headers: { 'Content-Type ': 'application/json' },
        body: JSON.stringify(pet),
    })
        .then((res) => res.json())
        .then((pets) => console.log(pets));
};  

// requests must be concluded to prevent the client application from hanging indefinitely.
// each request can only have one response
app.put('/api/pets/:pet_id', (req, res) => {
    // Logic to update a pet
    res.json('Pet updated'); // can only have this one logic - if you put more, it will only complete the first and ignore the rest
    // Could also just have it respond like this:
    // res.send('200');
});

// To RUN this:
// open Main folder and run install npm "npm i"
// open package.json file and "npm run"
// open ReadMe and "npm run start"
// to see in the browser, go to localhost:3001
// all of the posted information will persist because IT IS STORED ON THE SERVER