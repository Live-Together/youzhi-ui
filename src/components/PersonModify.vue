<template>
  <div>
    <el-container style="padding: 10px 70px">
      <el-card style="width: 850px; align-content: center">
        <div slot="header">
          <i class="el-icon-user"></i>
          <span style="margin-left: 5px">个人信息</span>
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
            ref="studentForm"
            :model="student"
            :rules="studentRules"
            v-loading="loading"
          >
            <el-form-item label="用户ID" prop="studentId">
              <el-input v-model="student.studentId" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="student.username" :readonly="edit"></el-input>
            </el-form-item>
            <el-form-item label="学生姓名" prop="studentName">
              <el-input
                v-model="student.studentName"
                :readonly="edit"
              ></el-input>
            </el-form-item>
            <el-form-item label="分数" prop="score">
              <el-input v-model="student.score" :readonly="edit"></el-input>
            </el-form-item>
            <el-radio v-model="student.subject" label="1" :disabled="edit"
              >文科生</el-radio
            >
            <el-radio v-model="student.subject" label="2" :disabled="edit"
              >理科生</el-radio
            >
          </el-form>
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { updateInfo, getStudentInfo } from "@/api/person/personInfo";

export default {
  name: "PersonModify",
  data() {
    return {
      msg: "修 改",
      edit: true,
      student: {
        studentId: "",
        username: "",
        studentName: "",
        score: "",
        subject: "",
      },
      loading: false,
      studentRules: {},
    };
  },
  methods: {
    //更新学生信息
    handleUpdate() {
      if (this.msg === "修 改") {
        this.msg = "确 认";
        this.edit = false;
      } else {
        this.$refs["studentForm"].validate(valid => {
          if(valid) {
            updateInfo(this.student).then((res) => {
              this.msg = "修 改";
              this.edit = true;
              if (res.data.code === 200) {
                this.$message.success("修改成功");
              } else {
                this.$message.error("修改失败");
              }
            });
          }
        })
        //在后端进行修改并发送请求

      }
    },

    switchMajorVariety(number) {
      switch (number) {
        case 1:
          return "文科生";
        case 2:
          return "理科生";
        case 3:
          return "文/理科生";
      }
    },
  },
  mounted() {
    this.loading = true;
    getStudentInfo().then((res) => {
      if (res.data.code === 200) {
        this.student = res.data.data
        this.student.subject = res.data.data.subject + "";
        this.loading = false;
      }
    });
  },
};
</script>

<style>
</style>