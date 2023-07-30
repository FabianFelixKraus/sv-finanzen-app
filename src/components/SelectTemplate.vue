<template>
  <span class="flex" key="index" v-for="(name, index) in templateNames" :title="$t(name) + ' ' + $t('selectTemplate')">
    <button
        type="button"
        class="btn btn-outline-primary template-button m-1"
        @click="selectTemplate(name)"
    >
      {{ $t(name) }}
    </button>
  </span>
</template>
<script>
  export default {
    name: "SelectTemplate",
    data () {
      return {
        selectedTemplate: undefined,
        templateNames: ["card4Vend", "sumUp", "payOne", "rentStudentWERK", "invoice", "telekom", "cleaningService", "electricityBill", "accountMaintenanceFee", "deposit", "vodafone", "empty"],
        templates: {
          "card4Vend": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Card4Vent GmbH",
            "statementOfAccountId": null,
            "isExpense": false,
            "location": "Waschbar",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "Umsatzsteuer",
            "taxGroup": "WBE",
            "taxRate": 19
          },
          "sumUp": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Sum up",
            "statementOfAccountId": null,
            "isExpense": false,
            "location": "Gemeinschaftsraum",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "Umsatzsteuer",
            "taxGroup": "GRE",
            "taxRate": 19
          },
          "payOne": {
            "date": new Date().toISOString().split('T')[0],
            "description": "PAYONE GmbH",
            "statementOfAccountId": null,
            "isExpense": false,
            "location": "Waschbar",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "Umsatzsteuer",
            "taxGroup": "WBE",
            "taxRate": 19
          },
          "rentStudentWERK": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Miete StudierendenWERK",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Waschbar",
            "amount":  160.00,
            "account": "Commerzbank",
            "taxClass": "Mwst. voll",
            "taxGroup": "WBA",
            "taxRate": 19
          },
          "invoice": {
            "date": new Date().toISOString().split('T')[0],
            "description": "",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "telekom": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Telekom",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  34.94,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "cleaningService": {
            "date": new Date().toISOString().split('T')[0],
            "description": "3B Dienstleistungen",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  32.33,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "electricityBill": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Naturstromhandel GmbH",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Waschbar",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "WBA",
            "taxRate": 19
          },
          "accountMaintenanceFee": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Kontoführungsgebühren",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Sonstiges",
            "amount":  30.35,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "KtA",
            "taxRate": 0
          },
          "deposit": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Kaution ",
            "statementOfAccountId": null,
            "isExpense": false,
            "location": "Gemeinschaftsraum",
            "amount":  100.00,
            "account": "Commerzbank",
            "taxClass": "keine",
            "taxGroup": "??",
            "taxRate": 0
          },
          "flaschenport": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Erstattung Getränkelieferung Flaschenpost SE",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Gemeinschaftsraum",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "GRA",
            "taxRate": 19
          },
          "vodafone": {
            "date": new Date().toISOString().split('T')[0],
            "description": "Vodafone GmbH",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "Waschbar",
            "amount":  26.73,
            "account": "Commerzbank",
            "taxClass": "MwSt. voll",
            "taxGroup": "WBA",
            "taxRate": 19
          },
          "empty": {
            "date": new Date().toISOString().split('T')[0],
            "description": "",
            "statementOfAccountId": null,
            "isExpense": true,
            "location": "",
            "amount":  null,
            "account": "Commerzbank",
            "taxClass": "",
            "taxGroup": "",
            "taxRate": null
          }
        }
      }
    },
    methods: {
      selectTemplate(name) {
        console.log("datatopass", this.templates[name])
        this.selectedTemplate = name;
        this.$emit("changeCurrentInput", this.templates[this.selectedTemplate]);
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