<template>
  <div class="header-container">

    <el-header style="text-align: right; font-size: 12px; background-color: rgb(238, 241, 246)">
      <el-breadcrumb separator="/" class="daohang" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown>

        <div class="avator block"><el-avatar icon="el-icon-user-solid" :size="40"></el-avatar></div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>

  </div>


</template>


<script>

</script>


<style lang="less" scoped>
@import '../style/mixin.less';
.header-container{
  height: 60px;
  width: 100%;
  position: relative;
  .daohang{
    width: 60%;
    position: absolute;
    top: 35%;
  }
  .avator{
    position: absolute;
    right: 30px;

  }

}
</style>
