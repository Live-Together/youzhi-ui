<template>
  <div id="app">
    <div id="filter">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="item">
            科目：&nbsp;&nbsp;&nbsp;<el-radio-group v-model="majorVariety">
              <el-radio :label="1">文科</el-radio>
              <el-radio :label="2">理科</el-radio>
            </el-radio-group>
          </div>

          <div class="item">
            高考分数： &nbsp;
            <el-input v-model="score" style="width: 40%"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">
            学校类别：&nbsp;&nbsp;
            <el-select v-model="schoolVariety" placeholder="可选" clearable>
              <el-option
                v-for="item in schoolVarietyFilter"
                :key="item"
                :value="item"
                :label="switchSchoolVariety(item)"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-button
              type="primary"
              style="margin-left: 30px; width: 200px"
              @click="handelSearch"
              >搜索</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="list">
      <el-table
        :data="tableList"
        style="width: 90%; margin: 0 auto"
        v-loading="loading"
      >
        <el-table-column style="width: 100%">
          <template slot-scope="scope">
            <el-row :gutter="20">
              <!-- <el-col :span="4">&nbsp;</el-col> -->
              <el-col :span="4">
                <el-image :src="scope.row.logo" style="width: 100px"></el-image>
              </el-col>
              <el-col :span="16">
                <div style="margin-top: 20px">
                  <b style="font-size: 25px">{{ scope.row.schoolName }}</b>
                </div>
                <div style="margin-top: 15px">
                  {{ switchMajorVariety(scope.row.majorVariety) }} |
                  {{ switchSchoolVariety(scope.row.schoolVariety) }} |
                  {{ scope.row.majorName }}&nbsp;&nbsp;&nbsp;&nbsp;最低分：{{
                    scope.row.scoreLine
                  }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getSchoolByScore } from "@/api/school/push";
export default {
  data() {
    return {
      loading: false,
      majorVariety: "",
      score: "",
      schoolVarietyFilter: [1, 2, 3, 4, 5],
      schoolVariety: "",
      tableList: [],
    };
  },
  created() {
    this.handelSearch();
  },
  methods: {
    switchSchoolVariety(number) {
      switch (number) {
        case 1:
          return "985院校";
        case 2:
          return "211院校";
        case 3:
          return "普通一本院校";
        case 4:
          return "普通二本院校";
        case 5:
          return "专科院校";
      }
    },

    switchMajorVariety(number) {
      switch (number) {
        case 2:
          return "文科";
        case 1:
          return "理科";
        case 3:
          return "文/理科";
      }
    },

    handelSearch() {
      this.loading = true;
      const query = {
        schoolVariety: this.schoolVariety,
        majorVariety: this.majorVariety,
        score: this.score,
      };
      getSchoolByScore(query).then((res) => {
        this.tableList = res.data.data;
        this.loading = false;
      });
    },
  },
};
</script>


<style scoped>
#app {
  margin: 0 auto;
  height: 83.7vh;
  /* position: fixed?; */
  width: 60%;
  border-left: 1px solid;
  border-right: 1px solid;
  padding-left: 50px;
}

.item {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style>