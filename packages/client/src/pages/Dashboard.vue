<template lang="pug">
q-page.flex.flex-center.column
  h3 Overview
  h4 Get some more sleep.
  .chart-background(:class="platform")
    #chart
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  name: "Dashboard",
  data() {
    return {
      blinkData: [],
    };
  },
  computed: {
    platform() {
      if (this.$q.platform.is.mobile) {
        return "mobile";
      } else {
        return "web";
      }
    },
  },
  methods: {
    async getBlinkData() {
      try {
        const response = await this.$axios.post(
          "https://driftrserver.herokuapp.com/getData",
          {
            username: this.$store.state.signedIn,
          }
        );
        this.blinkData = response.data;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    blinkData() {
      const x = [];
      const y = [];
      this.blinkData.forEach((element) => {
        x.push(element.time);
        y.push(element.bps);
      });
      const options = {
        chart: {
          type: "line",
        },
        series: [
          {
            name: "Blinks/Min",
            data: x,
          },
        ],
        xaxis: {
          categories: y,
        },
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();
    },
  },
  mounted() {
    this.getBlinkData();
  },
};
</script>

<style scoped>
.chart-background {
  background-color: white;
  padding: 20px;
  border-radius: 40px;
}
.android {
  width: 90%;
}
.web {
  width: 50%;
}
h3,
h4 {
  line-height: 0;
}
</style>
