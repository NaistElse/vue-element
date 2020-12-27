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
      this.axios.get('echarts/getReader/').then((response) => {
        if(response.data['status'] == 0) {
          var regdate = []
          var count = []
          response.data['data'].forEach(item => {
            regdate.push(item.regdate)
            count.push(item.count)
          })
          mycharts.setOption({
             title: {
              text: '一个月内读者每日注册数量'
            },
            xAxis: {
                type: 'category',
                data: regdate
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
