<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="addbookinfo-contain">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="添加图书出版社" name="first">
          <el-form :model="publisherform" :rules="publisherrules" label-width="100px" class="addbookinfo-form">
            <el-form-item label="出版社名称" prop="publishername">
              <el-input v-model="publisherform.publishername"></el-input>
            </el-form-item>
            <el-form-item label="出版社地址" prop="publisheraddress">
              <el-input v-model="publisherform.publisheraddress"></el-input>
            </el-form-item>
            <el-form-item label="出版社网站" prop="publisherwebsite">
              <el-input v-model="publisherform.publisherwebsite"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="submitpublisherForm()">确定</el-button>
               <el-button>取消</el-button>
             </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="添加图书种类" name="second">
          <el-form :model="categoryform" :rules="categoryrules" label-width="100px" class="addbookinfo-form">
            <el-form-item label="种类名称" prop="categoryname">
              <el-input v-model="categoryform.categoryname"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="submitcategoryForm()">确定</el-button>
               <el-button>取消</el-button>
             </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="添加藏书位置" name="third">
          <el-form :model="positionform" :rules="positionrules" label-width="100px" class="addbookinfo-form">
            <el-form-item label="藏书地址" prop="positionaddress">
              <el-input v-model="positionform.positionaddress"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="submitpositionForm()">确定</el-button>
               <el-button>取消</el-button>
             </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>


</template>

<script>
import headTop from'../components/headerTop.vue'
export default {
  data() {
    var checkwebsite = (rule, value, callback) => {
      var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
      if(!reg.test(value)) {
        callback(new Error('请输入正确的网站地址'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      publisherform: {
        publishername: '',
        publisheraddress: '',
        publisherwebsite: ''
      },
      categoryform: {
        categoryname: ''
      },
      positionform: {
        positionaddress: ''
      },
      publisherrules: {
        publishername: [
          { required: true, message: '请输入出版社名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        publisheraddress: [
          { required: true, message: '请输入出版社地址', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        publisherwebsite: [
          {required: true, message: '请输入出版社网站地址', trigger: 'blur'},
          {validator: checkwebsite, trigger: 'blur'}
        ]
      },
      categoryrules: {
        categoryname: [
          { required: true, message: '请输入图书种类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      positionrules: {
        positionaddress: [
          { required: true, message: '请输入图书种藏书地址', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }

    }
  },
  components: {
    headTop
  },
  created() {
  },
  methods: {
    submitpublisherForm() {
      this.axios.post('book/bookPublisherList/', {
        name: this.publisherform.publishername,
        address: this.publisherform.publisheraddress,
        website: this.publisherform.publisherwebsite
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.publisherform.publishername = ''
          this.publisherform.publisheraddress = ''
          this.publisherform.publisherwebsite = ''
        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }

      })

    },
    submitcategoryForm() {
      this.axios.post('book/bookCategoryList/', {
        name: this.categoryform.categoryname,
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.categoryform.categoryname = ''
        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }
      })
    },
    submitpositionForm() {
      this.axios.post('book/bookPositionList/', {
        address: this.positionform.positionaddress,
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.positionform.positionaddress = ''
        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
@import '../style/mixin.less';
.addbookinfo-contain{
  position: relative;
  padding: 50px 50px 50px 50px;
  .addbookinfo-form{
    width: 400px;
    left: 5%;
    position: relative;
  }


}
</style>
