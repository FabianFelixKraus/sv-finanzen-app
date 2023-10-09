<template>
  <div>
    <StartBalance :startBalance="startBalances[0]" @update:startBalance="onStartBalanceUpdate" />
    <div v-if="calculationsDone">
      <div v-for="(entries, index) in createStatementOfAccountIdArrays" :key="index">
        <ShowAllEntriesPerStatementOfAccountId
            :allEntriesPerStatementOfAccountId="entries"
            @edit="editAllEntriesPerStatementOfAccountId"
            @delete="deleteEntryOfAllEntries"
        />
        <SummaryOfTransactions
            :transactionsToSummarize="entries"
            :startBalance="startBalances[index]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StartBalance from "./StartBalance.vue";
import ShowAllEntriesPerStatementOfAccountId from "./ShowAllEntriesPerStatementOfAccountId.vue";
import SummaryOfTransactions from "./SummaryOfTransactions.vue";
import {deleteTransactionById, updateTransactionById} from "@/services/apiService";

export default {
  name: "ShowAllEntries",
  components: {
    SummaryOfTransactions,
    ShowAllEntriesPerStatementOfAccountId,
    StartBalance
  },
  props: ["allEntries"],
  data() {
    return {
      isSortedAscending: true,
      startBalances: [27927.64],
      calculationsDone: false
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
  },
  methods: {
    onStartBalanceUpdate(value) {
      this.startBalances[0] = value;
    },
    async calculateBalancesAsync() {
      await this.calculateBalances(); // Wait for calculations to complete
      this.calculationsDone = true;
    },
    calculateBalances() {
      for (const [index, entries] of this.createStatementOfAccountIdArrays.entries()) {
        const difference = this.calculateDifference(entries);
        const newBalance = this.startBalances[index] + difference;
        this.startBalances.push(newBalance)
      }
    },
    calculateDifference(transactions) {
      return transactions.reduce((acc, ele) => acc + ele.amount * (ele.isExpense ? -1 : 1), 0);
    },
    editAllEntriesPerStatementOfAccountId(id, editedTransaction) {
      const index = this.allEntries.findIndex(transaction => transaction._id === id);

      if (index !== -1) {
      // Update the data in the array immediately
      this.allEntries[index] = {
        ...this.allEntries[index],
        ...editedTransaction
      };
      updateTransactionById(id, editedTransaction)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          this.allEntries[index] = {
            ...this.allEntries[index],
            ...this.allEntries[index] // Revert to the original data
          };
        });
      }
    },
    deleteEntryOfAllEntries(id) {
      const index = this.allEntries.findIndex(transaction => transaction._id === id);

      if (index !== -1) {
        // Use splice to remove the item at the specified index
        this.allEntries.splice(index, 1);

        deleteTransactionById(id)
            .then(response => {
              console.log(response);
            })
            .catch(error => console.log(error));
      }
    }
  }
};
</script>
