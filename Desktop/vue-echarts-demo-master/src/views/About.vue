<!--
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-07-22 23:32:12
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2022-07-22 23:59:42
-->
<template>
  <div style="display: flex; justify-content: center">
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: 'About',
  mounted() {
    let chartDom = document.getElementById('main')
    let myChart = this.$echarts.init(chartDom)
    let option

    this.$nextTick(function () {
      option = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false,
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
            ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
            ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
          ],
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {
              focus: 'self',
            },
            label: {
              formatter: '{b}: {@2012} ({d}%)',
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012',
            },
          },
        ],
      }
      myChart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)',
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          })
        }
      })
      myChart.setOption(option)
    })

    option && myChart.setOption(option)
  },
}
</script>

<style scoped>
#main {
  height: 800px;
  width: 90vw;
}
</style>
