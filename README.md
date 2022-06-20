# Run this project

The following are the scripts to run this project.

```json
{
  "start:prod": "NODE_ENV=production node server.js",
  "start:dev": "NODE_ENV=development nodemon index.js",
  "dev": "concurrently \"npm run start:dev\" \"npm run client:dev\"",
  "client:dev": "npm start --prefix client",
  "install:deps": "concurrently \"npm install\" \"npm install --prefix client\" ",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Run the client

```sh
npm run client:dev
```

## Run the server

```sh
npm run start:dev
```

## Run the whole project in one command

```sh
npm run dev
```
