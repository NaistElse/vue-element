<template>
  <div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>图书馆后台管理系统</p>
		  		</div>
		    	<el-form :model="regForm" :rules="rules">
					<el-form-item prop="username">
						<el-input v-model="regForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" v-model="regForm.password" placeholder="密码"></el-input>
					</el-form-item>
          <el-form-item prop="repassword">
						<el-input type="password" v-model="regForm.repassword" placeholder="再次确认密码"></el-input>
					</el-form-item>
					<el-form-item>
				    <el-button type="primary" @click="submitForm()" class="submit_btn">注册</el-button>
				  </el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>

</template>

<script>
export default {
  data() {
    return {
      showLogin: false,
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
				username: [
			    { required: true, message: '请输入用户名', trigger: 'blur' },
			  ],
				password: [
				  { required: true, message: '请输入密码', trigger: 'blur' }
				],
        repassword: [
				  { required: true, message: '请输入密码', trigger: 'blur' }
				]
			},

    }
  },
  methods: {
    submitForm() {

    }
  },
  mounted() {
    this.showLogin = true
  },

}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.login_page{
  background-color: #324057;
}
.manage_tip{
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p{
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer{
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn{
    width: 100%;
    font-size: 16px;
  }
}
.tip{
  font-size: 12px;
  color: red;
}
.form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
</style>
