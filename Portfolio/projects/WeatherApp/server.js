// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
    console.log(`server is running on localhost:  ${port}`);
};

//GET Route -- This route is for the updateUI() client function to call to retrieve the data values we saved in the POST route
app.get('/all', (req, res) => {
    res.send(projectData);
});

//POST Route -- This route gets the data entered from the weather API call and the user input and stores it on the server to be retrieved later.  The updatePost() function in the client app.js calls this route.
app.post('/add', (req, res) => {
    projectData = {
        temp: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings,
        city: req.body.city
    };
    res.send(projectData);
})