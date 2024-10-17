<template>
  <div style="padding-top: 20px">
    <div>
      <el-form inline>
        <el-form-item
          ><el-input
            v-model="target.schoolName"
            placeholder="输入学校名称"
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
            v-model="target.majorName"
            filterable
            placeholder="专业名称"
            clearable
          >
            <el-option
              v-for="item in filter.majorName"
              :key="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="target.year"
            filterable
            placeholder="年份"
            clearable
          >
            <el-option v-for="item in filter.year" :key="item" :value="item">
            </el-option>
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
            ></el-option
          ></el-select>
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
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-row :gutter="5">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            plain
            @click="handleAdd"
            >新增</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDelete"
            >删除</el-button
          >
        </el-col>
        <!-- <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
        v-hasPermi="['system:activity:edit']">修改</el-button> -->
      </el-row>
    </div>
    <div class="table">
      <el-table
        v-loading="isLoading"
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
    <el-dialog :visible.sync="open" title="新增院校分数线" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="schoolId" label="学校代码">
          <el-input v-model.number="form.schoolId" placeholder="请输入学校代码" type="number" oninput="value = value.replace(/[^0-9]/g,'' )"></el-input>
        </el-form-item>
        <el-form-item prop="schoolName" label="学校名称">
          <el-input v-model="form.schoolName" placeholder="请输入学校名称"></el-input>
        </el-form-item>
        <el-form-item prop="majorId" label="专业代码">
          <el-input v-model="form.majorId" placeholder="请输入专业代码" type="number" oninput="value = value.replace(/[^0-9]/g,'' )"></el-input>
        </el-form-item>
        <el-form-item prop="majorName" label="专业名称">
          <el-input v-model="form.majorName" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item prop="year" label="年份">
          <el-input v-model="form.year" placeholder="请输入年份" type="number" oninput="value = value.replace(/[^0-9]/g,'' )"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="schoolVariety" label="学校类别">
              <el-select
                v-model="form.schoolVariety"
                placeholder="学校类别"
                clearable
              >
                <el-option
                  v-for="item in filter.schoolVariety"
                  :key="item"
                  :value="item"
                  :label="switchSchoolVariety(item)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="majorVariety" label="专业类别">
              <el-select
                v-model="form.majorVariety"
                placeholder="招收对象"
                clearable
              >
                <el-option
                  v-for="item in filter.majorVariety"
                  :key="item"
                  :value="item"
                  :label="switchMajorVariety(item)"
                ></el-option
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>

        
        <el-form-item prop="scoreLine" label="投档分数线">
          <el-input v-model="form.scoreLine" placeholder="请输入投档分数线" type="number" oninput="value = value.replace(/[^0-9]/g,'' )"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageLimit from "./PageLimit";
import {
  getSchoolInfoCount,
  getSchoolInfoBySchoolName,
  getSchoolInfo,
  addSchoolInfo,
  deleteSchoolInfo
} from "@/api/school/query";

export default {
  data() {
    return {
      rules: {
        schoolId: { required: true, message: "请输入学校代码", trigger: "blur" },
        schoolName: { required: true, message: "请输入学校名称", trigger: "blur" },
        schoolVariety: { required: true, message: "请选择学校类别", trigger: "blur" },
        majorId: { required: true, message: "请输入专业代码", trigger: "blur" },
        majorName: { required: true, message: "请输入专业名称", trigger: "blur" },
        majorVariety: { required: true, message: "请选择专业类别", trigger: "blur" },
        year: { required: true, message: "请输入年份", trigger: "blur" },
        scoreLine: { required: true, message: "请输入分数线", trigger: "blur" },
      },
      form: {},
      open: false,
      target: {
        schoolName: "",
        majorName: "",
        year: "",
        majorVariety: "",
        schoolVariety: "",
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
          label: "学校类别",
          prop: "schoolVariety",
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
      ids: [],
      tableData: [],
      schoolInfoTotal: [],
      total: 0,
      isLoading: false,
      filter: {
        majorName: [],
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
    handleDelete() {
      deleteSchoolInfo(this.ids).then(res => {
        if(res.data.code == 200) {
          this.$message.success("操作成功")
          this.handleSearch()
        }
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if(valid) {
          // console.log(this.$message);
          addSchoolInfo(this.form).then(res => {
            if(res.data.code == 200) {
              this.open = false
              this.$message.success("操作成功")
            }
            
          })
        }
      })
    },
    handleAdd() {
      this.form = {}
      this.open = true
    },
    handleSearch() {
      this.$store.commit("changePageIndex", 1);
      this.getSchoolInfo();
      getSchoolInfoCount(this.target).then((res) => {
        this.total = res.data.data;
      });

      // 获取过滤条件
      if (this.target.schoolName !== null && this.target.schoolName !== "") {
        getSchoolInfoBySchoolName(this.target).then((res) => {
          this.schoolInfoTotal = res.data.data;
          [this.filter.majorName, this.filter.year, this.filter.majorVariety] =
            [[], [], []];
          this.schoolInfoTotal.map((item) => {
            this.filter.majorName.push(item.majorName);
            this.filter.year.push(item.year);
            this.filter.majorVariety.push(item.majorVariety);
            this.target.schoolVariety = item.schoolVariety;
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
      const query = {
        ...this.target,
        pageIndex: this.pageIndex,
      };
      getSchoolInfo(query).then((res) => {
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
::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
::v-deep input[type="number"] {
    -moz-appearance: textfield !important;
}
</style>