<template>
  <div class="overlay">
    <div class="dialog">
      <div class="col-11">
        <h1>{{$t("addNewTransaction")}}</h1>
      </div>
      <div class="hr"></div>
      <SelectTemplate @changeCurrentInput="changeCurrentInputByGivenTemplate" />
      <div class="hr"></div>
      <InputTransaction :currentInput="currentInput" @close="closeDialog" @getNewTransaction="getNewTransaction" />
    </div>
  </div>
</template>

<script>
import InputTransaction from "./InputTransaction.vue";
import SelectTemplate from "./SelectTemplate.vue";

export default {
  name: 'AddEntryForm',
  components: {SelectTemplate, InputTransaction},
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
      }
    }
  },
  methods: {
    changeCurrentInputByGivenTemplate(newCurrentInput) {
      this.currentInput = newCurrentInput;
    },
    closeDialog() {
      this.$emit("close");
    },
    getNewTransaction(newTransaction) {
      this.$emit("getNewTransaction", newTransaction)
    }
  }
};
</script>
<style>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.dialog {
  background-color: rgba(200, 200, 200, 0.6);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  padding: 20px;
  width: 80%;
}
</style>