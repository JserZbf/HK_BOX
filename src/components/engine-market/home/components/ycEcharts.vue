<template>
  <div class="chartView" ref="ycRef"></div>
</template>

<script>
import { defineComponent } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "ycEcharts",
  props: {
    id: {
      type: String,
      default: "",
    },
    ref: {
      type: String,
      default: "",
    },
    chartData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.chart("", JSON.parse(JSON.stringify(this.chartData)));
  },
  watch: {
    chartData(newVal, oldVal) {
      this.chart(this.id, JSON.parse(JSON.stringify(newVal)));
    },
  },
  methods: {
    chart(id, data) {
      var that = this;
      that.$nextTick(() => {
        // var chartDom = document.getElementById('wd');
        // let myChart = echarts.init(chartDom);
        // let str = id +'ref';
        let myChart = echarts.getInstanceByDom(this.$refs.ycRef);
        if (myChart == null) {
          myChart = echarts.init(this.$refs.ycRef);
        }
        var option;

        // var wdData = JSON.parse(JSON.stringify(that.wdData));
        const dateList = data.map(function (item) {
          return item[0];
        });
        const valueList = data.map(function (item) {
          return item[1];
        });

        option = {
          tooltip: {
            trigger: "axis",
            triggerOn: "mousemove",
            confine: true,
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return `${params.value}`;
            },
            axisPointer: {
              animation: false,
            },
          },
          xAxis: {
            data: dateList,
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            max: function (value) {
              return value.max;
            },
            min: function (value) {
              return value.min;
            },
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: "Fake Data",
              type: "line",
              showSymbol: false,
              data: valueList,
              itemStyle: {
                normal: {
                  color: "#fff",
                  lineStyle: {
                    color: "#fff",
                  },
                },
              },
            },
          ],
        };
        option && myChart.setOption(option);
      });
    },
  },
});
</script>

<style scoped>
.chartView {
  width: 100%;
  height: 200px;
}
</style>
