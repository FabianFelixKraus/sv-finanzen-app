<script setup>

import EditTransaction from "@/components/EditTransaction.vue";
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
        <img src="/pencil.svg" alt="Edit" width="16" height="16">
      </th>
      <th>
        {{$t("delete")}}
        <img src="/trash.svg" alt="Delete" width="16" height="16">
      </th>
    </tr>
    </thead>
    <tbody class="table-striped">
      <tr v-for="(entry, index) in sortedDates" :key="index">
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.statementOfAccountId }}</template>
          <input v-else type="number" v-model="editedEntries[index].statementOfAccountId" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ formatDate(entry.date) }}</template>
          <input v-else type="date" v-model="editedEntries[index].date" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.description }}</template>
          <input v-else type="text" v-model="editedEntries[index].description" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.isExpense ? $t('expense') : $t('income') }}</template>
          <select v-else v-model="editedEntries[index].isExpense">
            <option value="true">Expense</option>
            <option value="false">Income</option>
          </select>
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.location }}</template>
          <input v-else type="text" v-model="editedEntries[index].location" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.amount }}</template>
          <input v-else type="number" v-model="editedEntries[index].amount" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.account }}</template>
          <input v-else type="text" v-model="editedEntries[index].account" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.taxClass }}</template>
          <input v-else type="text" v-model="editedEntries[index].taxClass" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.taxGroup }}</template>
          <input v-else type="text" v-model="editedEntries[index].taxGroup" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.taxRate }}</template>
          <input v-else type="number" v-model="editedEntries[index].taxRate" />
        </td>
        <td>
          <EditTransaction :editIsOpened="entry.isTransactionEdited" :indexOfTransactionToEdit="index" @update:editIsOpened="updateRowEditedStatus"/>
        </td>
        <td>
          <button @click="deleteTransaction(entry._id, index)">
            <img src="/trash.svg" alt="Delete" width="16" height="16">
          </button>
        </td>
      </tr>
    </tbody>
  </table>


</template>

<script>
  import axios from "axios";

  export default {
    name: "ShowAllEntriesPerStatementOfAccountId",
    props: ["allEntriesPerStatementOfAccountId"],
    data () {
      return {
        isSortedAscending: true,
        sortKey: 'date'
      }
    },
    computed: {
      editedEntries: function() {
        return this.allEntriesPerStatementOfAccountId.map(entry => Object.assign({}, entry));
      },
      getStatementOfAccountId: function() {
        return this.allEntriesPerStatementOfAccountId[0].statementOfAccountId;
      },
      sortedDates: function() {
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

        }
        )
      }
    },
    methods: {
      updateRowEditedStatus(updatedIsTransactionEditedStatus, indexOfTransactionToEdit, action) {
        if (action === "save") {
          this.allEntriesPerStatementOfAccountId[indexOfTransactionToEdit] = this.editedEntries[indexOfTransactionToEdit];
          axios.put("http://localhost:3000/transactions/" + this.allEntriesPerStatementOfAccountId[indexOfTransactionToEdit]._id, this.allEntriesPerMonth[indexOfTransactionToEdit])
              .then(response => console.log(response))
              .catch(error => console.log(error));
        }
        else if (action === "cancel") {
          this.editedEntries = this.allEntriesPerStatementOfAccountId;
        }
        this.allEntriesPerStatementOfAccountId[indexOfTransactionToEdit].isTransactionEdited = updatedIsTransactionEditedStatus;
      },
      deleteTransaction(id, index) {
        console.log("id", id)
        axios.delete("http://localhost:3000/transactions/" + id)
            .then(response => {
              console.log(response);
              this.allEntriesPerStatementOfAccountId.splice(index, 1);
            })
            .catch(error => console.log(error));
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
      },
      getBalance(type) {
        return this.allEntriesPerStatementOfAccountId.filter(transaction => transaction.account === type || type === undefined)
            .reduce((acc, ele) => acc + ele.amount, 0)
            .toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .table-striped tr:nth-child(2n+1) {
    background-color: #f2f2f2;
  }
</style>