<template>
  <div style="padding-top: 20px">
    <el-form inline>
      <el-form-item>
        <el-input
          v-model="target.majorName"
          placeholder="输入专业名称"
          @keyup.enter.native="handleSearch"
        >
          <template #suffix>
            <el-button
              type="text"
              icon="el-icon-search"
              id="search"
              @click="handleSearch"
            ></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="target.year"
          filterable
          placeholder="年份"
          clearable
        >
          <el-option
            v-for="item in filter.year"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="target.majorVariety"
          placeholder="招收对象"
          clearable
        >
          <el-option
            v-for="item in filter.majorVariety"
            :key="item"
            :value="item"
            :label="switchMajorVariety(item)"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="target.schoolVariety"
          placeholder="学校类别"
          clearable
        >
          <el-option
            v-for="item in filter.schoolVariety"
            :key="item"
            :value="item"
            :label="switchSchoolVariety(item)"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="table">
      <el-table
        v-loading="isLoading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column label="序号" width="90%">
          <template #default="scope">
            <!-- 设置序号 -->
            <span>{{ (pageIndex - 1) * 10 + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in menu"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
        </el-table-column>
      </el-table>
    </div>

    <page-limit :total="total"></page-limit>
  </div>
</template>

<script>
import { getSchoolInfoByMajorName } from "@/api/major/query";
import { getSchoolInfoCount, getSchoolInfo } from "@/api/school/query";
import PageLimit from "./PageLimit";
export default {
  data() {
    return {
      target: {
        majorName: "",
        year: "",
        majorVariety: "",
        schoolVariety: "",
      },
      menu: [
        {
          label: "专业代码",
          prop: "majorId",
        },
        {
          label: "专业名称",
          prop: "majorName",
        },
        {
          label: "学校代码",
          prop: "schoolId",
        },
        {
          label: "学校名称",
          prop: "schoolName",
        },
        {
          label: "学校类别",
          prop: "schoolVariety",
        },
        {
          label: "年份",
          prop: "year",
        },
        {
          label: "招收对象",
          prop: "majorVariety",
        },
        {
          label: "投档分数线",
          prop: "scoreLine",
        },
      ],
      tableData: [],
      schoolInfoTotal: [],
      total: 0,
      isLoading: false,
      filter: {
        year: ["2022", "2021", "2020", "2019"],
        majorVariety: [1, 2, 3],
        schoolVariety: [1, 2, 3, 4, 5],
      },
    };
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    handleSearch() {
      this.$store.commit("changePageIndex", 1);
      this.getSchoolInfo();
      getSchoolInfoCount(this.target).then((res) => {
        this.total = res.data.data;
      });

      // 获取过滤条件
      if (this.target.majorName !== null && this.target.majorName !== "") {
        let params = {
          majorName: this.target.majorName,
        };
        getSchoolInfoByMajorName(params).then((res) => {
          this.schoolInfoTotal = res.data.data;
          [this.filter.majorName, this.filter.year, this.filter.majorVariety] =
            [[], [], []];
          this.schoolInfoTotal.map((item) => {
            this.filter.majorName.push(item.majorName);
            this.filter.year.push(item.year);
            this.filter.majorVariety.push(item.majorVariety);
          });
          // 数组去重
          this.filter.majorName = [...new Set(this.filter.majorName)];
          this.filter.year = [...new Set(this.filter.year)];
          this.filter.majorVariety = [...new Set(this.filter.majorVariety)];
        });
      } else {
        [
          this.filter.majorName,
          this.filter.year,
          this.filter.majorVariety,
          this.filter.schoolVariety,
        ] = [[], ["2022", "2021", "2020", "2019"], [1, 2, 3], [1, 2, 3, 4, 5]];
      }
    },

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
        case 1:
          return "文科生";
        case 2:
          return "理科生";
        case 3:
          return "文/理科生";
      }
    },

    getSchoolInfo() {
      this.isLoading = true;
      let params = {
        ...this.target,
        pageIndex: this.pageIndex,
      };
      getSchoolInfo(params).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.schoolVariety = this.switchSchoolVariety(item.schoolVariety);
          item.majorVariety = this.switchMajorVariety(item.majorVariety);
          return item;
        });
        this.isLoading = false;
      });
    },
  },
  components: {
    PageLimit,
  },
  computed: {
    pageIndex() {
      return this.$store.state.pageIndex;
    },
  },
  watch: {
    pageIndex: {
      handler() {
        this.isLoading = true;
        this.getSchoolInfo();
        this.isLoading = false;
      },
    },
  },
};
</script>

<style scoped>
.table {
  width: 90vw;
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
}

#search {
  font-size: 22px;
  padding-top: 9px;
  padding-bottom: 9px;
}
</style>