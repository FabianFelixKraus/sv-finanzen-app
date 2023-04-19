<template>
  <h2 class="center-content">{{$t("showAllTransactions")}}</h2>
  <div class="center-content">
    <ol key="index" v-for="(transaction, index) in allEntries">
      <li>{{ transaction.date }}</li>
      <li>{{ transaction.description }}</li>
      <li>{{ transaction.statementOfAccountId }}</li>
      <li>{{ transaction.isExpense }}</li>
      <li>{{ transaction.location }}</li>
      <li>{{ transaction.amount }}</li>
      <li>{{ transaction.account }}</li>
      <li>{{ transaction.taxClass }}</li>
      <li>{{ transaction.taxGroup }}</li>
      <li>{{ transaction.taxRate }}</li>
    </ol>
  </div>
</template>
<script>
  export default {
    name: "ShowAllEntries",
    data() {
      return {
        test: "1324"
      }
    },
    props: ["allEntries"]
  }
</script>