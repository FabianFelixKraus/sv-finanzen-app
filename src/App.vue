<script setup>
import AddEntryForm from "@/components/AddEntryForm.vue";
import ShowAllEntries from  "@/components/ShowAllEntries.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="container">
    <div class="row">
      <Header />
      <div class="col-12">
        <div class="hr"></div>
        <SelectTemplate />
        <div class="hr"></div>
        <AddEntryForm  :allTransactions="allTransactions" class="center-content"/>
        <div class="hr"></div>
        <ShowAllEntries class="center-content" :allEntries="allTransactions" @getAllNewTransactions="handleNewTransactions" />
      </div>
    </div>
  </div>
 </template>

<script>
export default {
  components: ["AddEntryForm","ShowAllEntries","SelectTemplate","Header"],
  data () {
    return {
      allTransactions: [{
        "date": "2023-04-16T12:34:56.789Z",
        "description": "Vorgang 1",
        "statementOfAccountId": 1,
        "isExpense": false,
        "location": "Gemeinschaftsraum",
        "amount":  32.33,
        "account": "Commerzbank",
        "taxClass": "Mehrwertsteuer (voll)",
        "taxGroup": "GRA",
        "taxRate": 19
      },
        {
          "date": "2023-04-10T12:34:56.789Z",
          "description": "Vorgang 2",
          "statementOfAccountId": 2,
          "isExpense": true,
          "location": "Waschbar",
          "amount": 0,
          "account": "Kasse, bar",
          "taxClass": "Umsatzsteuer",
          "taxGroup": "WBE",
          "taxRate": 19
        }]
    }
  },
  methods: {
    handleNewTransactions (newTransaction) {
      this.allTransactions = newTransaction;
    }
  },
}
</script>
<!--TODO-->
<!--Bei welchen Tags lohnt sich ein :title hinzuzufügen, sodass bei Hovern eine Erklärung erscheint?-->