<template>
  <div class="fillcontain">
    <headTop></headTop>


    <div class="addbook-contain">
      <el-form :model='dataform' class="addbook-form" label-width="100px">
        <el-form-item label="图书名称">
          <el-input v-model="dataform.bookname"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="dataform.bookauthor"></el-input>
        </el-form-item>
        <el-form-item label="图书出版社">
          <el-select v-model="dataform.bookpublisher" filterable placeholder="请选择">
            <el-option
              v-for="item in options[0].data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图书类别">
          <el-select v-model="dataform.bookcategory" filterable placeholder="请选择">
            <el-option
              v-for="item in options[1].data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架日期">
          <el-date-picker v-model="dataform.bookupdate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="图书价格">
          <el-input-number v-model="dataform.price" :precision="2" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="图书简介">
          <el-input v-model="dataform.bookdesc" type="textarea" placeholder="请输入图书简介"></el-input>
        </el-form-item>
        <el-form-item label="图书封面">
          <el-upload class="avatar-uploader" action="">
            <img v-if="dataform.bookimgurl" :src="dataform.bookimgurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
           <el-button type="primary">确定</el-button>
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
          data: [
            {value: 1, label: '清华大学出版社'},
            {value: 2, label: '北京大学出版社'},
            {value: 3, label: '电子工业出版社'},
            {value: 4, label: '机械工业出版社'},
            {value: 5, label: '上海外语教育出版社'}
          ]
        },
        {
          type: 'category',
          data: [
            {value: 1, label: '计算机类'},
            {value: 2, label: '医学类'},
            {value: 3, label: '机械类'},
            {value: 4, label: '文学类'},
            {value: 5, label: '杂志类'}
          ]
        }
      ],
      dataform: {
        bookname: '',
        bookauthor: '',
        bookpublisher: '',
        bookcategory: '',
        bookdesc: '',
        price: '',
        bookupdate: '',
        bookimgurl: ''
      }



    }
  },
  components: {
    headTop
  },
  created() {
    //do something after creating vue instance

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
