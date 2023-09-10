<template>
  <div class="container">

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
 </template>

<script>

import AddEntryForm from "./components/AddTransactionDialog.vue";
import ShowAllEntries from "./components/ShowAllEntries.vue";
import Header from "./components/Header.vue";
import SelectTemplate from "./components/SelectTemplate.vue";
import ExcelExporter from "./components/ExcelExporter.vue";
import {fetchTransactions, postTransaction} from "./services/apiService";
import OpenDialog from "./components/OpenDialog.vue";

export default {
  components: {
    OpenDialog,
    AddEntryForm,
    ShowAllEntries,
    Header,
    SelectTemplate,
    ExcelExporter
  },
  data () {
    return {
      allTransactions: [],
    }
  },
  methods: {
    handleNewTransactions(newTransaction) {
      return postTransaction(newTransaction)
          .then((response) => {
            console.log(response);
            this.fetchTransactions();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    fetchTransactions() {
      return fetchTransactions()
          .then((response) => {
            this.allTransactions = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  created() {
    return fetchTransactions()
        .then((response) => {
          this.allTransactions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
}
</script>

<style>
  .bottom-right-circular-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 90%;
    background-color: #007bff; /* Change this to your desired background color */
    color: white;
    font-size: 30px;
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