<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="addreader-contain">
      <el-form :model="dataform" :rules="rules" class="addreader-form" label-width="100px" >
        <el-form-item label="读者姓名" prop="readername">
          <el-input v-model="dataform.readername"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="readerphone">
          <el-input v-model="dataform.readerphone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="readeridentity">
          <el-input v-model="dataform.readeridentity"></el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="regdate">
          <el-date-picker v-model="dataform.regdate" type="date" placeholder="选择日期"></el-date-picker>
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
    var checkphone = (rule, value, callback) => {
      var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if(!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    var checkidentity = (rule, value, callback) => {
      var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(!reg.test(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
    return {
      dataform: {
        readername: '',
        readerphone: '',
        readeridentity: '',
        regdate: ''

      },
      rules: {
        readername: [
          { required: true, message: '请输入读者姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        readerphone: [
          {required: true, message: '请输入读者手机号', trigger: 'blur'},
          {validator: checkphone, trigger: 'blur'}
        ],
        readeridentity: [
          {required: true, message: '请输入读者身份证号码', trigger: 'blur'},
          {validator: checkidentity, trigger: 'blur'}
        ],
        regdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }

    }
  },
  components: {
    headTop
  },
  created() {
    //do something after creating vue instance

  },
  methods: {
    submitForm() {
      this.axios.post('reader/readerList/', {
        name: this.dataform.readername,
        phone: this.dataform.readerphone,
        identity: this.dataform.readeridentity,
        regdate: this.$moment(this.dataform.regdate).format("YYYY-MM-DD")
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.dataform.readername = ''
          this.dataform.readerphone = ''
          this.dataform.readeridentity = ''
          this.dataform.regdate = ''
        }else {
          this.$message({
            type: 'error',
            message: response.data['message']
          })
        }
      })

    },

  }
}

</script>


<style lang="less" scoped>
@import '../style/mixin.less';
.addreader-contain{
  position: relative;
  padding: 50px 50px 50px 50px;
  .addreader-form{
    width: 400px;
    left: 25%;
    position: relative;
  }

}

</style>
