<template>
  <div id="parent" class="container pt-1 mb-3">
    <div class="mx-4 px-4">
      <p class="text-center fs-2">نمودار فروش ماهانه</p>
      <canvas id="monthchart" class="" height="90"></canvas>
    </div>
  </div>
  <div class="d-flex w-100 ">
    <div class="w-50 mx-4 px-4 mb-1">
      <p class="text-center fs-2">نمودار فروش کتاب ها</p>
      <div class="justify-content-center d-flex my-2">
        <select
          @change="updatebookchart"
          name=""
          ref="bookselect"
          class="form-control w-25"
          id=""
        >
          <option
            v-for="x in booksordersarr"
            class="text-center"
            :key="x"
            :value="x.name"
          >
            {{ x.name }}
          </option>
        </select>
      </div>
      <canvas id="bookschart" class="" height="130" w></canvas>
    </div>
    <div class="d-flex flex-column mx-auto mt-2 mb-1 ">
      <p class="text-center fs-2">نمودار پر فروش ترین کتاب ها</p>
      <canvas id="mostorderschart" class="mt-1"  height="500" ></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { info } from "../../../config/default";

let apiaddress = info.fetch["address"];

export default {
  name: "analyze",
  data() {
    return {
      monthdata: [],
      monthlabel: [],
      booksdata: [],
      bookslabel: [],
      mostorderdata: [],
      mostorderlabel: [],
      booksordersarr: [],
    };
  },
  mounted() {
    this.fetchDatamonthchart();
    this.fetchDatabookchart();
    this.fetchDatamostorders();
  },
  methods: {
    fetchDatamonthchart() {
      axios.get(`${apiaddress}orderstime`).then((res) => {
        res.data.forEach((e) => {
          this.monthdata.push(e.number);
          this.monthlabel.push(`${e.year} ${e.month}`);
        });
        this.renderChartmonth();
      });
    },
    renderChartmonth() {
      const monthctx = document.getElementById("monthchart").getContext("2d");
      new Chart(monthctx, {
        type: "bar",
        data: {
          labels: this.monthlabel,
          datasets: [
            {
              label: "تعداد فروش",
              data: this.monthdata,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    fetchDatabookchart() {
      axios.get(`${apiaddress}bookorders`).then((res) => {
        this.booksordersarr = res.data;

        res.data[0].monthsorders.forEach((e) => {
          this.booksdata.push(e.orders);
          this.bookslabel.push(e.data);
        });

        this.renderChartbook();
      });
    },
    updatebookchart(data) {
      let index = this.booksordersarr.findIndex((e) => {
        return e.name == data.target.value;
      });
      this.booksordersarr[index].monthsorders.forEach((e) => {
        this.booksdata = [];
        this.bookslabel = [];
        this.booksdata.push(e.orders);
        this.bookslabel.push(e.data);
      });
      this.renderChartbook();
    },
    renderChartbook() {
      const bookctx = document.getElementById("bookschart").getContext("2d");

      const chart = Chart.getChart(bookctx);
      if (chart) {
        chart.destroy();
      }
      new Chart(bookctx, {
        type: "line",
        data: {
          labels: this.bookslabel,
          datasets: [
            {
              label: "تعداد فروش",
              data: this.booksdata,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          elements: {
            arc: {},
          },
        },
      });
    },
    fetchDatamostorders() {
      axios.get(`${apiaddress}mostbookorders`).then((res) => {
        console.log(res.data);
        res.data.forEach((e) => {
          this.mostorderlabel.push(`${e.name}`);
          this.mostorderdata.push(e.orders);
        });
        this.renderChartorders();
      });
    },
    renderChartorders() {
      const ordersctx = document
        .getElementById("mostorderschart")
        .getContext("2d");
      new Chart(ordersctx, {
        type: "doughnut",
        data: {
          labels: this.mostorderlabel,
          datasets: [
            {
              label: "تعداد فروش",
              data: this.mostorderdata,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          
        },
      });
    },
  },
};
</script>

<style scoped>
#monthchart {
  width: 400px;
}
#mostorderschart{

}
</style>
