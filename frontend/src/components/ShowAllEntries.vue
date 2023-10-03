<template>
  <div>
    <div v-for="(entries, index) in createStatementOfAccountIdArrays" :key="index">
      <ShowAllEntriesPerStatementOfAccountId :allEntriesPerStatementOfAccountId="entries" />
      <SummaryOfTransactions
          :transactionsToSummarize="entries"
          :startBalance="startBalances[index]"
      />
    </div>
  </div>
</template>

<script>
import StartBalance from "./StartBalance.vue";
import ShowAllEntriesPerStatementOfAccountId from "./ShowAllEntriesPerStatementOfAccountId.vue";
import SummaryOfTransactions from "./SummaryOfTransactions.vue";

export default {
  name: "ShowAllEntries",
  components: {
    SummaryOfTransactions,
    ShowAllEntriesPerStatementOfAccountId,
    StartBalance
  },
  props: ["allEntries", "startBalances"],
  data() {
    return {
      isSortedAscending: true,
    };
  },
  computed: {
    createStatementOfAccountIdArrays() {
      const statementOfAccountIdArrays = this.allEntries.reduce((acc, obj) => {
        const statementOfAccountId = obj.statementOfAccountId;
        acc[statementOfAccountId] = acc[statementOfAccountId] || [];
        acc[statementOfAccountId].push(obj);
        return acc;
      }, {});
      return Object.values(statementOfAccountIdArrays);
    }
  },
  mounted() {
    this.calculateBalancesAsync();
  }
};
</script>
