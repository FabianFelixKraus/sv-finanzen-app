<template>
  <input :value="message" @input="handleInput" />
  <div>{{message}}</div>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-4" >
          <div class="form-group">
            <label for="inputStatementOfAccountId">{{$t("statementOfAccountId")}}</label>
            <input id="inputStatementOfAccountId" class="form-control" type="number">
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label for="inputDate">{{ $t("date") }}</label>
            <input id="inputDate" class="form-control" type="date">
          </div>
        </div>
        <div class="col-4">
          <label for="inputIsExpense" class="form-check-label">{{$t("expense/income")}}</label>
          <div class="form-check form-switch w-100 d-flex align-items-center justify-content-center">
            <input id="inputIsExpense" class="form-check-input w-25 " type="checkbox" v-model="isExpense" />
            <label for="inputIsExpense" class="form-check-label">{{isExpense ? $t("expense") : $t("income")}}</label>
          </div>
        </div>
      </div>
      <div class ="row">
        <div class="col-12">
          <label for="inputDescription">{{ $t("description") }}</label>
          <input id="inputDescription" class="form-control" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAmount">{{ $t("location") }}</label>
          <input id="inputAmount" class="form-control" type="number">
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("amount") }}</label>
          <input id="inputAmount" class="form-control" type="number">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAccount">{{ $t("account") }}</label>
          <input id="inputAccount" class="form-control" type="text">
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxGroup") }}</label>
          <input id="inputAmount" class="form-control" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxClass") }}</label>
          <input id="inputAmount" class="form-control" type="text">
        </div>
        <div class="col-6">
          <label for="inputAmount">{{ $t("taxRate") }}</label>
          <input id="inputAmount" class="form-control" type="number">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AddEntryForm',
  props: ["msg"],
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
    handleInput (event) {
      this.message = event.target.value;
      this.$emit("handleInput", this.message);
    }
  }
};
</script>
<style scoped>
.form-check-input {
  margin-right: 10%;
}
</style>