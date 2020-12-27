<template>
  <div class="home-page fillcontain">

    <!-- 侧边栏 -->
    <el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%; border: 1px;" background-color="#324057" text-color="#fff"
                 active-text-color="#ffd04b" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="readerList">读者列表</el-menu-item>
						<el-menu-item index="bookList">图书列表</el-menu-item>
						<el-menu-item index="orderList">借书列表</el-menu-item>
						<el-menu-item>管理员列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
            <el-menu-item index="addReader">添加读者</el-menu-item>
            <el-menu-item index="addAuthor">添加作者</el-menu-item>
            <el-menu-item index="addBookInfo">添加图书信息</el-menu-item>
						<el-menu-item index="addBook">添加图书</el-menu-item>
            <el-menu-item index="boreBook">借书还书</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="readerMap">读者分布</el-menu-item>
            <el-menu-item index="bookMap">图书数据</el-menu-item>
            <el-menu-item index="orderMap">借书详情</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="textEdit">文本编辑</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item>管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item>说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>


			<el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>


		</el-row>
  </div>

</template>


<script>
export default {
  computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '')
			}
		},
}

</script>



<style lang="less" scoped>
@import '../style/mixin.less';
.home-page{

}

</style>
