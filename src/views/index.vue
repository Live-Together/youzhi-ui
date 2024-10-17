
<template>
  <el-container>
  <el-header height="140px">
    <div id="top">
      <span id="youzhi">优志网</span>
      <el-button size="medium" type="info" plain style="float: right;margin-top: 20px;margin-right: 40px;font-size: 20px;" @click="clickLogOut">登出</el-button>
    </div>
    <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#00A9FF"
    text-color="#fff"
    router
    active-text-color="#ffd04b">
      <el-menu-item index="/Home">志愿指南</el-menu-item>
      <el-menu-item index="/SchoolQuery">优选高校</el-menu-item>
      <el-menu-item index="/MajorQuery">智择专业</el-menu-item>
      <el-menu-item index="/SchoolPush">智推高校</el-menu-item>
      <el-menu-item index="/SchoolApply">模拟填报</el-menu-item>
      <el-menu-item index="/PersonInfo">个人信息</el-menu-item>
    </el-menu>

  </el-header>
  <el-main>
    <router-view/>
  </el-main>
</el-container>
</template>

<script>
import Cookies from 'js-cookie'
import { logout } from "@/api/login.js";

export default {
  methods: {
    clickLogOut() {
      logout().then(() => {
        this.$store.commit("setToken", null);
        Cookies.remove("token");
      })
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
  .el-header{
    line-height: 60px;
    padding: 0px;
     background-color: #E9EBEB; 
  }
  #top{
    width: auto;
    margin: 0 auto;
    height: 80px;
  }
  .el-menu{
    padding-left: 10px;
  }
  .el-menu-item{
    text-align: center;
    width: 16.5%;
    font-size: 20px;
  }
  #youzhi{
    font-family: YouShe;
    font-size: 30px;
    line-height: 80px;
    margin-left: 30px;
  }
  .el-main{
    padding-top: 0;
    padding-bottom: 0;
  }
</style>