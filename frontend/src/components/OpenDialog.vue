<template>
  <button class="btn btn-primary" @click="openDialog">
    <img src="/Add.svg" alt="add Transaction" width="48" height="48">
  </button>
  <AddTransactionDialog v-show="isDialogOpen"
                        @close="closeDialog" @submit="handleSubmit" @getNewTransaction="getNewTransaction"
  />
</template>

<script>
  import AddTransactionDialog from "./AddTransactionDialog.vue";

  export default {
    name: "OpenDialog",
    components: {
      AddTransactionDialog
    },
    data() {
      return {
        isDialogOpen: false
      }
    },
    emits: ['getNewTransaction'],
    methods: {
      openDialog() {
        this.isDialogOpen = true;
      },
      closeDialog() {
        this.isDialogOpen = false;
      },
      handleSubmit() {
        this.isDialogOpen = false;
      },
      getNewTransaction(newTransaction) {
        this.$emit("getNewTransaction", newTransaction)
      }
    }
  }
</script>

<style scoped>

</style>