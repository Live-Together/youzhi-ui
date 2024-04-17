<template>
  <div>
    <div id="main">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            v-model="schoolInfo.schoolName"
            class="inline-input"
            prefix-icon="el-icon-search"
            placeholder="请输入学校名称"
            @blur="getAllMajor"
          ></el-input>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="schoolInfo.majorName"
            filterable
            placeholder="专业名称"
            clearable
          >
            <el-option v-for="item in majorFilter" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleSubmit">填 报</el-button>
        </el-col>
      </el-row>
      <span style="font-size: 14px; color: red">注：每人限报八个志愿</span>
    </div>
    <div id="foot">
      <el-table :data="tableData" stripe size="medium" v-loading="loading">
        <el-table-column type="index" label="序号" align="center">
          <template #default="scope">
            <!-- 设置序号 -->
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in menu"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index + 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getMajorNameBySchoolName, schoolSubmit, deleteSchoolSubmit, getSchoolSubmitById } from "@/api/school/apply";

export default {
  name: "SchoolApply",
  data() {
    return {
      loading: true,
      studentId: "",
      schoolInfo: {
        schoolName: "",
        majorName: "",
      },
      menu: [
        {
          label: "学校代码",
          prop: "schoolId",
        },
        {
          label: "学校名称",
          prop: "schoolName",
        },
        {
          label: "专业代码",
          prop: "majorId",
        },
        {
          label: "专业名称",
          prop: "majorName",
        },
        {
          label: "招收对象",
          prop: "majorVariety",
        },
        {
          label: "报考人数",
          prop: "count",
        },
      ],
      tableData: [],
      majorFilter: [],
    };
  },
  methods: {
    getAllMajor() {
      if (this.schoolInfo.schoolName === "") return;
      getMajorNameBySchoolName(this.schoolInfo).then((res) => {
        if (res.data.code === 200) {
          this.majorFilter = res.data.data;
        } else {
          this.$message.error("该学校不存在");
        }
      });
      this.schoolInfo.majorName = "";
    },
    handleSubmit() {
      if (
        this.schoolInfo.majorName === "" ||
        this.schoolInfo.schoolName === ""
      ) {
        this.$message.error("填报失败：未选择学校/专业");
        return;
      }
      if (this.tableData.length >= 8) {
        this.$message.error("您的志愿已填报完毕，请勿过多填报！");
        return;
      }
      let isReapet = this.tableData.every((item) => {
        return (
          item.majorName !== this.schoolInfo.majorName ||
          item.schoolName !== this.schoolInfo.schoolName
        );
      });
      if (!isReapet) {
        this.$message.error("填报失败：重复填报");
        return;
      }

      schoolSubmit(this.schoolInfo).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.majorVariety = this.switchMajorVariety(item.majorVariety);
          return item;
        });
      });
    },
    handleDelete(row) {
      let x = {
        ...this.tableData[row - 1],
      };
      x.majorVariety = this.backMajorVariety(x.majorVariety);
      deleteSchoolSubmit(x).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.majorVariety = this.switchMajorVariety(item.majorVariety);
          return item;
        });
      });
    },
    switchMajorVariety(number) {
      switch (number) {
        case 2:
          return "文科生";
        case 1:
          return "理科生";
        case 3:
          return "文/理科生";
      }
    },
    backMajorVariety(majorVariety) {
      switch (majorVariety) {
        case "文科生":
          return 1;
        case "理科生":
          return 2;
        case "文/理科生":
          return 3;
      }
    },
  },
  mounted() {
    getSchoolSubmitById().then((res) => {
      this.tableData = res.data.data.map((item) => {
        item.majorVariety = this.$options.methods.switchMajorVariety(
          item.majorVariety
        );
        return item;
      });
      this.loading = false;
    });
  },
};
</script>

<style scoped>
#main {
  margin: 0 auto;
  width: 50vw;
  height: auto;
  padding: 30px;
}

#foot {
  width: 80vw;
  margin: 0 auto;
  height: auto;
}
</style>