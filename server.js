require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.error("Database connection error:", error));

app.use(express.json());


const transactionsRouter = require("./routes/transactions2");
app.use("/transactions", transactionsRouter);

// Serve the static frontend files from the /frontend/dist directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started and listening on port: ${port}`));

// Catch-all route to serve the index.html file for all unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
