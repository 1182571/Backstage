<template>
  <div class="charts" ref="echarts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["activename"],
  data() {
    return {
      myecharts: null,
    };
  },
  watch: {
    activename() {
      this.myecharts.setOption({
        title: {
          text: this.activename + "趋势",
        },
      });
    },
  },
  mounted() {
    this.myecharts = echarts.init(this.$refs.echarts);
    this.myecharts.setOption({
      title: {
        text: this.activename + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 23, 312, 241, 412, 43],
          color: "yellowgreen",
        },
      ],
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>
