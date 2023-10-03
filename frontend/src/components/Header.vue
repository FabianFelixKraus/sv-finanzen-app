<template>
  <div class="d-flex justify-content-between align-items-center start-end-content">
    <h1>{{$t("cashBook")}}</h1>
    <button class="btn-outline-primary" @click="toggleLanguage">
      <img :src="flagIconClass" :alt="explanationText">
    </button>
    </div>
</template>

<script>
import germanFlag from "@/assets/german-flag.svg";
import britishFlag from "@/assets/british-flag.svg";

export default {
  name: "Header",
  data() {
    return {
      selectedLanguage: "de"
    };
  },
  methods: {
    toggleLanguage() {
      this.selectedLanguage = this.selectedLanguage === "de" ? "en" : "de";
      this.$i18n.locale = this.selectedLanguage;
    }
  },
  computed: {
    flagIconClass() {
      return this.selectedLanguage === "de" ? germanFlag : britishFlag;
    },
    explanationText() {
      if (this.selectedLanguage === "de") {
        return this.$t("germanFlagTitle");
      } else {
        return this.$t("americanFlagTitle");
      }
    }
  }
};
</script>
