<template>
  <div>
    <el-container style="padding: 10px 70px">
      <el-card style="width: 850px; align-content: center">
        <div slot="header">
          <i class="el-icon-edit-outline"></i>
          <span style="margin-left: 5px">修改密码</span>
          <el-button
            type="primary"
            style="float: right"
            @click="handleUpdate"
            >{{ msg }}</el-button
          >
        </div>
        <div style="padding: 30px 60px; width: 500px">
          <el-form
            label-position="left"
            label-width="130px"
            ref="passwordForm"
            :model="student"
            :rules="passwordRules"
          >
            <el-form-item label="原密码" prop="password">
              <el-input
                v-model="student.password"
                placeholder="请输入原密码"
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                maxlength="16"
                v-model="student.newPassword"
                placeholder="请输入新密码"
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPassword">
              <el-input
                maxlength="16"
                v-model="student.checkPassword"
                placeholder="请再次输入新密码"
                :disabled="isEdit"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { updatePwd } from "@/api/person/personInfo";

export default {
  name: "PersonPassword",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.student.newPassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      isEdit: true,
      msg: "修 改",
      student: {},
      passwordRules: {
        password: [
          {
            required: true,
            message: "请输入原密码",
            trigger: ["blur", "change"],
          },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: ["blur", "change"],
          },
        ],
        checkPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {
    this.getStudentId();
  },
  methods: {
    //获取登录学生id
    getStudentId() {
      this.student.studentId = sessionStorage.getItem("user");
    },

    //更新学生信息
    handleUpdate() {
      if (this.msg === "修 改") {
        this.msg = "确 认";
        this.isEdit = false;
      } else {
        this.msg = "修 改";
        this.isEdit = true;
        //在后端进行修改并发送请求
        updatePwd(this.student).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },
  },
};
</script>

<style></style>