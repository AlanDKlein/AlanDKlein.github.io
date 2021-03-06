// const dotenv = require('dotenv')
// dotenv.config();

// //var path = require('path')

// // Require Express to run server and routes
// const express = require('express');

// // Start up an instance of app
// const app = express();

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// const cors = require('cors');
// app.use(cors());

// // Initialize the main project folder
// app.use(express.static('dist'));

// // Setup Server
// const port = 8000;

// // The following is to allow the server test to work
// module.exports = app

// const server = app.listen(port, listening);
// function listening() {
//     console.log(`server is running on localhost:  ${port}`);
// }

// //GET Route -- This route is for the 3 different API Keys we need for the external Web API calls.  This is called in addListeners.js
// let apiKeys = {}
// let geoname = process.env.GeoNamesUserName
// let WBKey = process.env.weatherBitAPIKey
// let PixKey = process.env.PixabayAPIKey

// app.get('/keys', (req, res) => {
//     apiKeys.geoname = geoname
//     apiKeys.WBKey = WBKey
//     apiKeys.PixKey = PixKey
//     res.send(apiKeys);
// });
