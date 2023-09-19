import axios from "axios";

// Determine the backend URL based on the environment
const BASE_URL_BACKEND =
    import.meta.env.PROD
        ? import.meta.env.VITE_APP_BACKEND_URL_PROD
        : import.meta.env.VITE_APP_BACKEND_URL_DEV;

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