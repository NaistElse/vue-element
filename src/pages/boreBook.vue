<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="borebook-contain">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="借书" name="first">
          <el-form :model="borrowForm" ref="borrowForm" label-width="100px" class="borebook-form">
            <el-form-item prop="readeridentity" label="读者身份证号" >
              <el-input v-model="borrowForm.readeridentity"></el-input>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in borrowForm.domains"
              :label="'图书' + (index+1)"
              :key="domain.key"
              :prop="'domains.' + index + '.bookid'">

              <div class="grid-content bg-purple">
                <el-input v-model="domain.bookid" style="width:300px;float:left;margin-right:10px;"></el-input>
                <el-input-number v-model="domain.count" controls-position="right" :min="1" :max="10" style="width:100px;margin-right:10px;position:absolute;"></el-input-number>
                <el-button type="danger" @click.prevent="removeborrowDomain(domain)" style="margin-left:110px;position:absolute;">删除</el-button>
              </div>


            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitborrowForm('borrowForm')">提交</el-button>
              <el-button @click="addborrowDomain">新增借阅图书</el-button>
              <el-button @click="resetForm('borrowForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>


        <el-tab-pane label="还书" name="second">
          <el-form :model="returnForm" ref="returnForm" label-width="100px" class="borebook-form">
            <el-form-item prop="readeridentity" label="读者身份证号" >
              <el-input v-model="returnForm.readeridentity" style="width:300px;float:left;margin-right:10px;"></el-input>
              <el-button type="primary" @click="queryorder" style="position:absolute;">查询</el-button>
            </el-form-item>

            <el-table :data="orderlist" v-show="isborrow" class="borebook-table">
              <el-table-column label="#" prop="order_id"></el-table-column>
              <el-table-column label="借阅书籍" prop="book_name"></el-table-column>
              <el-table-column label="借阅数量" prop="count"></el-table-column>
              <el-table-column label="借阅时间" prop="borrow_date"></el-table-column>
            </el-table>

            <div class="returnbook" v-show="isborrow">
              <el-form-item v-for="(domain, index) in returnForm.domains" :label="'图书' + (index+1)" :key="domain.key" :prop="'domains.' + index + '.bookid'">
                <div class="grid-content bg-purple">
                  <el-input v-model="domain.bookid" style="width:200px;float:left;margin-right:10px;"></el-input>
                  <el-input-number v-model="domain.count" controls-position="right" :min="1" :max="10" style="width:100px;margin-right:10px;position:absolute;"></el-input-number>
                  <el-button type="danger" @click.prevent="removereturnDomain(domain)" style="margin-left:110px;position:absolute;">删除</el-button>
                </div>
              </el-form-item>
              <el-form-item width="500">
                <el-button type="primary" @click="submitreturnForm('returnForm')">提交</el-button>
                <el-button @click="addreturnDomain">添加所还图书</el-button>
                <el-button @click="resetForm('returnForm')">重置</el-button>
              </el-form-item>

            </div>




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
    return {
      activeName: 'first',
      isborrow: false,
      borrowForm: {
        domains: [
          {
            bookid: '',
            count: 1
          }
        ],
        readeridentity: ''
      },
      returnForm: {
        domains: [
          {
            bookid: '',
            count: 1
          }

        ],
        readeridentity: ''
      },
      orderlist: [

      ]

    }
  },
  created() {

  },
  components: {
    headTop
  },
  methods: {
    submitborrowForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('order/borrow/', {
            readeridentity: this.borrowForm.readeridentity,
            domains: this.borrowForm.domains
          }).then((response) => {
            if(response.data['status'] == 0) {
              this.$message({
                type: 'success',
                message: response.data['message']
              })
              this.$refs[this.borrowForm].resetFields()
            }else if(response.data['status'] == 2) {
              this.$message({
                type: 'warning',
                message: response.data['message']
              })
            }else {
              this.$message({
                type: 'error',
                message: response.data['message']
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitreturnForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('order/return/', {
            readeridentity: this.returnForm.readeridentity,
            domains: this.returnForm.domains
          }).then((response) => {
            if(response.data['status'] == 0) {
              this.$message({
                type: 'success',
                message: response.data['message']
              })
              this.queryorder()
            }else if(response.data['status'] == 2) {
              this.$message({
                type: 'warning',
                message: response.data['message']
              })
            }else {
              this.$message({
                type: 'error',
                message: response.data['message']
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeborrowDomain(item) {
      var index = this.borrowForm.domains.indexOf(item)
      if (index !== -1) {
        this.borrowForm.domains.splice(index, 1)
      }
    },
    removereturnDomain(item) {
      var index = this.returnForm.domains.indexOf(item)
      if (index !== -1) {
        this.returnForm.domains.splice(index, 1)
      }
    },
    addborrowDomain() {
      this.borrowForm.domains.push({
        bookid: '',
        count: ''
      })
    },
    addreturnDomain() {
      this.returnForm.domains.push({
        bookid: '',
        count: ''
      })
    },
    queryorder() {
      this.axios.get('order/orderinfo/',
        {
          params: {reader_identity: this.returnForm.readeridentity}
        }).then((response) => {
          if(response.data['status'] == 0) {
            this.isborrow = true
            this.orderlist = response.data['order_list']
          }else {
            this.isborrow = false
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
.borebook-contain{
  position: relative;
  padding: 50px 50px 50px 50px;
  .borebook-form{
    width: 400px;
    left: 5%;
    position: relative;
    .borebook-input{
      width:300px;
      float:left;
      margin-right: 10px;
    }
    .borebook-delete{
      float: left;
    }
    .borebook-table{
      width: 600px;
      float: left;
    }
  }
  .returnbook{
    left: 95%;
    width: 100%;
    position: absolute;
  }
}
</style>
