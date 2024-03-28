<template>
    <el-container style="height: 100vh;">
        <!--侧边框-->
        <el-aside width="200px" style=" box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
            <el-menu :default-openeds="['1', '3']" router 
            class="el-menu-vertical-demo" 
            style="height:200px; padding-top: 10px;">
                <el-menu-item index="/PersonInfo" style="width: 100%; padding-left: 0;" @click="getStudentId">
                    <i class="el-icon-user"></i>
                    <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="/PersonPassword" style="width: 100%; padding-left: 0;">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">修改密码</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!--表格-->
        <el-container>
            <router-view />
        </el-container>
    </el-container>
</template>
<script>

export default {
    name: 'PersonInfo',
    
};
</script>

<style scoped>
.el-main {
    padding: 0px;
}
</style>
