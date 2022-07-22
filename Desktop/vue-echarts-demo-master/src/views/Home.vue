<!--
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-07-22 23:32:12
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2022-07-23 00:18:12
-->
<template>
  <div style="display:flex; justify-content: center;">
    <div id="main">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
     const chartDom = document.getElementById('main')
     const myChart = this.$echarts.init(chartDom,'westeros');
     let option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  },
  methods: {

  }
}
</script>


<style scoped>
  #main {
    height: 500px;
    width: 500px;
  }
</style>
