<template>
  <div class="fillcontain">
    <headTop></headTop>

    <div class="">
      <div id="charBookCategory" style="width: 100%; height: 400px;">

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
      var mycharts = this.$echarts.init(document.getElementById('charBookCategory'))
      this.axios.get('echarts/getBook/').then((response) => {
        if(response.data['status'] == 0) {
          mycharts.setOption({
            backgroundColor: '#2c343c',

            title: {
                text: '图书种类饼图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: response.data['data'].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
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
