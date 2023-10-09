<template>
  <div class="container">
    <div v-if="!isAuthorized" class="flex-row">
      <button @click="promptForPassword" class="password-button">Enter Password</button>
      <div v-if="showPasswordPrompt" class="password-prompt">
        <input v-model="password" type="password" placeholder="Enter Password" />
        <button @click="checkPassword">Submit</button>
      </div>
    </div>
    <div v-else>
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
import {fetchTransactions, postTransaction} from "./services/apiService";
import OpenDialog from "./components/OpenDialog.vue";
import {getSHA256Hash} from "boring-webcrypto-sha256";

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
      password: "",
      isAuthorized: false,
      showPasswordPrompt: false,
      correctPasswordHash: "dfa902deb03e9b91597fe13199a9057c63444416786db91de7dcb397b9002fd6",
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
    async checkPassword() {
      // Check if the entered password is correct
      // Hash the entered password using SHA-256
      const enteredPasswordHash = await getSHA256Hash(this.password);
      if (enteredPasswordHash === this.correctPasswordHash) {
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