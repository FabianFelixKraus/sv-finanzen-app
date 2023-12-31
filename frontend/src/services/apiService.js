import axios from "axios";

// Determine the backend URL based on the environment
const BASE_URL_BACKEND = process.env.NODE_ENV === "production"
    ? "https://sv-finanzen-app.azurewebsites.net"
    : "http://localhost";

// Function to post a new transaction
export function postTransaction(newTransaction) {
    return axios.post(`${BASE_URL_BACKEND}/transactions`, newTransaction);
}

// Function to fetch all transactions
export function fetchTransactions() {
    return axios.get(`${BASE_URL_BACKEND}/transactions`);
}

// Function to delete a transaction by ID
export function deleteTransactionById(id) {
    return axios.delete(`${BASE_URL_BACKEND}/transactions/${id}`);
}

// Function to update a transaction by ID
export function updateTransactionById(id, updatedTransaction) {
    return axios.put(`${BASE_URL_BACKEND}/transactions/${id}`, updatedTransaction);
}