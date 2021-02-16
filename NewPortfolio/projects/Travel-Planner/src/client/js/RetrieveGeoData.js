const GeoNamesUserName = "ak6833";
// const WeatherBitUserName = "ak6833";
const weatherBitAPIKey = "a60d232247c14df0add6fdaf174da6d8";
const PixabayAPIKey = "18720220-fa7a9ba1e359e07e508f9cd56";
function retrieveGeoData() {
  //Enable the 'Save Trip' button
  document.getElementById("saveTrip").disabled = false;

  // Get the dates and run the edits on them
  let badDates = false;
  const today = new Date().toJSON().slice(0, 10);

  const departDate = document.getElementById("depart").value;
  const returnDate = document.getElementById("return").value;
  badDates = editDates(today, departDate, returnDate);

  if (badDates) return;
  // if (badDates === true) {
  //   return;
  // }

  // Get the # of days between today and Depart Date to use in the weather API
  let date_diff = 0;
  date_diff = date_diff_indays(today, departDate);

  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  let weatherURL = "";

  //Build the URL to get the longitude and latitude of the destination from geonames
  const URL = `http://api.geonames.org/searchJSON?q=${city},${state}&country=${country}&maxRows=10&username=${GeoNamesUserName}`;

  fetch(URL)
    .then((res) => {
      return res.json();
    })
    .then(function (data) {
      const latitude = data.geonames[0].lat;
      const longitude = data.geonames[0].lng;
      let displayTemp = "";
      debugger;
      // Call the current or the forecasted weather API based on the departure date
      if (date_diff <= 7) {
        displayTemp = "current";
        weatherURL = `https://api.weatherbit.io/v2.0/current?&units=I&lat=${latitude}&lon=${longitude}&key=${weatherBitAPIKey}`;
      } else {
        displayTemp = "forecasted";
        weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&units=I&lat=${latitude}&lon=${longitude}&key=${weatherBitAPIKey}`;
      }

      // Parse the results and build the verbiage for the page
      fetch(weatherURL)
        .then((res) => {
          return res.json();
        })
        .then(function (data) {
          const temp = data.data[0].temp;
          const weatherDesc = data.data[0].weather.description;
          const windDir = data.data[0].wind_cdir_full;
          const windSpeed = data.data[0].wind_spd;
          const weatherText = `The ${displayTemp} temperature for ${city} is ${temp} with ${weatherDesc} and winds from the ${windDir} at ${windSpeed} mph.`;
          document.getElementById("weather").innerHTML = weatherText;
        });
      // Call the getPictures function to get the image to show
      getPictures(PixabayAPIKey, city, country);
    });

  // Next call the RESTCountries URL to get stats on the destination country
  const countriesURL = `https://restcountries.eu/rest/v2/alpha/${country}`;

  fetch(countriesURL)
    .then((res) => {
      return res.json();
    })
    .then(function (data) {
      // Build the verbiage about the country to display and then start the countdown to departure.
      buildPageFacts(data);
      countdown(departDate, returnDate);
    });
}
