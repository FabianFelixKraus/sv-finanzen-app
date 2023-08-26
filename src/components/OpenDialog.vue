<template>
  <button class="btn btn-primary" @click="openDialog">
    <img src="/Add.svg" alt="add Transaction" width="48" height="48">
  </button>
  <AddTransactionDialog :current-input="currentInput" v-show="isDialogOpen"
                        @close="closeDialog" @submit="handleSubmit" @getNewTransaction="getNewTransaction"
  />
</template>

<script>
  import AddTransactionDialog from "@/components/AddTransactionDialog.vue";

  export default {
    name: "OpenDialog",
    components: {
      AddTransactionDialog
    },
    props: ["currentInput"],
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