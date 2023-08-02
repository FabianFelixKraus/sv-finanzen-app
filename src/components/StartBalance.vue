<template>
  <div class="row align-items-end">
    <div class="col">
      <h2>{{$t("startBalance")}}</h2>
    </div>
    <div class="col" v-if="!editMode">
      <div class="d-flex justify-content-end align-items-center">
        <p class="m-2">{{ startBalance }} Euro</p>
        <button @click="toggleEditMode">{{$t("edit")}}</button>
      </div>
    </div>
    <div class="col" v-else>
      <div class="d-flex justify-content-end align-items-center">
        <input type="number" v-model="editedNumber" />
        <button @click="saveNumber">{{$t("save")}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        editMode: false,
        editedNumber: 0
      };
    },
    props: ["startBalance"],
    computed: {

    },
    mounted() {
      this.setEditedNumber();
    },
    methods: {
      toggleEditMode() {
        this.editMode = !this.editMode;
        this.editedNumber = this.startBalance;
      },
      saveNumber() {
        this.$emit("update:startBalance", this.editedNumber);
        this.editMode = false;
      },
      setEditedNumber() {
        this.editedNumber = this.startBalance;
      }
    },
  };
</script>
