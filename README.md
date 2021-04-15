# The Resident Zombie
This is the backend application for the Codeminer 42 selection process.

## Setup
### Requirements
Make sure that you have [Node.js](https://nodejs.org/en/) 14.16 installed in your machine.

### First time setup
Build and install dependencies using:
```
npm install
```

### Running
To run in development mode:
```
npm run compile:dev
npm run start:dev
```
Application will start on port 5000.

To run the tests:
```
npm run test
```

### Notes
The database used in this version is an *in memory database*. So the data will be erased after shutdown or reload of the application.
