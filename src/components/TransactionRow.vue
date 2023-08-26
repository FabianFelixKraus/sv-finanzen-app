<script setup>

import EditTransaction from "@/components/EditTransaction.vue";
</script>

<template>
    <td>
      <template v-if="!this.isEditing">{{ entry.statementOfAccountId + "." + rowIndex}}</template>
      <input v-else type="number" v-model="editedEntry.statementOfAccountId" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ formatDate(entry.date) }}</template>
      <input v-else type="date" v-model="editedEntry.date" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.description }}</template>
      <input v-else type="text" v-model="editedEntry.description" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.isExpense ? $t('expense') : $t('income') }}</template>
      <select v-else v-model="editedEntry.isExpense">
        <option value="true">{{ $t("expense") }}</option>
        <option value="false">{{ $t("income") }}</option>
      </select>
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.location }}</template>
      <input v-else type="text" v-model="editedEntry.location" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.amount }}</template>
      <input v-else type="number" v-model="editedEntry.amount" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.account }}</template>
      <input v-else type="text" v-model="editedEntry.account" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.taxClass }}</template>
      <input v-else type="text" v-model="editedEntry.taxClass" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.taxGroup }}</template>
      <input v-else type="text" v-model="editedEntry.taxGroup" />
    </td>
    <td>
      <template v-if="!this.isEditing">{{ entry.taxRate }}</template>
      <input v-else type="number" v-model="editedEntry.taxRate" />
    </td>
    <td>
      <EditTransaction :editIsOpened="this.isEditing" @update:editIsOpened="toggleEdit" />
    </td>
    <td>
      <button @click="deleteTransaction(entry._id)">
        <img src="/trash.svg" alt="Delete" width="16" height="16">
      </button>
    </td>
</template>

<script>
import axios from "axios";

export default {
  props: {
    entry: Object,
    rowIndex: Number
  },
  data() {
    return {
      editedEntry: { ...this.entry },
      isEditing: false
    };
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        // Save editedEntry and update backend
        axios.put("http://localhost:3000/transactions/" + this.editedEntry._id, this.editedEntry)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error);
            });
      }
      this.isEditing = !this.isEditing;
    },
    deleteTransaction(id) {
      axios.delete("http://localhost:3000/transactions/" + id)
          .then(response => {
            console.log(response);
            // this.allEntriesPerStatementOfAccountId.splice(index, 1);
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
  }
};
</script>

<style scoped>

</style>