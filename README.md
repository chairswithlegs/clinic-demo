# Clinic Demo

This project is a web app for a fictional Healthcare Network and is built on Angular and ASP.NET Core 2.

You can checkout a live demo [here](https://closestclinicdemo.azurewebsites.net). *Note: if the site hasn't been viewed recently it may take a moment to wake the server.*


## Getting Started

Note: to setup this project you will (Node)[https://nodejs.org/en/], a Google Geocoding API key, and a Google Maps API key. It will also be helpful to have Visual Studio installed for managing the backend dependencies of the application and serving the API.

Clone this repository using the following command:

    git clone https://github.com/chairswithlegs/chat-clone.git


### Installation

Start by installing the dependencies for the frontend and backend parts of the application. Navigate to the *ClinicFrontend* directory and install the frontend dependencies by executing the following command:

    npm install

You will also need to configure the frontend with your Google Maps API key. This can be done by opening *ClinicFrontend/src/environments/environment.ts* and updating the following:

    googleApiKey: "<your Google Maps API key>"

You also need to install the backend dependencies - this step may vary based on your IDE. If you are using Visual Studio then open *ClinicBackend/ClinicBackend.sln* and download the required packages when prompted.

The last step is to configure the backend with your Google Geocoding API key - this can be done by modifying the following values in *ClinicBackend/ClinicBackend/appsettings.Development.json*.

    "GoogleApi": "<your Google Geocoding API key>"


## Starting The App

Fire up the backend API by starting the server in Visual Studio.

Next, serve the Angular app by entering the following command in the *ChatFrontend* directory:

    ng serve

Finally, navigate to port serving the Angular app (*localhost:4200* by default) to checkout it out.


## Running the tests

To test the application, navigate to the *ChatFrontend* directory and type:

    ng test //For unit tests
    ng e2e // For end-to-end testing


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
