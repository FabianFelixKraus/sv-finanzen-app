<template>
  <form ref="addTransactionForm" @submit.prevent @keydown.ctrl.enter="handleSubmit">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="inputStatementOfAccountId">{{ $t("statementOfAccountId") }}</label>
            <input id="inputStatementOfAccountId" class="form-control" type="number" v-model="formData.statementOfAccountId"
                   @input="addStatementOfAccountId" ref="startOfForm" required>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="inputDate">{{ $t("date") }}</label>
            <input id="inputDate" class="form-control" type="date" v-model="formData.date" @input="addDate" required>
          </div>
        </div>
        <div class="col-4">
          <label for="inputIsExpense" class="form-check-label">{{ $t("expenseIncomeDescription") }}</label>
          <div class="form-check form-switch w-100 d-flex align-items-center justify-content-center">
            <input id="inputIsExpense" class="form-check-input w-25 " type="checkbox" v-model="formData.isExpense" @input="addIsExpense">
            <label for="inputIsExpense" class="form-check-label">{{ formData.isExpense ? $t("expense") : $t("income") }}</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label for="inputDescription">{{ $t("description") }}</label>
          <input id="inputDescription" class="form-control" type="text" v-model="formData.description" @input="addDescription" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputLocation">{{ $t("location") }}</label>
          <input id="inputLocation" class="form-control" type="text" v-model="formData.location" @input="addLocation" required>
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("amount") }}</label>
          <input id="inputAmount" class="form-control" type="number" step="0.01" v-model="formData.amount" @input="addAmount" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAccount">{{ $t("account") }}</label>
          <input id="inputAccount" class="form-control" type="text" v-model="formData.account" @input="addAccount" required>
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxGroup") }}</label>
          <input id="inputAmount" class="form-control" type="text" v-model="formData.taxGroup" @input="addTaxGroup" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxClass") }}</label>
          <input id="inputAmount" class="form-control" type="text" v-model="formData.taxClass" @input="addTaxClass" required>
        </div>
        <div class="col-6">
          <label for="inputTaxRate">{{ $t("taxRate") }}</label>
          <input id="inputTaxRate" class="form-control" type="number" step="0.01" v-model="formData.taxRate" @input="addTaxRate" required>
        </div>
      </div>
    </div>
    <div class="modal-footer" style="margin-top: 1em">
      <button
          id="submitButton"
          type="submit"
          @click="handleSubmit"
          class="btn btn-primary"
          :disabled="loading"
      >
        <span v-if="loading">
          <i class="loading-spinner"></i> {{ $t("loadingMessage") }}
        </span>
        <span v-else>{{ $t("submitNewTransaction") }}</span>
      </button>
      <button type="button" class="btn btn-secondary" @click="closeModal">{{$t("close")}}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "InputTransaction",
  props: ["currentInput"],
  data() {
    return {
      formData: {
        date: "",
        description: "",
        statementOfAccountId: 0,
        isExpense: false,
        location: "",
        amount: 0,
        account: "",
        taxClass: "",
        taxGroup: "",
        taxRate: 0,
      },
      loading: false,
    };
  },
  watch: {
    currentInput: {
      handler(newInput) {
        // Update the formData object with new values from currentInput
        this.formData = { ...this.formData, ...newInput };
      },
      immediate: true, // Trigger the watcher immediately on component mount
    },
  },
  methods: {
    addStatementOfAccountId(event) {
      this.formData.statementOfAccountId = event.target.value;
    },
    addDate(event) {
      this.formData.date = event.target.value;
    },
    addDescription(event) {
      this.formData.description = event.target.value;
    },
    addIsExpense(event) {
      this.formData.isExpense = event.target.checked;
    },
    addLocation(event) {
      this.formData.location = event.target.value;
    },
    addAmount(event) {
      this.formData.amount = event.target.value.replace(",", ".");
    },
    addAccount(event) {
      this.formData.account = event.target.value;
    },
    addTaxClass(event) {
      this.formData.taxClass = event.target.value;
    },
    addTaxGroup(event) {
      this.formData.taxGroup = event.target.value;
    },
    addTaxRate(event) {
      this.formData.taxRate = event.target.value;
    },

    closeModal() {
      this.$emit("close");
    },

    async handleSubmit() {
      if (this.$refs.addTransactionForm.checkValidity()) {
        const newTransaction = { ...this.formData };
        this.loading = true;
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          this.$emit("getNewTransaction", newTransaction);
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      } else {
        alert(this.$t("formValidationErrorMessage"));
      }
      this.$refs.startOfForm.focus();
    },
  },
  emits: ["close", "getNewTransaction"],
};
</script>

<style>
.form-check-input {
  margin-right: 10%;
}
</style>
