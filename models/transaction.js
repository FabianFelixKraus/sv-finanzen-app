const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    "date": {
        type: Date,
        required: true,
    },
    "description": {
        type: String,
        required: true,
    },
    "statementOfAccountId": {
        type: Number,
        required: true,
    },
    "isExpense": {
        type: Boolean,
        required: true,
    },
    "location": {
        type: String,
        required: true,
    },
    "amount": {
        type: Number,
        required: true,
    },
    "account": {
        type: String,
        required: true,
    },
    "taxClass": {
        type: String,
        required: true,
    },
    "taxGroup": {
        type: String,
        required: true,
    },
    "taxRate": {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("Transaction", transactionSchema)