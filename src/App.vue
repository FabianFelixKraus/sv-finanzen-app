<script setup>
import AddEntryForm from "@/components/AddEntryForm.vue";
import ShowAllEntries from  "@/components/ShowAllEntries.vue";
import Header from "@/components/Header.vue";
import SelectTemplate from "@/components/SelectTemplate.vue"
</script>

<template>
  <div class="container">
    <div class="row">
      <Header />
      <div class="col-12">
        <div class="hr"></div>
        <SelectTemplate @changeCurrentInput="changeCurrentInputByGivenTemplate" />
        <div class="hr"></div>
        <AddEntryForm :allTransactions="allTransactions" :currentInput="currentInput" class="center-content"/>
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
      currentInput: {
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
    handleNewTransactions (newAllTransactions) {
      this.allTransactions = newAllTransactions;
    },
    changeCurrentInputByGivenTemplate(newCurrentInput) {
      console.log("newCurrentInput", newCurrentInput);
      this.currentInput = newCurrentInput;
    }
  },
}
</script>
<!--TODO-->
<!--Click auf Hinzufügen macht sprung des cursers in Kontoauszugsnummer feld-->
<!--Abspeichern einer Transaktion mittels strg + enter-->
<!--Shortcuts einbauen für templates-->
<!--Form Validation Einfügen-->
<!--Template Kaution-->