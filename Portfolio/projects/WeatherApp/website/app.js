/* Global Variables */
const weatherMapURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const weatherMapKey = "&appid=604bcb6a43f0ca651dd81bcfed73654f";
const units = "&units=imperial";
const weatherData = {};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Check to make sure the user entered the zip and something in the feelings text area.  Then grab the zip code and feelings input and build the 'full' URL for the external API call to getWeatherData to get the temperature.

function getWeather() {
  let myZip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  const fullURL = `${weatherMapURL}${myZip}${units}${weatherMapKey}`;
  if (
    myZip === "null" ||
    myZip === "" ||
    feelings === "null" ||
    feelings === ""
  ) {
    alert("Please add both zip code and how you are feeling today.");
  } else {
    getWeatherData(fullURL).then((data) => {
      (weatherData.temperature = data.main.temp),
        (weatherData.date = newDate),
        (weatherData.feelings = feelings),
        (weatherData.city = data.name);
      updateUI();
    });
  }
}

// Add an event listener to the generate button to listen for a click event.
document.getElementById("generate").addEventListener("click", getWeather);

// Call the external API with the full URL built previously.  The returned data is then used to build the object to send to the postData() function.  ALL OF THE SERVER SIDE CODE HAS BEEN DELETED HERE SO THIS RUNS WITHOUT HAVING TO START A SERVER.  TO SEE ALL OF THE SERVER CODE AND THE GET/POST CODE LOOK IN THE UDACITY OR GITHUB FOLDERS.
const getWeatherData = async (fullURL) => {
  const response = await fetch(fullURL);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error = ", error);
  }
};

const updateUI = function () {
  document.getElementById(
    "date"
  ).innerHTML = `Today's date is ${weatherData.date}.`;
  document.getElementById(
    "temp"
  ).innerHTML = `The current temperature in ${weatherData.city} is ${weatherData.temperature} fahrenheit.`;
  document.getElementById(
    "content"
  ).innerHTML = `You are feeling ${weatherData.feelings} today.`;
};
