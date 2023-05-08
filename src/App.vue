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
        <ShowAllEntries class="center-content" :allEntries="allTransactions" @getNewTransaction="handleNewTransactions" />
      </div>
    </div>
  </div>
 </template>

<script>
import axios from "axios";
import AddEntryForm from "@/components/AddEntryForm.vue";
import ShowAllEntries from "@/components/ShowAllEntries.vue";
import Header from "@/components/Header.vue";
import SelectTemplate from "@/components/SelectTemplate.vue";

export default {
  components: {
    AddEntryForm,
    ShowAllEntries,
    Header,
    SelectTemplate
  },
  data () {
    return {
      currentInput: {
        "date": "2023-04-16",
        "description": "Vorgang 3",
        "statementOfAccountId": 1,
        "isExpense": false,
        "location": "Gemeinschaftsraum",
        "amount":  32.33,
        "account": "Commerzbank",
        "taxClass": "Mehrwertsteuer (voll)",
        "taxGroup": "GRA",
        "taxRate": 19
      },
      allTransactions: [],
    }
  },
  methods: {
    handleNewTransactions (newTransaction) {
      axios.post("http://localhost/api/transactions", newTransaction)
          .then((response) => {
            console.log(response);
            this.fetchTransactions();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    fetchTransactions() {
      axios.get("http://localhost/api/transactions")
          .then((response) => {
            this.allTransactions = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    changeCurrentInputByGivenTemplate(newCurrentInput) {
      console.log("newCurrentInput", newCurrentInput);
      this.currentInput = newCurrentInput;
    }
  },
  created() {
    axios.get("http://localhost:3000/transactions")
        .then((response) => {
          this.allTransactions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
}
</script>
<!--TODO-->
<!--Click auf Hinzufügen macht sprung des cursers in Kontoauszugsnummer feld-->
<!--Shortcuts einbauen für templates-->
<!--Form Validation Einfügen-->
<!--Template Kaution-->