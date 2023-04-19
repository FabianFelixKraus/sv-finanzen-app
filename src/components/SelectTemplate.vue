<template>
  <span class="flex" key="index" v-for="(name, index) in templateNames">
    <button type="button" class="btn btn-outline-primary template-button" @click="selectTemplate(name)">{{ $t(name) }}</button>
  </span>
</template>
<script>
  export default {
    name: "SelectTemplate",
    data () {
      return {
        selectedTemplate: undefined,
        templateNames: ["card4Vend", "invoice", "telekom", "cleaningService", "electricityBill", "accountMaintenanceFee", "empty"],
        templates: {
          "card4Vend": {
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
          "invoice": {
            "date": "2023-04-16T12:34:56.789Z",
            "description": "Vorgang 1",
            "statementOfAccountId": 1,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  32.33,
            "account": "Commerzbank",
            "taxClass": "Mehrwertsteuer (voll)",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "telekom": {
            "date": "2023-04-16T12:34:56.789Z",
            "description": "Vorgang 1",
            "statementOfAccountId": 1,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  32.33,
            "account": "Commerzbank",
            "taxClass": "Mehrwertsteuer (voll)",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "cleaningService": {
            "date": "2023-04-16T12:34:56.789Z",
            "description": "Vorgang 1",
            "statementOfAccountId": 1,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  32.33,
            "account": "Commerzbank",
            "taxClass": "Mehrwertsteuer (voll)",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "electricityBill": {
            "date": "2023-04-16T12:34:56.789Z",
            "description": "Vorgang 1",
            "statementOfAccountId": 1,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  32.33,
            "account": "Commerzbank",
            "taxClass": "Mehrwertsteuer (voll)",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "accountMaintenanceFee": {
            "date": "2023-04-16T12:34:56.789Z",
            "description": "Vorgang 1",
            "statementOfAccountId": 1,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  32.33,
            "account": "Commerzbank",
            "taxClass": "Mehrwertsteuer (voll)",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "empty": {
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
          }
        }
      }
    },
    methods: {
      selectTemplate(name) {
        this.selectedTemplate = name;
        this.$emit("useTemplate", this.templates[this.selectedTemplate]);
      }
    }
  }
</script>
<style scoped>
.template-button {
  margin-left: 1%;
  margin-right: 1%;
}
</style>