<script setup>
import AddEntryForm from "@/components/AddEntryForm.vue";
</script>

<template>
  <h1>{{$t("addNewTransaction")}}</h1>
  <div class="hr"></div>
  <AddEntryForm :msg="message" @handleInput="receiveNewInput"/>
  <div class="hr"></div>
</template>

<script>
export default {
  data () {
    return {
      message: "Start Message",
    }
  },
  methods: {
    receiveNewInput(newInput) {
      this.message=newInput;
    }
  }
}
</script>