<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
</script>

<template>
  <div class="d-flex justify-content-between align-items-center start-end-content" @click="toggleLanguage">
    <h1>{{$t("cashBook")}}</h1>
    <div class="">
      <div class="fi" :class="['fi-' + flagIconClass]" :title="explanationText" />
    </div>
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
