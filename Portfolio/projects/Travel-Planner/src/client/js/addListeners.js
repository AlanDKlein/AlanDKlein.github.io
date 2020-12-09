window.addEventListener("DOMContentLoaded", function () {
  myListeners();
});
//Set the 'Save This Trip' button to disabled until they enter the input values
document.getElementById("saveTrip").disabled = true;
const myListeners = () => {
  // Add 4 event listeners for the 4 buttons
  document
    .getElementById("generate")
    .addEventListener("click", retrieveGeoData);
  document.getElementById("saveTrip").addEventListener("click", saveThisTrip);
  document.getElementById("getTrip").addEventListener("click", getSavedTrip);
  document.getElementById("delete").addEventListener("click", deleteTrip);
  document.getElementById("clear").addEventListener("click", clearTrip);

  // Retrieve the previously saved trips (if any) and display on the screen on startup.
  for (let i = 0; i < localStorage.length; i++) {
    //Get the key of each object
    const key = localStorage.key(i);

    //If the key is a previously stored countdown interval skip over it, else get the object and build it to the DOM.
    if (key != "interval") {
      const object = localStorage.getItem(key);

      //Parse the object to get the values
      const parsedResponse = JSON.parse(object);
      const departDate = parsedResponse.departDate;

      //Create the radio button & text
      buildSavedTrips(key, departDate);
    }
  }
};
