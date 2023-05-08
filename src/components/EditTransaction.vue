<template>
  <div v-if="editIsOpened">
    <div class="show-horizontally">
      <button @click="toggleEditTransaction">
        <img src="/check2.svg" alt="Edit" width="16" height="16">
      </button>
      <button @click="toggleEditTransaction">
        <img src="/x.svg" alt="Edit" width="16" height="16">
      </button>
    </div>
  </div>
  <div v-else>
    <button @click="toggleEditTransaction">
      <img src="/pencil.svg" alt="Edit" width="16" height="16">
    </button>
  </div>
</template>

<script>
  export default {
    name: 'EditTransaction',
    props: ["editIsOpened", "indexOfTransactionToEdit"],
    methods: {
      toggleEditTransaction() {
        this.$emit('update:editIsOpened', !this.editIsOpened, this.indexOfTransactionToEdit);
      }
    }
  }
</script>

<style>
  .show-horizontally {
    display: flex;
    flex-direction: row;
  }
</style>