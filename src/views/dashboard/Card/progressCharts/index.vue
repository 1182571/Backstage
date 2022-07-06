<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "lineCharts",
  mounted() {
    //初始化echarts  可以获取dom
    let lineCharts = echarts.init(this.$refs.echarts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        //最大值最小值
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      //系列
      series: [
        {
          type: "bar",
          data: [78],
          barWidth: "10px",
          color: "yellowgreen",
          //  背景颜色
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            formatter: "|",
            position: "right",
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
