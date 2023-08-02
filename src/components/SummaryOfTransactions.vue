<template>
  <div>
    <h3>{{$t('summaryHeadline')}} {{this.transactionsToSummarize[0].statementOfAccountId}}</h3>
    <table class="table">
      <thead>
      <tr>
        <th>{{$t("statementOfAccountId")}}</th>
        <th>{{$t("timeInterval")}}</th>
        <th>{{$t("balanceAtDate")}} {{this.formatDate(this.getMinMaxDate("min"))}}</th>
        <th>{{$t("changeOfBalance")}}</th>
        <th>{{$t("balanceAtDate")}} {{this.formatDate(this.getMinMaxDate("max"))}}</th>
      </tr>
      </thead>
      <tbody class="table-striped">
      <tr>
        <td>{{this.transactionsToSummarize[0].statementOfAccountId}}</td>
        <td>{{this.getMaximumDateInterval()}}</td>
        <td>{{this.getBalanceOfDate(this.getMinMaxDate("min"))}}</td>
        <td>{{this.getChangeOfBalance()}}</td>
        <td>{{this.getBalanceOfDate(this.getMinMaxDate("max"))}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "SummaryOfTransactions",
  props: ["transactionsToSummarize", "startBalance"],
  data () {
    return {

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
    getMinMaxDate(type) {
      const sortedTransactions = [...this.transactionsToSummarize].sort((a, b) => new Date(a.date) - new Date(b.date));

      if (type === "min") {
        return sortedTransactions[0].date;
      } else if(type === "max") {
        return sortedTransactions[sortedTransactions.length - 1].date
      }
    },
    getMaximumDateInterval () {
      return `${this.formatDate(this.getMinMaxDate("min"))} - ${this.formatDate(this.getMinMaxDate("max"))}`;
    },
    getBalanceOfDate(dateString) {
      const transactions = this.transactionsToSummarize;
      let balance = this.startBalance;

      for (const transaction of transactions) {
        if (transaction.date <= dateString) {
          balance += transaction.amount * (-1 ? transaction.isExpense : 1);
        }
      }

      return balance.toFixed(2);
    },
    getChangeOfBalance () {
      let startBalance = this.getBalanceOfDate(this.getMinMaxDate("min"));
      let endBalance = this.getBalanceOfDate(this.getMinMaxDate("max"));

      return (endBalance - startBalance).toFixed(2);
    }
  }
}

</script>