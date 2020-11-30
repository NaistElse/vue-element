<template>
  <div class="fillcontain">
    <headTop></headTop>

    <div class="order-contain">
      <el-table :data="datalist" style="width: 100%">
        <el-table-column label="#" prop="id"></el-table-column>
        <el-table-column label="读者姓名" prop="borrow_name"></el-table-column>
        <el-table-column label="借阅书籍" prop="borrow_book"></el-table-column>
        <el-table-column label="借阅时间" prop="borrow_date"></el-table-column>
        <el-table-column label="还书时间" prop="return_date"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="借阅状态" :filters="[{ text: '已完成', value: '已完成' }, { text: '借阅中', value: '借阅中' }]"
                         :filter-method="filterStatus" filter-placement="bottom-end">
           <template slot-scope="scope">
           <el-tag
               :type="scope.row.return_date ? 'success' : 'danger'"
               disable-transitions>{{scope.row.return_date ? '已完成' : '借阅中'}}</el-tag>
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
import headTop from '../components/headerTop.vue';
export default {
  data() {
    return {
      datalist: [
        {
          id: 1222,
          borrow_name: "小明",
          borrow_book: "编译原理",
          borrow_date: "2020-10-22",
          return_date: "2020-11-23",
          remark: "无"
        },
        {
          id: 1223,
          borrow_name: "小明",
          borrow_book: "计算机网络",
          borrow_date: "2020-10-22",
          return_date: "2020-11-23",
          remark: "无"
        },
        {
          id: 1224,
          borrow_name: "小明",
          borrow_book: "计算机算法与分析",
          borrow_date: "2018-10-22",
          return_date: "2020-11-23",
          remark: "无"
        },
        {
          id: 1225,
          borrow_name: "小明",
          borrow_book: "编译原理",
          borrow_date: "2020-10-22",
          return_date: "",
          remark: "无"
        },
        {
          id: 1226,
          borrow_name: "小明",
          borrow_book: "编译原理",
          borrow_date: "2020-10-02",
          return_date: "2020-11-23",
          remark: "无"
        },
        {
          id: 1227,
          borrow_name: "小明",
          borrow_book: "编译原理",
          borrow_date: "2020-07-22",
          return_date: "2020-11-23",
          remark: "无"
        }
      ]

    }
  },
  created() {
    //do something after creating vue instance

  },
  components: {
    headTop
  },
  methods: {
    filterStatus(value, row) {
      let status = row.return_date ? '已完成' : '借阅中'
      return status === value

    }
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
