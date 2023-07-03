<template>
  <h2 class="center-content">{{$t("showAllTransactions")}}</h2>

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
    <tr v-for="(entry, index) in allEntries" :key="index">
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
    </tbody>
  </table>
</template>
<script>
import EditTransaction from "@/components/EditTransaction.vue";
import axios from "axios";

export default {
    name: "ShowAllEntries",
    components: {
      EditTransaction
    },
    props: ["allEntries"],
    data() {
      return {
        isSortedAscending: true
      }
    },
    computed: {
      editedEntries: function() {
        return this.allEntries.map(entry => Object.assign({}, entry));
      }
    },
    methods: {
      updateRowEditedStatus(updatedIsTransactionEditedStatus, indexOfTransactionToEdit, action) {
        if (action === "save") {
          this.allEntries[indexOfTransactionToEdit] = this.editedEntries[indexOfTransactionToEdit];
          axios.put("http://localhost/transactions/" + this.allEntries[indexOfTransactionToEdit]._id, this.allEntries[indexOfTransactionToEdit])
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
        else if (action === "cancel") {
         this.editedEntries = this.allEntries;
        }
        this.allEntries[indexOfTransactionToEdit].isTransactionEdited = updatedIsTransactionEditedStatus;
      },
      deleteTransaction(id, index) {
        axios.delete("http://localhost/transactions/" + id)
          .then(response => {
            console.log(response);
            this.allEntries.splice(index, 1);
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
        if (this.allEntries.length > 1) {
          this.isSortedAscending = this.allEntries[0].date < this.allEntries[1].date;
        }
        if (this.isSortedAscending) {
          return this.allEntries.sort((a, b) => new Date(b.date) > new Date(a.date));
        } else {
          return this.allEntries.sort((a, b) => new Date(b.date) < new Date(a.date));
        }
      }
    }
  }
</script>

<style>
  .table-striped tr:nth-child(2n+1) {
    background-color: #f2f2f2;
  }
</style>