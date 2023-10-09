<template>
  <div v-if="editIsOpened">
    <div class="show-horizontally">
      <button @click="toggleEditTransaction('save')">
        <img src="/check2.svg" alt="Edit" width="16" height="16">
      </button>
      <button @click="toggleEditTransaction('cancel')">
        <img src="/x.svg" alt="Edit" width="16" height="16">
      </button>
    </div>
  </div>
  <div v-else>
    <button @click="toggleEditTransaction('edit')">
      <img src="/pencil.svg" alt="Edit" width="16" height="16">
    </button>
  </div>
</template>

<script>
  export default {
    name: 'EditTransaction',
    props: ["editIsOpened"],
    methods: {
      toggleEditTransaction(action) {
        this.$emit('update:editIsOpened', !this.editIsOpened, action);
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