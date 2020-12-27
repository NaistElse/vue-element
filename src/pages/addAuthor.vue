<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="addauthor-contain">
      <el-form :model="dataform" :rules="rules" class="addauthor-form" label-width="100px" >
        <el-form-item label="作者姓名" prop="authorname">
          <el-input v-model="dataform.authorname"></el-input>
        </el-form-item>
        <el-form-item label="作者邮箱" prop="authoremail">
          <el-input v-model="dataform.authoremail"></el-input>
        </el-form-item>
        <el-form-item label="作者性别" prop="authorsex">
          <el-radio-group v-model="dataform.authorsex">
            <el-radio-button label="男士"></el-radio-button>
            <el-radio-button label="女士"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="作者生日" prop="authorbirthday">
          <el-date-picker v-model="dataform.authorbirthday" type="date" placeholder="选择日期"></el-date-picker>
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
    var checkemail = (rule, value, callback) => {
      var reg = /^[a-z0-9][\w.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/
      if(!reg.test(value)) {
        callback(new Error('请输入正确的邮箱号'))
      } else {
        callback()
      }
    }
    return {
      dataform: {
        authorname: '',
        authorsex: 1,
        authoremail: '',
        authorbirthday: ''
      },
      rules: {
        authorname: [
          { required: true, message: '请输入作者姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        authorsex: [
          { required: true, message: '请作者性别', trigger: 'change' }
        ],
        authoremail: [
          {required: true, message: '请输入作者邮箱号', trigger: 'blur'},
          {validator: checkemail, trigger: 'blur'}
        ],
        authorbirthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }

    }
  },
  methods: {
    submitForm() {
      this.axios.post('book/bookAuthorList/', {
        name: this.dataform.authorname,
        sex: this.dataform.authorsex,
        email: this.dataform.authoremail,
        birthday: this.$moment(this.dataform.authorbirthday).format("YYYY-MM-DD")
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.$router.go(0)
        }else {
          this.$message({
            type: 'danger',
            message: response.data['message']
          })
        }

      })


    }

  },
  components: {
    headTop
  },
  created() {
    //do something after creating vue instance

  },
}
</script>

<style lang="less" scoped>
@import '../style/mixin.less';
.addauthor-contain{
  position: relative;
  padding: 50px 50px 50px 50px;
  .addauthor-form{
    width: 400px;
    left: 25%;
    position: relative;
  }

}

</style>
