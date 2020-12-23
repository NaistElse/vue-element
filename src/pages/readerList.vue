<template>
  <div class="fillcontain">
    <headTop></headTop>

    <!-- 读者信息 -->
    <div class="reader-contain">
      <el-table :data="datalist" class="reader-table" stripe border style="width: 100%">
        <el-table-column prop="id" label="#" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="regdate" label="注册日期"></el-table-column>
        <el-table-column prop="status" label="借还状态" :filters="[{ text: '未借阅', value: '未借阅' }, { text: '借阅中', value: '借阅中' }]"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === false ? 'success' : 'danger'"
              disable-transitions>{{scope.row.status === false ? '未借阅' : '借阅中'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">修改信息</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>

        </el-table-column>

      </el-table>

      <el-pagination class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>

    </div>





  </div>

</template>

<script>
import headTop from'../components/headerTop.vue'

export default{
  data() {
    return {
      datalist: [],
      count: 10,
      currentPage: 1,
      pagesize: 0
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
      this.axios.get('reader/readerList/', {params: {page: this.currentPage}}).then((response) => {
        //console.log(response.data['readers'])
        if(response.data['status'] == 0) {
          this.datalist = JSON.parse(response.data['readers'])
          this.count = response.data['count']
          this.pagesize = response.data['page_size']
        }

      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getReaderList()
    },

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
