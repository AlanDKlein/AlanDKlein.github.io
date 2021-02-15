// This file has the functions to Save/Retrieve/Delete Trips

const saveThisTrip = () => {
  //Get all the data to save from the DOM
  const city = document.getElementById("city").value;
  const departDate = document.getElementById("depart").value;

  const saveTrip = {
    city: city,
    state: document.getElementById("state").value,
    country: document.getElementById("country").value,
    weather: document.getElementById("weather").innerText,
    facts: document.getElementById("facts").innerText,
    pic: document.getElementById("image").src,
    departDate: departDate,
    returnDate: document.getElementById("return").value,
  };

  //Save the object to storage with the city name as the key
  localStorage.setItem(city, JSON.stringify(saveTrip));

  // Build the radio button and text to display in 'My Saved Trips'
  buildSavedTrips(city, departDate);

  // Clear all of the input fields
  clearTrip();
};

const buildSavedTrips = function (key, deptDate) {
  // const textValues = `${key} on ${deptDate}`;
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.id = key;
  radio.name = "newTrips";
  const ul = document.querySelector("ul");
  ul.appendChild(radio);
  ul.appendChild(document.createTextNode(`${key} on ${deptDate}`));
  ul.appendChild(document.createElement("br"));
};

const clearTrip = function () {
  document.getElementById("depart").value = "";
  document.getElementById("return").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
  document.getElementById("country").value = "";
  document.getElementById("facts").innerHTML = "";
  document.getElementById("image").src =
    "../media/pexels-porapak-apichodilok-346885.jpg";
  document.getElementById("weather").innerHTML = "";
  countdown(0, 0);
};
const getSavedTrip = () => {
  //get the id of the radio button that was selected when they clicked the button and pass that to localStorage.
  const lis = document.getElementById("saved").getElementsByTagName("input");
  //Run edit to make sure they've selected a trip to retrieve
  let oneChecked = false;
  // Loop through the saved trips to get the one selected
  for (let i = 0; i <= lis.length - 1; i++) {
    if (lis[i].checked) {
      const key = lis[i].id;
      // Get the ID of the selected trip and retrieve it from storage
      const object = localStorage.getItem(key);
      //Destructure the object to get the details
      const {
        city,
        state,
        country,
        facts,
        pic,
        departDate,
        returnDate,
        weather,
      } = JSON.parse(object);

      //Display the data on the screen
      document.getElementById("city").value = city;
      document.getElementById("state").value = state;
      document.getElementById("country").value = country;
      document.getElementById("facts").innerHTML = facts;
      document.getElementById("image").src = pic;
      document.getElementById("depart").value = departDate;
      document.getElementById("return").value = returnDate;
      document.getElementById("weather").innerHTML = weather;
      // Pass depart and return date to use to calculate # of days in the trip and display that in the text along with the countdown data.
      countdown(departDate, returnDate);
      oneChecked = true;
      lis[i].checked = false;
      break;
    } else {
      console.log("Not Checked");
    }
  }
  // If they haven't selected a trip display an alert and return without processing anything.
  if (oneChecked === false) {
    alert("You must select a trip.");
    return;
  }
};

// //Function to delte the trip from storage
const deleteTrip = () => {
  //Get all of the radio buttons and loop through to make sure one is checked
  const lis = document.getElementById("saved").getElementsByTagName("input");
  let oneChecked = false;
  for (let i = 0; i <= lis.length - 1; i++) {
    if (lis[i].checked) {
      if (confirm("Are you sure you want to delete this trip?")) {
        const key = lis[i].id;
        localStorage.removeItem(key);
        //Remove the elements from the page
        const ul = document.querySelector("ul");
        lis[i].nextSibling.textContent = "";
        ul.removeChild(lis[i]);
        //Clear out the other verbiage
        clearTrip();
        // countdown(0, 0);
        oneChecked = true;
        break;
      }
      oneChecked = true;
      lis[i].checked = false;
    }
  }
  if (!oneChecked) {
    alert("You must select a trip.");
    return;
  }
};
