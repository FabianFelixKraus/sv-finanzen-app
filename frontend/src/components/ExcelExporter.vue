<template>
  <button @click="exportToExcel" class="btn btn-primary submit-button">
    {{$t("exportToExcel")}}
    <img src="/file-earmark-excel.svg" alt="Export to Excel" width="16" height="16">
  </button>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'ExcelExporter',
  props: ["transactions"],
  methods: {
    async exportToExcel() {
      try {
        const data = this.transactions;
        console.log(data);
        const fileName = "transactions.xlsx";
        const exportType = "xlsx";
        const wsName = "Transactions";
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, wsName);
        const buffer = await XLSX.write(wb, { bookType: exportType, type: "buffer" });
        const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      } catch (error) {
        console.error(error);
        alert("Export failed. Please try again.");
      }
    }
  }
}
</script>

<style>
  .submit-button {
    margin-top: 2%;
    width: 100%;
    background-color: darkgreen;
  }
</style>