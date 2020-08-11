# Pokemon Shop

This ReactJS/Redux application is a shopping website where you can add pokemons to your cart and make an order (for
 free of
 course).
 
 It uses [Firebase](https://firebase.google.com/?hl=fr) to handle authentication.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) (use [nvm](https://github.com/nvm-sh/nvm))
- Create a [Firebase project](https://firebase.google.com/docs/web/setup?authuser=0) and get the necessary configuration.

This application uses environment variables for Firebase configuration

- REACT_APP_API_KEY
- REACT_APP_AUTH_DOMAIN
- REACT_APP_DATABASE_URL
- REACT_APP_PROJECT_ID
- REACT_APP_STORAGE_BUCKET
- REACT_APP_MESSAGING_SENDER_ID

> The REACT_APP prefix allows to have environment variables thanks to [create-react-app](https://github.com/facebook/create-react-app)

## Install

```bash
npm i
```

## Run

```bash
REACT_APP_API_KEY="<your_firebase_api_key>" \
REACT_APP_AUTH_DOMAIN="<your_firebase_auth_domain>" \
REACT_APP_DATABASE_URL="<your_firebase_database_url>" \
REACT_APP_PROJECT_ID="<your_firebase_project_id>" \
REACT_APP_STORAGE_BUCKET="<your_firebase_storage_bucket>" \
REACT_APP_MESSAGING_SENDER_ID="<your_firebase_messaging_sender_id>" \
npm start
```

It will automatically open your default web browser to the application home page.

## Authors

- Developed by [Olivier Schweitzer](https://www.oschweitzer.dev/)
- Using the [PokeAPI](https://pokeapi.co/) & [Create React App](https://github.com/facebook/create-react-app).
