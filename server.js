require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.error("Database connection error:", error));

app.use(express.json());

const frontendURL = "https://sv-finanzen-app.azurewebsites.net";

const corsOptions = {
    origin: frontendURL,
};

app.use(cors(corsOptions));

const transactionsRouter = require("./routes/transactions");
app.use("/transactions", transactionsRouter);

// Serve the static frontend files from the /frontend/dist directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started and listening on port: ${port}`));

// Catch-all route to serve the index.html file for all unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});



// require("dotenv").config()
//
// const express = require("express");
// const app = express()
// const mongoose = require("mongoose")
// const cors = require("cors");
// const {request} = require("express");
//
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
//     .then(() => console.log("Connected to Database"))
//     .catch((error) => console.error("Database connection error:", error))
//
// app.use(express.json())
//
// const transactionsRouter = require("./routes/transactions")
//
// const frontendURL =
//     process.env.NODE_ENV === "production"
//         ? process.env.FRONTEND_URL_PROD
//         : process.env.FRONTEND_URL_DEV;
//
// console.log(`Server running in "${process.env.NODE_ENV}" environment`);
//
// const corsOptions = {
//     origin: frontendURL
// };
//
// app.use(cors(corsOptions));
//
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", frontendURL);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//
// console.log(`Server corsOptions configured for frontendURL: ${frontendURL}`);
//
// app.use("/transactions", transactionsRouter)
//
// const port = process.env.PORT
// app.listen(port, () => console.log(`Server started and listening on port: ${port}`))