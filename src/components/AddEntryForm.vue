<template>
  <form ref="addTransactionForm" id="addTransactionForm" @submit.prevent @keydown.ctrl.enter="handleSubmit">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="inputStatementOfAccountId">{{ $t("statementOfAccountId") }}</label>
            <input id="inputStatementOfAccountId" class="form-control" type="number" v-model="inputData.statementOfAccountId"
                   @input="addStatementOfAccountId" ref="startOfForm" required>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="inputDate">{{ $t("date") }}</label>
            <input id="inputDate" class="form-control" type="date" v-model="inputData.date" @input="addDate" required>
          </div>
        </div>
        <div class="col-4">
          <label for="inputIsExpense" class="form-check-label">{{ $t("expense/income") }}</label>
          <div class="form-check form-switch w-100 d-flex align-items-center justify-content-center">
            <input id="inputIsExpense" class="form-check-input w-25 " type="checkbox" v-model="isExpense" @input="addIsExpense">
            <label for="inputIsExpense" class="form-check-label">{{ isExpense ? $t("expense") : $t("income") }}</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label for="inputDescription">{{ $t("description") }}</label>
          <input id="inputDescription" class="form-control" type="text" v-model="inputData.description" @input="addDescription" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputLocation">{{ $t("location") }}</label>
          <input id="inputLocation" class="form-control" type="text" v-model="inputData.location" @input="addLocation" required>
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("amount") }}</label>
          <input id="inputAmount" class="form-control" type="number" step="0.01" v-model="inputData.amount" @input="addAmount" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAccount">{{ $t("account") }}</label>
          <input id="inputAccount" class="form-control" type="text" v-model="inputData.account" @input="addAccount" required>
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxGroup") }}</label>
          <input id="inputAmount" class="form-control" type="text" v-model="inputData.taxGroup" @input="addTaxGroup" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxClass") }}</label>
          <input id="inputAmount" class="form-control" type="text" v-model="inputData.taxClass" @input="addTaxClass" required>
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxRate") }}</label>
          <input id="inputAmount" class="form-control" type="number" step="0.01" v-model="inputData.taxRate" @input="addTaxRate" required>
        </div>
      </div>
      <div class="row">
        <div class="col-12 center-content ">
          <button
              id="submitButton"
              type="submit"
              @click.prevent="handleSubmit"
              class="btn btn-primary submit-button"
              :disabled="loading"
          >
            <span v-if="loading">
              <i class="loading-spinner"></i> {{ $t("loadingMessage") }}
            </span>
            <span v-else>{{ $t("submitNewTransaction") }}</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddEntryForm',
  props: ["currentInput"],
  computed: {
    inputData() {
      return {
        date: this.currentInput.date,
        description: this.currentInput.description,
        statementOfAccountId: this.currentInput.statementOfAccountId,
        isExpense: this.currentInput.isExpense,
        location: this.currentInput.location,
        amount: this.currentInput.amount,
        account: this.currentInput.account, //Commerzbank
        taxClass: this.currentInput.taxClass, //Umsatzsteuer,
        taxGroup: this.currentInput.taxGroup, //WBE, ...
        taxRate: this.currentInput.taxRate,
        snackbar: false,
        color: 'error',
        timeout: 6000,
        errorMessage: ''
      };
    }
  },
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
      loading: false
    };
  },
  methods: {
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
    
    async handleSubmit() {
      if (this.$refs.addTransactionForm.checkValidity()) {
        const newTransaction = {
          "date": this.inputData.date,
          "description": this.inputData.description,
          "statementOfAccountId": this.inputData.statementOfAccountId,
          "isExpense": this.inputData.isExpense,
          "location": this.inputData.location,
          "amount": this.inputData.amount,
          "account": this.inputData.account,
          "taxClass": this.inputData.taxClass,
          "taxGroup": this.inputData.taxGroup,
          "taxRate": this.inputData.taxRate
        };
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          this.$emit("getNewTransaction", newTransaction);
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false; // Set loading back to false after the async call completes
        }

      } else {
        alert(this.$t("formValidationErrorMessage"))
      }
      this.$refs.startOfForm.focus();
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