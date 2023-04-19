<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="inputStatementOfAccountId">{{ $t("statementOfAccountId") }}</label>
            <input id="inputStatementOfAccountId" class="form-control" type="number" v-bind:value="statementOfAccountId"
                   @input="addStatementOfAccountId">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="inputDate">{{ $t("date") }}</label>
            <input id="inputDate" class="form-control" type="date" v-bind:value="date" @input="addDate">
          </div>
        </div>
        <div class="col-4">
          <label for="inputIsExpense" class="form-check-label">{{ $t("expense/income") }}</label>
          <div class="form-check form-switch w-100 d-flex align-items-center justify-content-center">
            <input id="inputIsExpense" class="form-check-input w-25 " type="checkbox" v-model="isExpense" @input="addIsExpense"/>
            <label for="inputIsExpense" class="form-check-label">{{ isExpense ? $t("expense") : $t("income") }}</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label for="inputDescription">{{ $t("description") }}</label>
          <input id="inputDescription" class="form-control" type="text" v-bind:value="description" @input="addDescription">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputLocation">{{ $t("location") }}</label>
          <input id="inputLocation" class="form-control" type="text" v-bind:value="location" @input="addLocation">
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("amount") }}</label>
          <input id="inputAmount" class="form-control" type="number" v-bind:value="amount" @input="addAmount">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAccount">{{ $t("account") }}</label>
          <input id="inputAccount" class="form-control" type="text" v-bind:value="account" @input="addAccount">
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxGroup") }}</label>
          <input id="inputAmount" class="form-control" type="text" v-bind:value="taxGroup" @input="addTaxGroup">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxClass") }}</label>
          <input id="inputAmount" class="form-control" type="text" v-bind:value="taxClass" @input="addTaxClass">
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxRate") }}</label>
          <input id="inputAmount" class="form-control" type="number" v-bind:value="taxRate" @input="addTaxRate">
        </div>
      </div>
      <div class="row">
        <div class="col-12 center-content ">
          <button type="button" class="btn btn-primary submit-button" @click="handleSubmit">
            {{ $t("submitNewTransaction") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AddEntryForm',
  props: ["allTransactions"],
  data() {
    return {
      message: '',
      date: new Date(),
      description: '',
      statementOfAccountId: 0,
      isExpense: false,
      location: '',
      amount: 0,
      account: '', //Commerzbank
      taxClass: '', //Umsatzsteuer,
      taxGroup: '', //WBE, ...
      taxRate: 0,
    };
  },
  methods: {
    handleInput(event) {
      this.message = event.target.value;
      this.$emit("handleInput", this.message);
    },
    addStatementOfAccountId(event) {
      this.statementOfAccountId = event.target.value;
    },
    addDate(event) {
      this.date = event.target.value;
    },
    addDescription(event) {
      this.description = event.target.value;
    },
    addIsExpense(event) {
      this.isExpense = event.target.checked;
    },
    addLocation(event) {
      this.location = event.target.value;
    },
    addAmount(event) {
      this.amount = event.target.value;
    },
    addAccount(event) {
      this.account = event.target.value;
    },
    addTaxClass(event) {
      this.taxClass = event.target.value;
    },
    addTaxGroup(event) {
      this.taxGroup = event.target.value;
    },
    addTaxRate(event) {
      this.taxRate = event.target.value;
    },
    
    handleSubmit() {
      const newTransaction = {
        "date": this.date,
        "description": this.description,
        "statementOfAccountId": this.statementOfAccountId,
        "isExpense": this.isExpense,
        "location": this.location,
        "amount": this.amount,
        "account": this.account,
        "taxClass": this.taxClass,
        "taxGroup": this.taxGroup,
        "taxRate": this.taxRate
      };
      this.allTransactions.push(newTransaction);
      this.$emit("getAllNewTransactions", this.allTransactions);
    }
  }
};
</script>
<style scoped>
.form-check-input {
  margin-right: 10%;
}

.submit-button {
  margin-top: 2%;
  width: 100%;
  background-color: darkgreen;
}
</style>