<script setup>

</script>

<template>
  <h2>{{$t("startBalance")}}</h2>
  <div v-if="!editMode">
    <p>{{ number }} Euro</p>
    <button @click="toggleEditMode">Edit</button>
  </div>
  <div v-else>
    <input type="number" v-model="editedNumber" />
    <button @click="saveNumber">Save</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        number: 27972.64,
        editedNumber: 27972.64,
        editMode: false,
      };
    },
    methods: {
      toggleEditMode() {
        this.editMode = !this.editMode;
        this.editedNumber = this.number;
      },
      saveNumber() {
        this.number = this.editedNumber;
        this.editMode = false;
      },
    },
  };
</script>

<style scoped>

</style>