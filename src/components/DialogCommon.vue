<template>
  <div>
    <el-dialog
      :visible="dialogShow"
      :title="showTitle(this.schoolVariety)"
      width="65%"
      @close="handleClose"
    >
      <el-table :data="tableList" stripe style="width: 100%">
        <el-table-column
          v-for="item in schoolList"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      schoolList: [
        {
          label: "学校代码",
          prop: "schoolId",
        },
        {
          label: "学校名称",
          prop: "schoolName",
        },
        {
          label: "文科最低分",
          prop: "scoreSocial",
        },
        {
          label: "理科最低分",
          prop: "scoreNatural",
        },
        {
          label: "学校类别",
          prop: "schoolVariety",
        },
      ],
    };
  },
  props: {
    dialogShow: {
      type: Boolean,
      default: false,
    },
    schoolVariety: {
      type: Number,
    },
  },
  methods: {
    handleClose() {
      this.$emit("updata:dialogShow", false);
    },
    showTitle(number) {
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
  },
  computed: {
    tableList() {
      return this.$store.state.schoolList;
    },
  },
};
</script>