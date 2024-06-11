<template>
  <div
    id="container"
    :style="{
      backgroundImage: 'url(' + bgImage + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100vw',
    }"
  >
    <div id="app">
      <div id="left">
        <span id="text1">优志网</span>
        <span id="text2">v1.0.0</span>
        <span id="text3">学途优选，梦聚志愿</span>
      </div>
      <div id="right">
        <div id="enter">
          <span id="hello">欢迎登陆</span>
          <el-form
            label-position="top"
            class="demo-ruleForm"
            :rules="rules"
            ref="ruleForm"
            :model="ruleForm"
          >
            <el-form-item label="账号" prop="studentId" size="mini">
              <el-input
                placeholder="请输入账号"
                v-model="ruleForm.studentId"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" size="mini">
              <el-input
                placeholder="请输入密码"
                v-model="ruleForm.password"
                show-password
                required
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm"
                style="width: 80%; padding: 8px; margin-left: 30px"
                >登录</el-button
              >
              <el-button
                type="text"
                style="width: 100%; padding: 0; height: 20px; margin: auto"
                >没有账号？去注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import { login } from "@/api/login.js";

export default {
  data() {
    return {
      ruleForm: {
        studentId: "",
        password: "",
      },
      rules: {
        studentId: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
      },
      bgImage: require("@/assets/login.jpeg"),
    };
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          login(this.ruleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("登陆成功");
              window.sessionStorage.setItem("user", this.ruleForm.studentId);
              this.$store.commit("setToken", res.data.data.token)
              this.$router.push("/Home");
            } else {
              this.$message.error("账号或密码错误");
            }
          });
        }
      });
    },
  },
};
</script>
  <style scoped>
#app {
  height: 600px;
  width: 900px;
  margin: 10px;
}

#container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#left {
  width: 50%;
  background-color: #569bfa;
  opacity: 80%;
  height: 100%;
  float: left;
}

#right {
  background-color: white;
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hello {
  font-size: 30px;
  font-weight: bolder;
  color: #006eff;
  height: 60px;
  display: block;
}
.el-form-item >>> .el-form-item__label {
  font-size: 12px;
  height: 20px;
  padding: 0;
}
#enter {
  width: 300px;
}
#text1,
#text2,
#text3 {
  color: white;
}
#text1 {
  font-size: 36px;
  display: block;
  margin: 20px;
  margin-bottom: 10px;
}
#text2 {
  margin-left: 23px;
  display: block;
}

#text3 {
  display: block;
  font-family: YouShe;
  font-size: 32px;
  margin-top: 460px;
  margin-left: 158px;
}
</style>