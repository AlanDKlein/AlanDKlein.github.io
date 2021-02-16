# Udacity Capstone Project Overview

This is the final project in the Udacity Front-End Web Developer nanodegree program. The project is designed to bring together all of the skills we learned throughout the program. The objective was to create a Travel Planner application which incorporated various pieces of functionality which I have outlined below.

## Application Workflow

### Get Trip Details

At the initial launch of the application the "Save This Trip" button is disabled. After the user enters some input into the date and location fields and selects "Get Trip Details" the button becomes active. Additionally there are edits to ensure the date fields are input correctly (the depart date is prior to the retun date, the depart date is not in the past, etc.).

When the "Get Trip Details" is selected a series of API and function calls are made.

- The _date_diff-indays_ function is called to determine how far in the future the departure date is. This is used later in the Weatherbit API.
- The Geonames api is called with the City, State, Country and API Key to get the longitude and latitude of the destination city.
- The longitude and latititude are pulled from the response and put into the Weatherbit API call to get either current or forecasted weather data. The result from _date_diff_indays_ is used as a parameter for this API.
- The results from the Weatherbit API are parsed and used to create verbiage to display to the user.
- The Pixabay API is then called with _city, state, and country_ parameters to get a picture of the destination. FIrst the _city_ parameter is used, and if no picture of the city is found the API is called again with _country_ as a parameter.
- The next step in the flow is to call the REST Countries API with the _country_ parameter. The data returned by this API is passed to the _buildPageFacts_ function which then parses it and adds verbiage to display on the screen.
- Finally the _countdown_ function is called with _departure date_ and _return date_ parameters. This function first determines how long the trip is by calling the _date_diff_indays_ function, and then starts a countdown from today until the departure date. The results of this are put into readable verbiage to display on the screen.

### Save Trip, Retrieve Trip, Delete Trip

**Save Trip**

The "Save This Trip" button is disabled until the "Get Trip Details" is selected and a current trip is displayed on the screen. When selected the _saveThisTrip_ function in the **processTripData.js** file called and the relevent data points are retrieved from the DOM and put into in a Javascript object which is then saved to _LocalStorage_. The object is converted to a string with the _JSON.stringify_ method prior to saving to storage. This function then builds a radio button and text to display in the "My Saved Trips" section of the documnent.

**Retrieve Trip**

To view the details of a previously saved trip the user must first select the trip to view and then press the "Retrieve Trip" button. This will then call the _getSavedTrip_ function in the **processTripData.js** file. The function loops through the saved trips to find the one selected and then retrieves the data from _LocalStorage_. It then parses the data with _JSON.parse()_ and inserts the data into the appropriate fields on the DOM. Finally it calls the _countdown_ function to start a countdown for this trip.

**Delete Trip**

To delete a previously saved trip the user must first select the trip to delete and then press the "Delete This Trip" button. This will then call the _deleteTrip_ function in the **processTripData.js** file. The function loops through the saved trips to find the one selected and then deletes the data from _LocalStorage_ with the _removeItem(key)_ method. Next the function removes the radio button and verbiage from the DOM, and calls the _countdown_ function with 0's as parameters to stop the countdown and clear the DOM element.

## Web APIs used

- Geonames
- Weatherbit
- Pixabay
- REST Countries

## Local Storage/Retrieval

The project made use of the HTML5 localStorage functionality.
