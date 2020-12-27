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
  methods: {
    drawLine() {
      var mycharts = this.$echarts.init(document.getElementById('chartColumn'))
      this.axios.get('echarts/getOrder/').then((response) => {
        if(response.data['status'] == 0) {
          var borrowdate = []
          var count = []
          response.data['data'].forEach(item => {
            borrowdate.push(item.borrow_date)
            count.push(item.count)
          })
          mycharts.setOption({
             title: {
              text: '一个月内每日订单数量'
            },
            xAxis: {
                type: 'category',
                data: borrowdate
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: count,
                type: 'line'
            }],
            legend: {
              data: ['value']
            },
            tooltip: {},
          })

        }
      })

    },

  },
  mounted() {
    this.drawLine()
  },


}
</script>

<style lang="less" scoped>
@import '../style/mixin.less';
</style>
