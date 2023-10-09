<script setup>

import EditTransaction from "./EditTransaction.vue";
</script>

<template>
  <td>
    <template v-if="!isEditing">
      {{ entry.statementOfAccountId + "." + rowIndex }}
    </template>
    <template v-else>
      <input type="number" v-model="editedEntry.statementOfAccountId" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ formatDate(entry.date) }}
    </template>
    <template v-else>
      <input type="date" v-model="editedEntry.date" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.description }}
    </template>
    <template v-else>
      <input type="text" v-model="editedEntry.description" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.isExpense ? $t('expense') : $t('income') }}
    </template>
    <template v-else>
      <select v-model="editedEntry.isExpense">
        <option value="true">{{ $t("expense") }}</option>
        <option value="false">{{ $t("income") }}</option>
      </select>
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.location }}
    </template>
    <template v-else>
      <input type="text" v-model="editedEntry.location" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.amount }}
    </template>
    <template v-else>
      <input type="number" v-model="editedEntry.amount" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.account }}
    </template>
    <template v-else>
      <input type="text" v-model="editedEntry.account" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.taxClass }}
    </template>
    <template v-else>
      <input type="text" v-model="editedEntry.taxClass" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.taxGroup }}
    </template>
    <template v-else>
      <input type="text" v-model="editedEntry.taxGroup" />
    </template>
  </td>
  <td>
    <template v-if="!isEditing">
      {{ entry.taxRate }}
    </template>
    <template v-else>
      <input type="number" v-model="editedEntry.taxRate" />
    </template>
  </td>
  <td>
    <EditTransaction :editIsOpened="isEditing" @update:editIsOpened="toggleEdit()" />
  </td>
  <td>
    <button @click="deleteTransaction(entry._id)">
      <img src="/trash.svg" alt="Delete" width="16" height="16">
    </button>
  </td>
</template>


<script>

export default {
  props: {
    entry: Object,
    rowIndex: Number
  },
  emits: ["edit", "delete"],
  data() {
    return {
      editedEntry: { ...this.entry },
      isEditing: false
    };
  },
  computed: {

  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        this.$emit("edit", this.editedEntry._id, this.editedEntry);
      }
      this.isEditing = !this.isEditing;
    },
    deleteTransaction() {
      this.$emit("delete", this.editedEntry._id);
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