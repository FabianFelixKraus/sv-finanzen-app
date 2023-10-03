<template>
  <div class="container">
    <div v-if="!isAuthorized" class="flex-row">
      <button @click="promptForPassword" class="password-button">Enter Password</button>
      <div v-if="showPasswordPrompt" class="password-prompt">
        <input v-model="password" type="password" placeholder="Enter Password" />
        <button @click="checkPassword">Submit</button>
      </div>
    </div>
    <!-- Use v-if to conditionally display content -->
    <div v-else>
      <!-- Your existing content goes here -->
      <div class="bottom-right-circular-button">
        <OpenDialog @getNewTransaction="handleNewTransactions"/>
      </div>

      <div class="row">
        <Header />
        <div class="col-12">
          <ShowAllEntries
              v-if="allTransactions.length > 0"
              :allEntries="allTransactions"
          />
          <div v-else>
            {{$t("noTransactionsFound")}}
          </div>
          <ExcelExporter :transactions="allTransactions" />
          <div class="hr"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AddEntryForm from "./components/AddTransactionDialog.vue";
import ShowAllEntries from "./components/ShowAllEntries.vue";
import Header from "./components/Header.vue";
import SelectTemplate from "./components/SelectTemplate.vue";
import ExcelExporter from "./components/ExcelExporter.vue";
import { fetchTransactions, postTransaction } from "./services/apiService";
import OpenDialog from "./components/OpenDialog.vue";

export default {
  components: {
    OpenDialog,
    AddEntryForm,
    ShowAllEntries,
    Header,
    SelectTemplate,
    ExcelExporter,
  },
  data() {
    return {
      allTransactions: [],
      password: "", // Store the entered password
      isAuthorized: false, // Flag to track if the correct password is entered
      showPasswordPrompt: false, // Flag to show/hide the password prompt
      isLoggedIn: false,
      correctPassword: "87Irl6CDgGvGck3yU3mEyJnFYO2ojbFDVEjhZ8RG", // Replace with your actual password
    };
  },
  methods: {
    handleNewTransactions(newTransaction) {
      // Check if the correct password is entered
      if (this.isAuthorized) {
        return postTransaction(newTransaction)
            .then((response) => {
              console.log(response);
              // Fetch transactions again after a new transaction is added
              this.fetchTransactions();
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    fetchTransactions() {
      // Check if the correct password is entered
      if (this.isAuthorized) {
        return fetchTransactions()
            .then((response) => {
              this.allTransactions = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    promptForPassword() {
      this.showPasswordPrompt = true;
    },
    checkPassword() {
      // Check if the entered password is correct
      if (this.password === this.correctPassword) {
        this.isAuthorized = true;
        this.showPasswordPrompt = false; // Hide the password prompt
        // Fetch transactions after the password is entered correctly
        this.fetchTransactions();
      } else {
        alert("Incorrect password. Please try again.");
        this.password = ""; // Clear the input field
      }
    },
  },
  created() {
    // Fetch transactions only if the correct password is entered
    console.log(`Frontend is sending Requests to backendURL: ${
      import.meta.env.MODE === 'production'
        ? import.meta.env.VUE_APP_BACKEND_URL_PROD
        : import.meta.env.VUE_APP_BACKEND_URL_DEV}`
    );
    if (this.isAuthorized) {
      this.fetchTransactions();
    }
  },
};
</script>

<style>
.bottom-right-circular-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 90%;
  background-color: #007bff;
  color: white;
  font-size: 30px;
}

.password-button {
  margin: 10px;
  padding: 5px 10px;
  font-size: 16px;
}

.password-prompt {
  margin: 20px;
}
</style>


<!--{-->
<!--message: '',-->
<!--date: new Date(),-->
<!--description: 'A',-->
<!--statementOfAccountId: 1,-->
<!--isExpense: false,-->
<!--location: 'Waschbar',-->
<!--amount: 1000,-->
<!--account: 'Commerzbank', //Commerzbank-->
<!--taxClass: 'Umsatzsteuer', //Umsatzsteuer,-->
<!--taxGroup: 'WBE', //WBE, ...-->
<!--taxRate: 19,-->
<!--loading: false,-->
<!--},-->
<!--{-->
<!--message: '',-->
<!--date: new Date(),-->
<!--description: 'Test',-->
<!--statementOfAccountId: 2,-->
<!--isExpense: false,-->
<!--location: 'Waschbar',-->
<!--amount: 40.0,-->
<!--account: 'Commerzbank', //Commerzbank-->
<!--taxClass: 'Umsatzsteuer', //Umsatzsteuer,-->
<!--taxGroup: 'WBE', //WBE, ...-->
<!--taxRate: 19,-->
<!--loading: false,-->
<!--},-->
<!--{-->
<!--message: '',-->
<!--date: new Date(),-->
<!--description: 'Test 1',-->
<!--statementOfAccountId: 3,-->
<!--isExpense: false,-->
<!--location: 'Gemeinschaftsraum',-->
<!--amount: 60.00,-->
<!--account: 'Commerzbank', //Commerzbank-->
<!--taxClass: 'Umsatzsteuer', //Umsatzsteuer,-->
<!--taxGroup: 'GRE', //WBE, ...-->
<!--taxRate: 19,-->
<!--loading: false,-->
<!--},-->
<!--{-->
<!--message: '',-->
<!--date: new Date(),-->
<!--description: 'Test 2',-->
<!--statementOfAccountId: 3,-->
<!--isExpense: true,-->
<!--location: 'Waschbar',-->
<!--amount: 100.00,-->
<!--account: 'Commerzbank', //Commerzbank-->
<!--taxClass: 'MwSt. voll', //Umsatzsteuer,-->
<!--taxGroup: 'WBA', //WBE, ...-->
<!--taxRate: 19,-->
<!--loading: false,-->
<!--}-->