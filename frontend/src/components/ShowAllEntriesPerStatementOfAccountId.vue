<script setup>
import TransactionRow from "./TransactionRow.vue";
</script>

<template>
  <br>
  <h2>{{$t('statementOfAccountIdDescription')}} {{ getStatementOfAccountId }}</h2>
  <table class="table">
    <thead class="table-head-content-not-wrapped">
    <tr>
      <th scope="col">{{$t("statementOfAccountId")}}</th>
      <th scope="col"><button @click="sortBy('date')">{{$t("date")}}</button></th>
      <th scope="col"><button @click="sortBy('description')">{{$t("description")}}</button></th>
      <th scope="col"><button @click="sortBy('isExpense')">{{$t("expenseIncome")}}</button></th>
      <th scope="col"><button @click="sortBy('location')">{{$t("location")}}</button></th>
      <th scope="col"><button @click="sortBy('amount')">{{$t("amount")}}</button></th>
      <th scope="col"><button @click="sortBy('account')">{{$t("account")}}</button></th>
      <th scope="col"><button @click="sortBy('taxClass')">{{$t("taxClass")}}</button></th>
      <th scope="col"><button @click="sortBy('taxGroup')">{{$t("taxGroup")}}</button></th>
      <th scope="col"><button @click="sortBy('taxRate')">{{$t("taxRate")}}</button></th>
      <th>
        {{$t("edit")}}
        <br />
        <img src="/pencil.svg" alt="Edit" width="16" height="16">
      </th>
      <th>
        {{$t("delete")}}
        <br />
        <img src="/trash.svg" alt="Delete" width="16" height="16">
      </th>
    </tr>
    </thead>
    <tbody class="table-striped">
    <tr v-for="(entry, index) in sortedTransactions" :key="entry._id">
      <TransactionRow :entry="entry" :rowIndex="index" @edit="editTransaction" @delete="deleteTransaction"/>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "ShowAllEntriesPerStatementOfAccountId",
    props: ["allEntriesPerStatementOfAccountId"],
    emits: ["edit", "delete"],
    data () {
      return {
        isSortedAscending: true,
        sortKey: 'date',
      }
    },
    computed: {
      getStatementOfAccountId: function() {
        return this.allEntriesPerStatementOfAccountId[0].statementOfAccountId;
      },
      sortedTransactions: function() {
        return this.allEntriesPerStatementOfAccountId.slice().sort((a,b) => {
          if (this.sortKey === 'date') {
            if (this.isSortedAscending) {
              return new Date(a.date) - new Date(b.date);
            } else {
              return new Date(b.date) - new Date(a.date);
            }
          } else if (this.sortKey === 'amount' || this.sortKey === 'taxRate' || this.sortKey === 'isExpense') {
            if (this.isSortedAscending) {
              return a[this.sortKey] - b[this.sortKey];
            } else {
              return b[this.sortKey] - a[this.sortKey];
            }
          } else {
            if (this.isSortedAscending) {
              return a[this.sortKey].localeCompare(b[this.sortKey]);
            } else {
              return b[this.sortKey].localeCompare(a[this.sortKey]);
            }
          }
        });
      }
    },
    methods: {
      deleteTransaction(id) {
        this.$emit("delete", id);
      },
      editTransaction(id, editedTransaction) {
        this.$emit("edit", id, editedTransaction);
      },
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
      sortBy(key) {
        if (key === this.sortKey) {
          this.isSortedAscending = !this.isSortedAscending;
        } else {
          this.sortKey = key;
          this.isSortedAscending = true;
        }
      }
    }
  }
</script>