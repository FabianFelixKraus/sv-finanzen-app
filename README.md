# 📖sv-finanzen-app 

## 📋 Project Description
This project is a simple fullstack web application to easily manage new transactions into the Kassenbuch. 
This project is structured as a monorepo with two parts: *frontend* and *backend*.

### 👉Frontend
The frontend is based on [Vue 3](https://v3.vuejs.org/) and [Vite](https://vitejs.dev/).
It is located in the `frontend` folder.
There are two configurations for the frontend: `dev`, `prod` and `preview`.
The frontend supports 🇺🇸English & 🇩🇪German language.

### 👈Backend
The backend uses [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) to create a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer).
The server runs on `port 80`.

### 📊Database
The data is stored in a [MongoDB](https://www.mongodb.com/) database.

## 🛠️ Setup
### 🔧 Prerequisites
Add a `.env` file in the root directory with the following content, to connect to your database:
```bash
MONGO_URI=<your-mongodb-uri>
```
You need to have all mentioned tools installed on your machine.

### 📦 Install dependencies
```bash
npm install
cd frontend
npm install
```

### 🚀Start the application
#### Production
```bash
npm start
```
#### Development
```bash
npm run startDev
```

## 🌐Deployment
The Application is deployed on Microsoft Azure. The deployment is done automatically when pushing to the main branch utilizing GitHub Actions.

## 🙌Contributing
Feel free to contribute to this project. Just fork the repository and create a pull request.

## 📝License

### MIT License
Copyright (c) [2023] [Fabian Kraus]


