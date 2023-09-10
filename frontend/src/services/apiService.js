// apiService.js

import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Function to post a new transaction
export function postTransaction(newTransaction) {
    return axios.post(`${BASE_URL}/transactions`, newTransaction);
}

// Function to fetch all transactions
export function fetchTransactions() {
    return axios.get(`${BASE_URL}/transactions`);
}
