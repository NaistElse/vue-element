<template>
  <div class="fillcontain">
    <headTop></headTop>

    <!-- 读者信息 -->
    <div class="reader-contain">
      <el-table :data="datalist" class="reader-table" stripe border style="width: 100%">
        <el-table-column prop="id" label="#" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="phonenumber" label="联系电话"></el-table-column>
        <el-table-column prop="regdate" label="注册日期"></el-table-column>
        <el-table-column prop="status" label="借还状态" :filters="[{ text: '未借阅', value: '未借阅' }, { text: '借阅中', value: '借阅中' }]"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === 0 ? 'success' : 'danger'"
              disable-transitions>{{scope.row.status === 0 ? '未借阅' : '借阅中'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="pagination"
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>

    </div>





  </div>

</template>

<script>
import headTop from'../components/headerTop.vue'

export default{
  data() {
    return {
      datalist: [
        {
          id: 1,
          name: '小明',
          phonenumber: 1234332112,
          regdate: '2019-10-21',
          status: 0
        },
        {
          id: 2,
          name: '小明',
          phonenumber: 1234332112,
          regdate: '2019-10-21',
          status: 1
        },
        {
          id: 3,
          name: '小明',
          phonenumber: 1234332112,
          regdate: '2019-10-21',
          status: 0
        },
        {
          id: 4,
          name: '小明',
          phonenumber: 1234332112,
          regdate: '2019-10-21',
          status: 1
        },
        {
          id: 6,
          name: '小明',
          phonenumber: 1234332112,
          regdate: '2019-10-21',
          status: 0
        }
      ]

    }
  },
  components: {
    headTop
  },
  created() {
    this.getReaderList()

  },
  methods: {
    filterTag(value, row) {
        return row.tag === value
    },
    getReaderList() {
      this.axios.get('http://127.0.0.1:8000/reader/getReaderList').then((response) => {
        //console.log(response.data['readers'])
        this.datalist = JSON.parse(response.data['readers'])
      })
    }
  }
}
</script>


<style lang="less" scoped>
@import '../style/mixin.less';
.reader-contain{
  width: 100%;
  position: relative;
  top: 20px;
  .pagination{
    margin-top: 20px;
    margin-left: 25%;
  }
}

</style>
