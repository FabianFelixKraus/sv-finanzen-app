<template>
  <div>
    <h3>{{$t('summaryHeadline')}} {{this.transactionsToSummarize[0].statementOfAccountId}} {{$t("from")}} {{this.formatDate(this.getMinMaxDate("max"))}}</h3>
    <table class="table">
      <thead>
      <tr>
        <th>{{$t("statementOfAccountId")}}</th>
        <th>{{$t("timeInterval")}}</th>
        <th>{{$t("balanceAtDate")}} {{this.formatDate(this.getMinMaxDate("min", -1))}}</th>
        <th>{{$t("changeOfBalance")}}</th>
        <th>{{$t("balanceAtDate")}} {{this.formatDate(this.getMinMaxDate("max"))}}</th>
        <th>{{$t("lengthOfTransactionsToSummarize")}}</th>
      </tr>
      </thead>
      <tbody class="table-striped">
      <tr>
        <td>{{this.transactionsToSummarize[0].statementOfAccountId}}</td>
        <td>{{this.getMaximumDateInterval()}}</td>
        <td>{{this.startBalance.toFixed(2)}}</td>
        <td>{{this.getChangeOfBalance().toFixed(2)}}</td>
        <td>{{this.getNewBalance()}}</td>
        <td>{{this.transactionsToSummarize.length}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "SummaryOfTransactions",
  props: ["transactionsToSummarize", "startBalance"],
  watch: {
    startBalance(newValue) {
      if (newValue !== undefined) {
        console.log("startBalance changed:", newValue);
      }
    }
  },
  methods: {
    formatDate(dateString) {
      // Create a Date object from the input string
      const date = new Date(dateString);

      // Get the day, month, and year components
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
      const year = date.getUTCFullYear();

      // Format the components as a string in the desired format
      return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    },
    getMinMaxDate(type, shift) {
      const sortedTransactions = [...this.transactionsToSummarize].sort((a, b) => new Date(a.date) - new Date(b.date));

      // Check if offset is provided, otherwise set it to 0
      const offset = shift !== undefined ? shift : 0;

      if (type === "min") {
        const minDate = new Date(sortedTransactions[0].date);
        minDate.setDate(minDate.getDate() + offset);
        return minDate;
      } else if(type === "max") {
        const maxDate = new Date(sortedTransactions[sortedTransactions.length - 1].date);
        maxDate.setDate(maxDate.getDate() + offset);
        return maxDate
      }
    },
    getMaximumDateInterval () {
      return `${this.formatDate(this.getMinMaxDate("min"))} - ${this.formatDate(this.getMinMaxDate("max"))}`;
    },
    getChangeOfBalance () {
      let changedBalanced = 0
      for (const transaction of this.transactionsToSummarize) {
        changedBalanced += transaction.amount * (transaction.isExpense ? -1 : 1);
      }
      return changedBalanced;
    },
    getNewBalance() {
      const result = this.startBalance + this.getChangeOfBalance();
      return result.toFixed(2);
    },
  }
}

</script>