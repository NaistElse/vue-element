<template>
  <div class="fillcontain">
    <headTop></headTop>

    <div class="">
      <div id="chartColumn" style="width: 100%; height: 400px;">

      </div>
    </div>


  </div>
</template>

<script>
import headTop from'../components/headerTop.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    headTop
  },
  created() {

  },
  methods: {
    drawLine() {
      var mycharts = this.$echarts.init(document.getElementById('chartColumn'))
      mycharts.setOption({
        title: {
             text: '每日图书馆状态'
         },
         tooltip: {
             trigger: 'axis'
         },
         legend: {
             data: ['新增读者', '新增订单']
         },
         grid: {
             left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
         },
         toolbox: {
             feature: {
                 saveAsImage: {}
             }
         },
         xAxis: {
             type: 'category',
             boundaryGap: false,
             data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
         },
         yAxis: {
             type: 'value'
         },
         series: [
             {
                 name: '新增读者',
                 type: 'line',
                 stack: '总量',
                 data: [120, 132, 101, 134, 90, 230, 210]
             },
             {
                 name: '新增订单',
                 type: 'line',
                 stack: '总量',
                 data: [220, 182, 191, 234, 290, 330, 310]
             }

         ]
      })
    },


  },
  mounted() {
    this.drawLine()
  },
}
</script>

<style lang="less">
@import '../style/mixin.less';
</style>
