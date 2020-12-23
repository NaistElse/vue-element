<template>
  <div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>图书馆后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item>
				    <el-button type="primary" @click="submitForm()" class="submit_btn">登陆</el-button>
				  </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="gotoreg()" class="submit_btn">注册</el-button>
          </el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      showLogin: false,
      loginForm: {
					username: '',
					password: '',
			},
			rules: {
				username: [
			    { required: true, message: '请输入用户名', trigger: 'blur' },
			  ],
				password: [
				  { required: true, message: '请输入密码', trigger: 'blur' }
				],
			},

    }
  },
  mounted() {
    this.showLogin = true
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm() {
      this.axios.post('user/login/', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then((response) => {
        if(response.data['status'] == 0) {
          this.$message({
            type: 'success',
            message: response.data['message']
          })
          this.changeLogin({ token: response.data['token'] })
          this.$router.push('home')
        }else {
          this.$message({
            type: 'danger',
            message: response.data['message']
          })
        }
      })

    },
    gotoreg() {
      this.$router.push('reg')
    }
  }

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
