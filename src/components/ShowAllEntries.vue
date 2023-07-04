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
    <div v-for="(allEntriesPerMonth, index) in createMonthlyArrays" :key="index">
      <ShowAllEntriesPerMonth :allEntriesPerMonth="allEntriesPerMonth" />
    </div>
<!--    </tbody>-->
<!--  </table>-->
</template>
<script>
import ShowAllEntriesPerMonth from "@/components/ShowAllEntriesPerMonth.vue";
import StartBalance from "@/components/StartBalance.vue";

export default {
    name: "ShowAllEntries",
    components: {
      ShowAllEntriesPerMonth,
      StartBalance
    },
    props: ["allEntries"],
    data() {
      return {
        isSortedAscending: true
      }
    },
    computed: {
      createMonthlyArrays: function() {
        // Use reduce to group the objects by month
        const monthlyArrays = this.allEntries.reduce((acc, obj) => {
          // Get the month and year components from the date attribute
          const month = new Date(obj.date).getMonth();
          const year = new Date(obj.date).getFullYear();

          // Create a unique key for the month and year
          const key = `${year}-${month}`;

          // If the key doesn't exist in the accumulator, create a new array for it
          if (!acc[key]) {
            acc[key] = [];
          }

          // Push the object into the corresponding month array
          acc[key].push(obj);

          return acc;
        }, {});
        console.log(Object.values(monthlyArrays))
        // Convert the monthlyArrays object into an array of arrays
        return Object.values(monthlyArrays);
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