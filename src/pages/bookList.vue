<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="book-contain">
      <el-table
        :data="datalist"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="图书作者">
                <span>{{ props.row.author_name }}</span>
              </el-form-item>
              <el-form-item label="图书ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="ISBN">
                <span>{{ props.row.isbn }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="出版社">
                <span>{{ props.row.publisher_name }}</span>
              </el-form-item>
              <el-form-item label="图书价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="图书简介">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column width=50 label="#" prop="id"></el-table-column>
        <el-table-column width=200 label="图书" prop="name"></el-table-column>
        <el-table-column width=180 label="作者" prop="author_name"></el-table-column>
        <el-table-column width=180 label="藏书位置" prop="position_name"></el-table-column>
        <el-table-column width=90 label="库存" prop="count"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.id)" size="mini" type="primary">修改图书</el-button>
            <el-button @click="handleEditCount(scope.row.id)" size="mini" type="warning">修改库存</el-button>
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



      <!-- 修改图书信息对话框 -->
      <el-dialog title="修改图书信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable" ref="form" label-width="80px">
          <el-form-item label="图书名称">
            <el-input v-model="selectTable.name"></el-input>
          </el-form-item>
          <el-form-item label="图书作者">
            <el-input v-model="selectTable.author_name"></el-input>
          </el-form-item>
          <el-form-item label="图书种类/出版社">
            <el-select v-model="selectTable.category_name" placeholder="请选择图书种类">
              <el-option label="计算机" value="computer"></el-option>
              <el-option label="医学" value="doctor"></el-option>
            </el-select>
            <el-select v-model="selectTable.publisher_name" placeholder="请选择图书出版社">
              <el-option label="人民出版社" value="renmin"></el-option>
              <el-option label="北京大学出版社" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图书价格">
            <el-input-number v-model="selectTable.price" :precision="2" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="ISBN">
            <el-input v-model="selectTable.isbn"></el-input>
          </el-form-item>
          <el-form-item label="图书简介">
            <el-input v-model="selectTable.desc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
             <el-button type="primary">修改</el-button>
             <el-button>取消</el-button>
           </el-form-item>
        </el-form>
      </el-dialog>


      <!-- 修改图书库存/藏书位置对话框 -->
      <el-dialog title="修改图书库存" :visible.sync="dialogCountVisible">
        <el-form :model="selectCount" ref="form" label-width="80px">
          <el-form-item label="藏书位置">
            <el-input v-model="selectCount.position"></el-input>
          </el-form-item>
          <el-form-item label="图书库存">
            <el-input-number v-model="selectCount.count" :min="0" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item>
             <el-button type="primary">修改</el-button>
             <el-button>取消</el-button>
           </el-form-item>
        </el-form>
      </el-dialog>







    </div>
  </div>

</template>

<script>
import headTop from '../components/headerTop.vue'
export default {
  data() {
    return {
      datalist: [],
      dialogFormVisible: false,
      dialogCountVisible: false,
      selectTable: {},
      selectCount: {},
      count: 10,
      currentPage: 1,
      pagesize: 0

    }
  },
  created() {
    //do something after creating vue instance
    this.getBookList()

  },
  components: {
    headTop
  },
  methods: {
    handleEdit(id) {
      this.getSelectItemData(id, 'editInfo')
      this.dialogFormVisible = true
    },
    handleEditCount(id) {
      this.getSelectItemData(id, 'editCount')
      this.dialogCountVisible = true
    },
    getSelectItemData(id, operat) {
      this.datalist.forEach((item) => {
        if(item.id == id) {
          if(operat == 'editInfo') {
            this.selectTable = item
          }else if(operat == 'editCount') {
            this.selectCount.position = item.position_name
            this.selectCount.count = item.count
          }
        }
      })
    },
      getBookList() {
      this.axios.get('book/bookList/', {params: {page: this.currentPage}}).then((response) => {
        //console.log(response.data['readers'])
        if(response.data['status'] == 0) {
          this.datalist = JSON.parse(response.data['book'])
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
      this.getBookList()
    },
  }
}

</script>


<style lang="less" scoped>
@import '../style/mixin.less';
.demo-table-expand {
   font-size: 0;
   .el-form-item {
     margin-right: 0;
     margin-bottom: 0;
     width: 50%;
     color: #99a9bf;
     label {
       width: 90px;
     }
   }
 }
 .pagination{
   margin-top: 20px;
   margin-left: 25%;
 }


</style>
