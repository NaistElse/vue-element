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
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="图书ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="ISBN">
                <span>{{ props.row.isbn }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="出版社">
                <span>{{ props.row.publisher }}</span>
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
        <el-table-column width=180 label="作者" prop="author"></el-table-column>
        <el-table-column width=180 label="藏书位置" prop="position"></el-table-column>
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
        layout="prev, pager, next"
        :total="100">
      </el-pagination>



      <!-- 修改图书信息对话框 -->
      <el-dialog title="修改图书信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable" ref="form" label-width="80px">
          <el-form-item label="图书名称">
            <el-input v-model="selectTable.name"></el-input>
          </el-form-item>
          <el-form-item label="图书作者">
            <el-input v-model="selectTable.author"></el-input>
          </el-form-item>
          <el-form-item label="图书种类/出版社">
            <el-select v-model="selectTable.category" placeholder="请选择图书种类">
              <el-option label="计算机" value="computer"></el-option>
              <el-option label="医学" value="doctor"></el-option>
            </el-select>
            <el-select v-model="selectTable.publisher" placeholder="请选择图书出版社">
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
      datalist: [
        {
          id: 1,
          name: '计算机算法设计与分析',
          author: '王晓东',
          publisher: '电子工业出版社',
          category: '计算机',
          isbn: '978-7-121-34439-8',
          price: 52,
          desc: '本书是“十二五”普通高等教育本科国家级规划教材和国家精品课程教材。',
          position: '总馆-采访编目室',
          count: 23
        },
        {
          id: 2,
          name: '编译原理',
          author: '王晓东',
          publisher: '电子工业出版社',
          category: '计算机',
          isbn: '978-7-121-34439-8',
          price: 32,
          desc: '本书是“十二五”普通高等教育本科国家级规划教材和国家精品课程教材。',
          position: '总馆-采访编目室',
          count: 3
        },
        {
          id: 3,
          name: '计算机网络',
          author: '王晓东',
          publisher: '电子工业出版社',
          category: '计算机',
          isbn: '978-7-121-34439-8',
          price: 22,
          desc: '本书是“十二五”普通高等教育本科国家级规划教材和国家精品课程教材。',
          position: '总馆-采访编目室',
          count: 9
        },
        {
          id: 4,
          name: '计算机算法设计与分析',
          author: '王晓东',
          publisher: '电子工业出版社',
          category: '计算机',
          isbn: '978-7-121-34439-8',
          price: 52,
          desc: '本书是“十二五”普通高等教育本科国家级规划教材和国家精品课程教材。',
          position: '总馆-采访编目室',
          count: 23
        },
        {
          id: 5,
          name: '计算机算法设计与分析',
          author: '王晓东',
          publisher: '电子工业出版社',
          category: '计算机',
          isbn: '978-7-121-34439-8',
          price: 52,
          desc: '本书是“十二五”普通高等教育本科国家级规划教材和国家精品课程教材。',
          position: '总馆-采访编目室',
          count: 23
        }
      ],
      dialogFormVisible: false,
      dialogCountVisible: false,
      selectTable: {},
      selectCount: {}

    }
  },
  created() {
    //do something after creating vue instance

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
            this.selectCount.position = item.position
            this.selectCount.count = item.count
          }
        }
      })
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
