<template>
  <h2 class="center-content">{{$t("showAllTransactions")}}</h2>
  <StartBalance :startBalance="startBalances[0]" @update:startBalance="onStartBalanceUpdate" />
    <div v-for="(allEntriesPerStatementOfAccountId, index) in createStatementOfAccountIdArrays" :key="index">
      <ShowAllEntriesPerStatementOfAccountId :allEntriesPerStatementOfAccountId="allEntriesPerStatementOfAccountId" />
      <SummaryOfTransactions :transactionsToSummarize="allEntriesPerStatementOfAccountId" :startBalance="startBalances[index]"/>
    </div>
</template>
<script>
import StartBalance from "@/components/StartBalance.vue";
import showAllEntriesPerStatementOfAccountId from "@/components/ShowAllEntriesPerStatementOfAccountId.vue";
import SummaryOfTransactions from "@/components/SummaryOfTransactions.vue";

export default {
  name: "ShowAllEntries",
  components: {
    SummaryOfTransactions,
    ShowAllEntriesPerStatementOfAccountId: showAllEntriesPerStatementOfAccountId,
    StartBalance
  },
  props: ["allEntries"],
  data() {
    return {
      isSortedAscending: true,
      startBalances: [27972.64]
    }
  },
  computed: {
    createStatementOfAccountIdArrays: function() {
      // Use reduce to group the objects by month
      const statementOfAccountIdArrays = this.allEntries.reduce((acc, obj) => {
        // Get the statementOfAccountId from the statementOfAccountId attribute
        const statementOfAccountId = obj.statementOfAccountId;

        // If the statementOfAccountId doesn't exist in the accumulator, create a new array for it
        if (!acc[statementOfAccountId]) {
          acc[statementOfAccountId] = [];
        }

        // Push the object into the corresponding month array
        acc[statementOfAccountId].push(obj);

        return acc;
      }, {});
      // Convert the statementOfAccountIdArray object into an array of arrays
      return Object.values(statementOfAccountIdArrays);
    }
  },
  mounted() {
    this.calculateBalances();
  },
  methods: {
    onStartBalanceUpdate(value) {
      this.startBalances[0] = value;
    },
    calculateDifference(transactions) {
      return transactions.reduce((acc, ele) => acc + ele.amount * (-1 ? ele.isExpense : 1), 0);
    },
    calculateBalances() {
      const statementOfAccountIds = this.createStatementOfAccountIdArrays;
      for (let i = 1; i < statementOfAccountIds.length; i++) {
        this.startBalances.push(this.startBalances[i-1] + this.calculateDifference(statementOfAccountIds[i]))
      }
    }
  }
}
</script>