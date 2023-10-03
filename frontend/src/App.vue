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
        <StartBalance :startBalance="startBalances[0]" @update:startBalance="onStartBalanceUpdate" />
        <div class="col-12">
          <ShowAllEntries
              v-if="allTransactions.length > 0"
              :allEntries="allTransactions"
              :startBalances="startBalances"
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
import StartBalance from "@/components/StartBalance.vue";

export default {
  components: {
    OpenDialog,
    AddEntryForm,
    ShowAllEntries,
    Header,
    SelectTemplate,
    ExcelExporter,
    StartBalance
  },
  data() {
    return {
      allTransactions: [],
      startBalances: [27927.64],
      calculationsDone: false,
      password: "", // Store the entered password
      isAuthorized: false, // Flag to track if the correct password is entered
      showPasswordPrompt: false, // Flag to show/hide the password prompt
      isLoggedIn: false,
      correctPassword: "87Irl6CDgGvGck3yU3mEyJnFYO2ojbFDVEjhZ8RG", // Replace with your actual password
    };
  },
  computed: {
    shouldFetchTransactions() {
      // Check if the user is authorized and calculations are done
      return this.isAuthorized && this.calculationsDone;
    },
  }
  ,
  watch: {
    shouldFetchTransactions(newValue) {
      if (newValue) {
        // Fetch transactions when authorized and calculations are done
        this.fetchTransactions();
      }
    },
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
    async calculateBalancesAsync() {
      console.log("ja")
      await this.calculateBalances(); // Wait for calculations to complete
      console.log("calculationsDone")
      this.calculationsDone = true;
    },
    async calculateBalances() {
      return new Promise((resolve) => {
        for (const [index, entries] of this.createStatementOfAccountIdArrays.entries()) {
          const difference = this.calculateDifference(entries);
          const newBalance = this.startBalances[index] + difference;
          this.startBalances.push(newBalance);
        }
        resolve(); // Resolve the promise when calculations are done
      });
    },
    calculateDifference(transactions) {
      return transactions.reduce((acc, ele) => acc + ele.amount * (ele.isExpense ? -1 : 1), 0);
    },
    onStartBalanceUpdate(value) {
      this.startBalances[0] = value;
    }
  }
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