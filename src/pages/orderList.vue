<template>
  <div class="fillcontain">
    <headTop></headTop>

    <div class="order-contain">
      <el-table :data="datalist" style="width: 100%">
        <el-table-column label="#" prop="order_id"></el-table-column>
        <el-table-column label="读者姓名" prop="borrow_name"></el-table-column>
        <el-table-column label="借阅书籍" prop="borrow_book"></el-table-column>
        <el-table-column label="借阅时间" prop="borrow_date"></el-table-column>
        <el-table-column label="还书时间" prop="return_date"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="借阅状态" :filters="[{ text: '已完成', value: '已完成' }, { text: '借阅中', value: '借阅中' }]"
                         :filter-method="filterStatus" filter-placement="bottom-end">
           <template slot-scope="scope">
           <el-tag
               :type="scope.row.order_status ? 'success' : 'danger'"
               disable-transitions>{{scope.row.order_status ? '已完成' : '借阅中'}}</el-tag>
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
import headTop from '../components/headerTop.vue';
export default {
  data() {
    return {
      datalist: [],
      count: 10,
      currentPage: 1,
      pagesize: 0

    }
  },
  created() {
    //do something after creating vue instance
    this.getOrderList()

  },
  components: {
    headTop
  },
  methods: {
    filterStatus(value, row) {
      let status = row.order_status ? '已完成' : '借阅中'
      return status === value

    },
    getOrderList() {
      this.axios.get('order/orderlist/', {params: {page: this.currentPage}}).then((response) => {
        //console.log(response.data['readers'])
        if(response.data['status'] == 0) {
          this.datalist = JSON.parse(response.data['orderlist'])
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
      this.getOrderList()
    },

  }
}

</script>


<style lang="less" scoped>
@import '../style/mixin.less';
.pagination{
  margin-top: 20px;
  margin-left: 25%;
}

</style>
