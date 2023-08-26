<template>
  <div class="container">
    <div class="row">
      <Header />
      <div class="col-12">
        <div class="hr"></div>
        <SelectTemplate @changeCurrentInput="changeCurrentInputByGivenTemplate" />
        <div class="hr"></div>
        <AddEntryForm :currentInput="currentInput" class="center-content" @getNewTransaction="handleNewTransactions"/>
        <div class="hr"></div>
        <ShowAllEntries
            v-if="allTransactions.length > 0"
            :allEntries="allTransactions"
        />
        <ExcelExporter :transactions="allTransactions" />
        <div class="hr"></div>
      </div>
    </div>
  </div>
 </template>

<script>

import AddEntryForm from "@/components/AddEntryForm.vue";
import ShowAllEntries from "@/components/ShowAllEntries.vue";
import Header from "@/components/Header.vue";
import SelectTemplate from "@/components/SelectTemplate.vue";
import ExcelExporter from "@/components/ExcelExporter.vue";
import {fetchTransactions, postTransaction} from "@/services/apiService";

export default {
  components: {
    AddEntryForm,
    ShowAllEntries,
    Header,
    SelectTemplate,
    ExcelExporter
  },
  data () {
    return {
      currentInput: {
        "date": new Date(),
        "description": "",
        "statementOfAccountId": 0,
        "isExpense": false,
        "location": "",
        "amount":  0,
        "account": "",
        "taxClass": "",
        "taxGroup": "",
        "taxRate": 0
      },
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
    },
    changeCurrentInputByGivenTemplate(newCurrentInput) {
      this.currentInput = newCurrentInput;
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