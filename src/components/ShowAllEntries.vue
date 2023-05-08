<template>
  <h2 class="center-content">{{$t("showAllTransactions")}}</h2>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">{{$t("date")}}</th>
        <th scope="col">{{$t("description")}}</th>
        <th scope="col">{{$t("statementOfAccountId")}}</th>
        <th scope="col">{{$t("expense/income")}}</th>
        <th scope="col">{{$t("location")}}</th>
        <th scope="col">{{$t("amount")}}</th>
        <th scope="col">{{$t("account")}}</th>
        <th scope="col">{{$t("taxClass")}}</th>
        <th scope="col">{{$t("taxGroup")}}</th>
        <th scope="col">{{$t("taxRate")}}</th>
        <td>
          <img src="/pencil.svg" alt="Edit" width="16" height="16">
        </td>
      </tr>
    </thead>
    <tbody class="table-striped">
    <tr v-for="(transaction, index) in allEntries" :key="index">
      <td>{{ transaction.date }}</td>
      <td>{{ transaction.description }}</td>
      <td>{{ transaction.statementOfAccountId }}</td>
      <td>{{ transaction.isExpense }}</td>
      <td>{{ transaction.location }}</td>
      <td>{{ transaction.amount }}</td>
      <td>{{ transaction.account }}</td>
      <td>{{ transaction.taxClass }}</td>
      <td>{{ transaction.taxGroup }}</td>
      <td>{{ transaction.taxRate }}</td>
      <td>
        <EditTransaction :editIsOpened="transaction.isTransactionEdited" :indexOfTransactionToEdit="index" @update:editIsOpened="updateRowEditedStatus"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  import EditTransaction from "@/components/EditTransaction.vue";

  export default {
    name: "ShowAllEntries",
    components: {
      EditTransaction
    },
    props: ["allEntries"],
    data() {
      return {
        isCurrentlyEdited: false
      }
    },
    methods: {
      updateRowEditedStatus(isTransactionEdited, indexOfTransactionToEdit) {
        this.allEntries[indexOfTransactionToEdit].isTransactionEdited = isTransactionEdited;
      }
    }
  }
</script>

<style>
  .table-striped tr:nth-child(2n+1) {
    background-color: #f2f2f2;
  }
</style>