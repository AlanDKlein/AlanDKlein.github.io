// import './styles/style.scss'
// import './styles/mediaQuery.scss'
// import './media/pexels-porapak-apichodilok-346885.jpg'
// import { retrieveGeoData } from "./js/RetrieveGeoData";

// import { myListeners } from "./js/addListeners";

// const GeoNamesUserName = "ak6833";
// const WeatherBitUserName = "ak6833";
// const weatherBitAPIKey = "a60d232247c14df0add6fdaf174da6d8";
// const PixabayAPIKey = "18720220-fa7a9ba1e359e07e508f9cd56";

// window.addEventListener("DOMContentLoaded", function () {
//   myListeners();
// });

//Set the 'Save This Trip' button to disabled until they enter the input values
// document.getElementById("saveTrip").disabled = true;

// function myListeners() {
// let myListeners = () => {
//   // Add 4 event listeners for the 4 buttons
//   document
//     .getElementById("generate")
//     .addEventListener("click", retrieveGeoData);
//   document.getElementById("saveTrip").addEventListener("click", saveThisTrip);
//   document.getElementById("getTrip").addEventListener("click", getSavedTrip);
//   document.getElementById("delete").addEventListener("click", deleteTrip);
//   document.getElementById("clear").addEventListener("click", clearTrip);
//   console.log("all listeners added");

// Retrieve the previously saved trips (if any) and display on the screen on startup.
// for (var i = 0; i < localStorage.length; i++) {
//   //Get the key of each object
//   let key = localStorage.key(i);

//   //If the key is a previously stored countdown interval skip over it, else get the object and build it to the DOM.
//   if (key != "interval") {
//     let object = localStorage.getItem(key);

//     //Parse the object to get the values
//     let parsedResponse = JSON.parse(object);
//     let departDate = parsedResponse.departDate;

//     //Create the radio button & text
//     let radio = document.createElement("input");
//     radio.type = "radio";
//     radio.id = key;
//     radio.name = "newTrips";
//     var description = document.createTextNode(`${key} on ${departDate}`);
//     let ul = document.querySelector("ul");
//     let linebreak = document.createElement("br");

//     //Add the newly created elements to the page
//     ul.appendChild(radio);
//     ul.appendChild(description);
//     ul.appendChild(linebreak);
//   }
// }
// };

// function retrieveGeoData() {
//   //Enable the 'Save Trip' button
//   document.getElementById("saveTrip").disabled = false;

//   // Get the dates and run the edits on them
//   let badDates = false;
//   let today = new Date().toJSON().slice(0, 10);
//   let departDate = document.getElementById("depart").value;
//   let returnDate = document.getElementById("return").value;
//   badDates = editDates(today, departDate, returnDate);

//   if (badDates === true) {
//     return;
//   }
//   // Get the # of days between today and Depart Date to use in the weather API
//   let date_diff = 0;
//   date_diff = date_diff_indays(today, departDate);
//   console.log(date_diff);

//   let city = document.getElementById("city").value;
//   let country = document.getElementById("country").value;
//   let state = document.getElementById("state").value;
//   let weatherURL = "";

//   //Build the URL to get the longitude and latitude of the destination from geonames
//   let URL = `http://api.geonames.org/searchJSON?q=${city},${state}&country=${country}&maxRows=10&username=${GeoNamesUserName}`;

//   fetch(URL)
//     .then((res) => {
//       return res.json();
//     })
//     .then(function (data) {
//       let latitude = data.geonames[0].lat;
//       let longitude = data.geonames[0].lng;
//       let displayTemp = "";
//       console.log(latitude, longitude, displayTemp);

//       //date diff
//       if (date_diff <= 7) {
//         displayTemp = "current";
//         weatherURL = `https://api.weatherbit.io/v2.0/current?&units=I&lat=${latitude}&lon=${longitude}&key=${weatherBitAPIKey}`;
//       } else {
//         displayTemp = "forecasted";
//         weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&units=I&lat=${latitude}&lon=${longitude}&key=${weatherBitAPIKey}`;
//       }
//       // end date diff
//       getPictures(PixabayAPIKey, city, country);
//       //weatherbit api call
//       fetch(weatherURL)
//         .then((res) => {
//           return res.json();
//         })
//         .then(function (data) {
//           let temp = data.data[0].temp;
//           let weatherDesc = data.data[0].weather.description;
//           let windDir = data.data[0].wind_cdir_full;
//           let windSpeed = data.data[0].wind_spd;
//           let weatherText = `The ${displayTemp} temperature for your destination city of ${city} is ${temp} with ${weatherDesc} and winds from the ${windDir} at ${windSpeed} mph.`;
//           document.getElementById("weather").innerHTML = weatherText;
//         });
//       //end weatherbit api call

//       let countriesURL = `https://restcountries.eu/rest/v2/alpha/${country}`;

//       fetch(countriesURL)
//         .then((res) => {
//           return res.json();
//         })
//         .then(function (data) {
//           // Build the verbiage about the country to display and then start the countdown to departure.
//           buildPageFacts(data);
//           countdown(departDate, returnDate);
//         });
//     });
// }

//begin save trip api
// let saveThisTrip = () => {
//   //Get all the data to save from the DOM
//   let city = document.getElementById("city").value;
//   let country = document.getElementById("country").value;
//   let state = document.getElementById("state").value;
//   let departDate = document.getElementById("depart").value;
//   let returnDate = document.getElementById("return").value;
//   let weatherText = document.getElementById("weather").innerText;
//   let funFacts = document.getElementById("facts").innerText;
//   let picURL = document.getElementById("image").src;

//   //Build the object to save to Local Storage
//   let saveTrip = {
//     city: city,
//     state: state,
//     country: country,
//     weather: weatherText,
//     facts: funFacts,
//     pic: picURL,
//     departDate: departDate,
//     returnDate: returnDate,
//   };

//   //Save the object to storage with the city name as the key
//   localStorage.setItem(city, JSON.stringify(saveTrip));

//   // Build the radio button and text to display in 'My Saved Trips'
//   let textValues = `${city} on ${departDate}`;
//   let radio = document.createElement("input");
//   radio.type = "radio";
//   radio.id = city;
//   radio.name = "newTrips";

//   var description = document.createTextNode(textValues);
//   let ul = document.querySelector("ul");
//   let linebreak = document.createElement("br");

//   ul.appendChild(radio);
//   ul.appendChild(description);
//   ul.appendChild(linebreak);

//   // Clear all of the input fields
//   clearTrip();
//   // document.getElementById("depart").value = "";
//   // document.getElementById("return").value = "";
//   // document.getElementById("city").value = "";
//   // document.getElementById("state").value = "";
//   // document.getElementById("country").value = "";
// };
//end save trip api

//begin clear trip api
// Clear all of the input fields
// const clearTrip = function () {
//   document.getElementById("depart").value = "";
//   document.getElementById("return").value = "";
//   document.getElementById("city").value = "";
//   document.getElementById("state").value = "";
//   document.getElementById("country").value = "";
//   document.getElementById("facts").innerHTML = "";
//   document.getElementById("image").src =
//     "../media/pexels-porapak-apichodilok-346885.jpg";
//   document.getElementById("weather").innerHTML = "";
//   countdown(0, 0);
// };
//end clear trip api

//begin countdown api
//Function to create the countdown until the departure date and build the text to display.
// let countdown = (departDate, returnDate) => {
//   let tripTotalDays = date_diff_indays(departDate, returnDate);
//   // Get Interval from LS and if one exists kill it
//   var thisInterval = "";
//   thisInterval = JSON.parse(localStorage.getItem("interval"));
//   if (thisInterval != null) {
//     clearInterval(thisInterval);
//   }

//   // the setInterval function creates the countdown
//   let x = setInterval(function () {
//     thisInterval = x;
//     let dt2 = new Date(departDate);
//     let countDownDate = dt2.getTime();
//     let now = new Date().getTime();
//     let timeLeft = countDownDate - now;
//     let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     let hours = Math.floor(
//       (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     document.getElementById(
//       "countDown"
//     ).innerHTML = `Your ${tripTotalDays} day trip starts in: ${days}d, ${hours}h, ${minutes}m, and ${seconds}s!!!`;
//     localStorage.setItem("interval", JSON.stringify(thisInterval));
//     // If the count down is finished, clear the text

//     if (timeLeft < 0) {
//       clearInterval(x);
//       document.getElementById("countDown").innerHTML = "";
//     }
//   }, 1000);
// };

//end countdown api
//Get pictures api
// Function to retrieve the destination picture from Pixaby
// let getPictures = (key, city, country) => {
//   fetch(
//     `https://pixabay.com/api/?key=${key}&category=places&q=${city}&image_type=photo`
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then(function (data) {
//       // If no pictures found for the city, try the country
//       if (data.total === 0) {
//         fetch(
//           `https://pixabay.com/api/?key=${key}&category=places&q=${country}&image_type=photo`
//         )
//           .then((res) => {
//             return res.json();
//           })
//           .then(function (data) {
//             // If no pictures found for the city, display a message
//             if (data.total === 0) {
//               alert("No picutures were found for this destination");
//               let pageURL = "../media/pexels-porapak-apichodilok-346885.jpg";
//               document.getElementById("image").src = pageURL;
//             } else {
//               let pageURL = data.hits[0].webformatURL;
//               document.getElementById("image").src = pageURL;
//             }
//           });
//       } else {
//         let pageURL = data.hits[0].webformatURL;
//         document.getElementById("image").src = pageURL;
//       }
//     });
// };
//end get pictures api

//begin page facts api
// let buildPageFacts = (data) => {
//   let countryName = data.name;
//   let capital = data.capital;
//   let currency = data.currencies[0].name;
//   let symbol = data.currencies[0].symbol;
//   let language = data.languages[0].name;
//   let pop = data.population;
//   let stringPop = Number(pop).toLocaleString();
//   let funfacts = `The dominant language of ${countryName} is ${language}, and the currency is the ${symbol}${currency}.  The population of ${countryName} is ${stringPop} people and the capital is ${capital}.`;
//   document.getElementById("facts").innerHTML = funfacts;
// };
//end page facts api

// let editDates = (today, deptDate, retDate) => {
//   if (
//     deptDate === null ||
//     deptDate === "" ||
//     retDate === null ||
//     retDate === ""
//   ) {
//     alert("You must enter a depart AND return date");
//     return true;
//   }

//   if (retDate < deptDate) {
//     alert("The Return Date cannot be before the Departure Date.");
//     return true;
//   }

//   if (deptDate < today) {
//     alert("The Departure Date cannot be in the past");
//     return true;
//   }

//   let city = document.getElementById("city").value;
//   let country = document.getElementById("country").value;
//   if (city === null || city === "" || country === null || country === "") {
//     alert("City AND Country must contain a value");
//     return true;
//   }
// };

// //Function to calculate the number of days difference betweeen 2 dates.
// let date_diff_indays = (date1, date2) => {
//   let dt1 = new Date(date1);
//   let dt2 = new Date(date2);
//   return Math.floor(
//     (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
//       Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
//       (1000 * 60 * 60 * 24)
//   );
// };

//begin get saved trip api
// let getSavedTrip = () => {
//   //get the id of the radio button that was selected when they clicked the button and pass that to localStorage.

//   let lis = document.getElementById("saved").getElementsByTagName("input");

//   //Run edit to make sure they've selected a trip to retrieve
//   let oneChecked = false;
//   for (let i = 0; i <= lis.length - 1; i++) {
//     if (lis[i].checked) {
//       oneChecked = true;
//     }
//   }

//   // If they haven't selected a trip display an alert and return without processing anything.
//   if (oneChecked === false) {
//     alert("You must select a trip.");
//     return;
//   }
//   // Loop through the saved trips to get the one selected
//   for (let i = 0; i <= lis.length - 1; i++) {
//     if (lis[i].checked) {
//       let key = lis[i].id;
//       // Get the ID of the selected trip and retrieve it from storage
//       let object = localStorage.getItem(key);
//       //Parse the object to get the details
//       let parsedResponse = JSON.parse(object);
//       let city = parsedResponse.city;
//       let state = parsedResponse.state;
//       let country = parsedResponse.country;
//       let getPicURL = parsedResponse.pic;
//       let departDate = parsedResponse.departDate;
//       let getWeather = parsedResponse.weather;
//       let getFacts = parsedResponse.facts;
//       let returnDate = parsedResponse.returnDate;

//       //Display the data on the screen
//       document.getElementById("city").value = city;
//       document.getElementById("state").value = state;
//       document.getElementById("country").value = country;
//       document.getElementById("facts").innerHTML = getFacts;
//       document.getElementById("image").src = getPicURL;
//       document.getElementById("depart").value = departDate;
//       document.getElementById("return").value = returnDate;
//       document.getElementById("weather").innerHTML = getWeather;
//       // Pass depart and return date to use to calculate # of days in the trip and display that in the text along with the countdown data.

//       countdown(departDate, returnDate);
//     } else {
//       console.log("Not Checked");
//     }
//   }
// };

//Function to delte the trip from storage
// let deleteTrip = () => {
//   //Get all of the radio buttons and loop through to make sure one is checked
//   let lis = document.getElementById("saved").getElementsByTagName("input");
//   let oneChecked = false;
//   for (let i = 0; i <= lis.length - 1; i++) {
//     if (lis[i].checked) {
//       oneChecked = true;
//     }
//   }
//   if (oneChecked === false) {
//     alert("You must select a trip.");
//     return;
//   }

//   // Get the one that is checked to delete
//   for (let i = 0; i <= lis.length - 1; i++) {
//     if (lis[i].checked) {
//       //Get the key and then delete the record
//       let key = lis[i].id;
//       localStorage.removeItem(key);
//       //Remove the elements from the page
//       let ul = document.querySelector("ul");
//       lis[i].nextSibling.textContent = "";
//       ul.removeChild(lis[i]);
//       //Clear out the other verbiage
//       clearTrip();
//       // document.getElementById("facts").innerHTML = "";
//       // document.getElementById("image").src = "";
//       // document.getElementById("weather").innerHTML = "";
//       // call the countdown with zero dates to clear it
//       countdown(0, 0);
//     }
//   }
// };

//end get saved trip api
// export { myListeners };
// export { retrieveGeoData };
