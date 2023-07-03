<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
</script>
<template>
  <div class="col-11">
    <h1 style="margin-top: 1em">{{$t("addNewTransaction")}}</h1>
  </div>
  <div class="col-1 center-content" @click="toggleLanguage">
    <span class="fi" :class="['fi-' + flagIconClass, 'image-scaling']" :title="explanationText"></span>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      selectedLanguage: "de"
    }
  },
  methods: {
    toggleLanguage() {
      this.selectedLanguage === "de" ? this.selectedLanguage = "en" : this.selectedLanguage = "de";
      this.$i18n.locale = this.selectedLanguage;
    }
  },
  computed: {
    flagIconClass() {
      if (this.selectedLanguage === "de") {
        return "us";
      } else {
        return "de";
      }
    },
    explanationText() {
      if (this.selectedLanguage === "de") {
        return this.$t("germanFlagTitle");
      } else {
        return this.$t("americanFlagTitle");
      }
    }
  }
}
</script>
<style scoped>
.image-scaling {
  width: 50%;
}
</style>
