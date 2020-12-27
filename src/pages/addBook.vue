<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="addbook-contain">
      <el-form :model='dataform' :rules="rules" class="addbook-form" label-width="100px">
        <el-form-item label="图书名称" prop="bookname">
          <el-input v-model="dataform.bookname"></el-input>
        </el-form-item>
        <el-form-item label="图书作者" prop="bookauthor">
          <el-input v-model="dataform.bookauthor"></el-input>
        </el-form-item>
        <el-form-item label="图书出版社" prop="bookpublisher">
          <el-select v-model="dataform.bookpublisher" filterable placeholder="请选择">
            <el-option
              v-for="item in options[0].data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图书类别" prop="bookcategory">
          <el-select v-model="dataform.bookcategory" filterable placeholder="请选择">
            <el-option
              v-for="item in options[1].data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="藏书位置" prop="bookposition">
          <el-select v-model="dataform.bookposition" filterable placeholder="请选择">
            <el-option
              v-for="item in options[2].data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架日期" prop="bookupdate">
          <el-date-picker v-model="dataform.bookupdate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="图书价格" prop="bookprice">
          <el-input-number v-model="dataform.bookprice" :precision="2" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="图书库存" prop="bookcount">
          <el-input-number v-model="dataform.bookcount" :precision="0" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="图书简介" prop="bookdesc">
          <el-input v-model="dataform.bookdesc" type="textarea" placeholder="请输入图书简介"></el-input>
        </el-form-item>
        <el-form-item label="图书封面">
          <el-upload class="avatar-uploader" action="">
            <img v-if="dataform.bookimgurl" :src="dataform.bookimgurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="submitForm()">确定</el-button>
           <el-button>取消</el-button>
         </el-form-item>


      </el-form>

    </div>

  </div>

</template>


<script>
import headTop from'../components/headerTop.vue'
export default {
  data() {
    return {
      options: [
        {
          type: 'publisher',
          data: []
        },
        {
          type: 'category',
          data: []
        },
        {
          type: 'position',
          data: []
        }
      ],
      dataform: {
        bookname: '',
        bookauthor: '',
        bookpublisher: '',
        bookcategory: '',
        bookposition: '',
        bookdesc: '',
        bookprice: '',
        bookcount: '',
        bookupdate: '',
        bookimgurl: ''
      },
      rules: {
        bookname: [
          { required: true, message: '请输入图书', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        bookauthor: [
          { required: true, message: '请输入作者姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        bookpublisher: [
          { required: true, message: '请选择图书出版社', trigger: 'change' }
        ],
        bookcategory: [
          { required: true, message: '请选择图书种类', trigger: 'change' }
        ],
        bookposition: [
          { required: true, message: '请选择图书藏书位置', trigger: 'change' }
        ],
        bookupdate: [
          { type: 'date', required: true, message: '请选择上架日期', trigger: 'change' }
        ],
        bookprice: [
          { required: true, message: '图书价格不能为空'},
          { type: 'number', message: '图书价格必须为数字'}
        ],
        bookcount: [
          { required: true, message: '图书库存不能为空'},
          { type: 'number', message: '图书库存必须为数字'}
        ],
        bookdesc: [
          { required: true, message: '请填写图书简介', trigger: 'blur' }
        ]
      }



    }
  },
  components: {
    headTop
  },
  created() {
    //do something after creating vue instance
    this.getBookPublisher(),
    this.getBookCategory(),
    this.getbookPosition()

  },
  methods: {
    getBookPublisher() {
      this.axios.get('book/bookPublisherList/').then((response) => {
        if(response.data['status'] == 0) {
          JSON.parse(response.data['publisherlist']).forEach((item) => {
            var obj = {}
            obj.value = item.id
            obj.label = item.name
            this.options[0].data.push(obj)
          })

        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }
      })
    },
    getBookCategory() {
      this.axios.get('book/bookCategoryList/').then((response) => {
        if(response.data['status'] == 0) {
          JSON.parse(response.data['categorylist']).forEach((item) => {
            var obj = {}
            obj.value = item.id
            obj.label = item.name
            this.options[1].data.push(obj)
          })
        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }
      })
    },
    getbookPosition() {
      this.axios.get('book/bookPositionList/').then((response) => {
        if(response.data['status'] == 0) {
          JSON.parse(response.data['bookposition']).forEach((item) => {
            var obj = {}
            obj.value = item.id
            obj.label = item.address
            this.options[2].data.push(obj)
          })
        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }
      })
    },
    submitForm() {
      this.axios.post('book/bookList/', {
        name: this.dataform.bookname,
        author: this.dataform.bookauthor,
        category_id: this.dataform.bookcategory,
        publisher_id: this.dataform.bookpublisher,
        position_id: this.dataform.bookposition,
        price: this.dataform.bookprice,
        desc: this.dataform.bookdesc,
        count: this.dataform.bookcount
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.$router.go(0)
        }else if(response.data['status'] == 2){
          this.$message({
            type: 'warning',
            message: response.data['message']
          })
          this.$router.push('addAuthor')
        }else {
          this.$message.error(response.data['message'])
        }
      })

    }
  }
}

</script>


<style lang="less" scoped>
@import '../style/mixin.less';
.addbook-contain{
  position: relative;
  padding: 50px 50px 50px 50px;
  .addbook-form{
    width: 400px;
    left: 25%;
    position: relative;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>
