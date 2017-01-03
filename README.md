# A push notifications service built with Node.js
A backend for push notifications written in JS for Node.js

## Requirements
List of requirements:

 * Node.js 6+
 * NPM 3+

## Installation
Just use NPM:

```bash
$ npm i
```

## Configuration
Edit the `config/default.json` file and update the following configurations:

 * host: edit with your local ip address (e.g.: 192.168.1.100)
 * senderID: edit with your Google Cloud Pub/Sub sender ID

## Run
Again, use NPM:

```bash
$ npm start
```

The web server is now listening on port 3001.
