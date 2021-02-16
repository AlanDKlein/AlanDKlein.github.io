# Weather-Journal App Project

## Overview
This project require the creation of an asynchronous web app that uses a Web API and user data to dynamically update the UI. The project first builds a full URL to the external Open Weather Map organization using an API key (provided by the org) and a user generated zip code.

The returned data is then parsed to extract the current temp (and in this case the city name).  This data is added to a system generated date and user generated input and sent to a server POST route to store the data in a JavaScript object.

The next step in the project is to retrieve the data from the server and update an area in the UI with that data.  This involved calling a GET route on the server to get the data and then inserting it in the UI data fields.

The last part of the project was basic styling of the UI and the data fields to make it look presentable.

