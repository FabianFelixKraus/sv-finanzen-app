<template>
  <h2 class="center-content">{{$t("showAllTransactions")}}</h2>

  <StartBalance />

<!--  <table class="table">-->
<!--    <thead>-->
<!--      <tr>-->
<!--        <th scope="col"><button @click="sortByDate">{{$t("date")}}</button></th>-->
<!--        <th scope="col">{{$t("description")}}</th>-->
<!--        <th scope="col">{{$t("statementOfAccountId")}}</th>-->
<!--        <th scope="col">{{$t("expenseIncome")}}</th>-->
<!--        <th scope="col">{{$t("location")}}</th>-->
<!--        <th scope="col">{{$t("amount")}}</th>-->
<!--        <th scope="col">{{$t("account")}}</th>-->
<!--        <th scope="col">{{$t("taxClass")}}</th>-->
<!--        <th scope="col">{{$t("taxGroup")}}</th>-->
<!--        <th scope="col">{{$t("taxRate")}}</th>-->
<!--        <th>-->
<!--          {{$t("edit")}}-->
<!--          <img src="/pencil.svg" alt="Edit" width="16" height="16">-->
<!--        </th>-->
<!--        <th>-->
<!--          {{$t("delete")}}-->
<!--          <img src="/trash.svg" alt="Delete" width="16" height="16">-->
<!--        </th>-->
<!--      </tr>-->
<!--    </thead>-->
<!--    <tbody class="table-striped">-->
    <div v-for="(allEntriesPerStatementOfAccountId, index) in createStatementOfAccountIdArrays" :key="index">
      <ShowAllEntriesPerStatementOfAccountId :allEntriesPerStatementOfAccountId="allEntriesPerStatementOfAccountId" />
    </div>
<!--    </tbody>-->
<!--  </table>-->
</template>
<script>
import StartBalance from "@/components/StartBalance.vue";
import showAllEntriesPerStatementOfAccountId from "@/components/ShowAllEntriesPerStatementOfAccountId.vue";

export default {
    name: "ShowAllEntries",
    components: {
      ShowAllEntriesPerStatementOfAccountId: showAllEntriesPerStatementOfAccountId,
      StartBalance
    },
    props: ["allEntries"],
    data() {
      return {
        isSortedAscending: true
      }
    },
    computed: {
      createStatementOfAccountIdArrays: function() {
        // Use reduce to group the objects by month
        const statementOfAccountIdArrays = this.allEntries.reduce((acc, obj) => {
          // Get the statementOfAccountId from the statementOfAccountId attribute
          const statementOfAccountId = obj.statementOfAccountId;

          // If the statementOfAccountId doesn't exist in the accumulator, create a new array for it
          if (!acc[statementOfAccountId]) {
            acc[statementOfAccountId] = [];
          }

          // Push the object into the corresponding month array
          acc[statementOfAccountId].push(obj);

          return acc;
        }, {});
        console.log(Object.values(statementOfAccountIdArrays))
        // Convert the monthlyArrays object into an array of arrays
        return Object.values(statementOfAccountIdArrays);
      }
    },
    methods: {
      sortByDate() {
        if (this.allEntries.length > 1) {
          this.isSortedAscending = this.allEntries[0].date < this.allEntries[1].date;
        }
        if (this.isSortedAscending) {
          return this.allEntries.sort((a, b) => new Date(b.date) > new Date(a.date));
        } else {
          return this.allEntries.sort((a, b) => new Date(b.date) < new Date(a.date));
        }
      }
    }
  }
</script>

<!--<style>-->
<!--  .table-striped tr:nth-child(2n+1) {-->
<!--    background-color: #f2f2f2;-->
<!--  }-->
<!--</style>-->