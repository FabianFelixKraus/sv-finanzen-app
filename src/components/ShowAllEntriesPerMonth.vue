<script setup>

import EditTransaction from "@/components/EditTransaction.vue";
</script>

<template>
  <br>
  <h2>{{getMonth}}</h2>
  <table class="table">
    <thead>
    <tr>
      <th scope="col"><button @click="sortByDate">{{$t("date")}}</button></th>
      <th scope="col">{{$t("description")}}</th>
      <th scope="col">{{$t("statementOfAccountId")}}</th>
      <th scope="col">{{$t("expenseIncome")}}</th>
      <th scope="col">{{$t("location")}}</th>
      <th scope="col">{{$t("amount")}}</th>
      <th scope="col">{{$t("account")}}</th>
      <th scope="col">{{$t("taxClass")}}</th>
      <th scope="col">{{$t("taxGroup")}}</th>
      <th scope="col">{{$t("taxRate")}}</th>
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
      <tr v-for="(entry, index) in allEntriesPerMonth" :key="index">
        <td>
          <template v-if="!entry.isTransactionEdited">{{ formatDate(entry.date) }}</template>
          <input v-else type="date" v-model="editedEntries[index].date" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.description }}</template>
          <input v-else type="text" v-model="editedEntries[index].description" />
        </td>
        <td>
          <template v-if="!entry.isTransactionEdited">{{ entry.statementOfAccountId }}</template>
          <input v-else type="number" v-model="editedEntries[index].statementOfAccountId" />
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
      <tr>
        <td>
          <h3> {{$t("result")}}</h3>
        </td>
        <td>
          {{$t("balanceCommerzbank")}}
        </td>
        <td>
          {{$t("balanceCash")}}
        </td>
        <td>
          {{$t("totalBalance")}}
        </td>
      </tr>
      <tr>
        <td>
          {{$t("sumMonth")}}
        </td>
        <td>
          {{getBalance("Commerzbank")}}
        </td>
        <td>
          {{getBalance("Kasse, bar")}}
        </td>
        <td>
          {{getBalance()}}
        </td>
      </tr>
<!--      <tr>-->
<!--        <td>-->
<!--          {{$t("sum")}}-->
<!--        </td>-->
<!--        <td>-->
<!--          {{getBalance("Commerzbank") + }}-->
<!--        </td>-->
<!--        <td>-->
<!--          {{getBalance("Kasse, bar") + }}-->
<!--        </td>-->
<!--        <td>-->
<!--          {{getBalance() + }}-->
<!--        </td>-->
<!--      </tr>-->
    </tbody>
  </table>


</template>

<script>
  import axios from "axios";

  export default {
    name: "ShowAllEntriesPerMonth",
    props: ["allEntriesPerMonth"],
    data () {
      return {
        isSortedAscending: true
      }
    },
    computed: {
      editedEntries: function() {
        return this.allEntriesPerMonth.map(entry => Object.assign({}, entry));
      },
      getMonth: function() {
        const date = new Date(this.allEntriesPerMonth[0].date);
        const monthName = date.toLocaleString("default", {month: "long"});
        const year = date.getFullYear();

        return monthName + " " + year
      }
    },
    methods: {
      updateRowEditedStatus(updatedIsTransactionEditedStatus, indexOfTransactionToEdit, action) {
        if (action === "save") {
          this.allEntriesPerMonth[indexOfTransactionToEdit] = this.editedEntries[indexOfTransactionToEdit];
          axios.put("http://localhost:3000/transactions/" + this.allEntriesPerMonth[indexOfTransactionToEdit]._id, this.allEntriesPerMonth[indexOfTransactionToEdit])
              .then(response => console.log(response))
              .catch(error => console.log(error));
        }
        else if (action === "cancel") {
          this.editedEntries = this.allEntriesPerMonth;
        }
        this.allEntriesPerMonth[indexOfTransactionToEdit].isTransactionEdited = updatedIsTransactionEditedStatus;
      },
      deleteTransaction(id, index) {
        console.log("id", id)
        axios.delete("http://localhost:3000/transactions/" + id)
            .then(response => {
              console.log(response);
              this.allEntriesPerMonth.splice(index, 1);
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
      sortByDate() {
        console.log(this.allEntriesPerMonth)
        if (this.allEntriesPerMonth.length > 1) {
          this.isSortedAscending = this.allEntriesPerMonth[0].date < this.allEntriesPerMonth[1].date;
        }
        console.log(this.isSortedAscending)
        if (this.isSortedAscending) {
          return this.allEntriesPerMonth.sort((a, b) => new Date(b.date) > new Date(a.date));
        } else {
          return this.allEntriesPerMonth.sort((a, b) => new Date(b.date) < new Date(a.date));
        }
      },
      getBalance(type) {
        return this.allEntriesPerMonth.filter(transaction => transaction.account === type || type === undefined)
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