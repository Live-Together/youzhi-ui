<template>
  <div>
    <div id="main">
      <i class="el-icon-trophy" style="font-size: 30px; margin: 3px"></i>
      <span id="text">热门高校</span>
      <el-carousel type="card" height="240px">
        <el-carousel-item
          v-for="item in cards"
          :key="item.index"
          interval="2000"
        >
          <el-link :href="item.schoolUrl" target="_blank"
            ><el-image :src="item.logo" style="width: 240px"
          /></el-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="foot">
      <el-row :gutter="20" id="foot-el-row">
        <el-col :span="6" style="padding: 0">
          <div id="sv1">
            <el-col :span="24" style="height: 100%; padding: 0">
              <el-card
                shadow="always"
                style="display: flex; height: 50vh; padding: 30px"
              >
                <img src="/imgs/985.png" id="sv-img1" />
                <span
                  id="text"
                  style="margin-left: 13%"
                  @click="handleClick(1)"
                >
                  985院校
                  <span style="font-size: 27px">
                    <i class="el-icon-d-arrow-right"></i>
                  </span>
                </span>
                <!--对话框-->
                <dialog-common
                  :schoolVariety="schoolVariety"
                  :dialogShow="dialogShow"
                  @updata:dialogShow="dialogShow = $event"
                >
                </dialog-common>
              </el-card>
            </el-col>
          </div>
        </el-col>
        <el-col :span="18" style="height: 100%; padding: 0">
          <el-row style="height: 100%">
            <el-col :span="12" style="height: 100%; padding: 0">
              <div id="sv2">
                <el-col :span="24" id="sv-el-col">
                  <el-card shadow="hover" id="sv-el-card">
                    <img src="/imgs/211.png" id="sv-img2" />
                    <span class="sv-text" @click="handleClick(2)">
                      <span id="text">211院校</span>
                      <span style="margin-left: 15px; font-size: 27px">
                        <i class="el-icon-d-arrow-right"></i>
                      </span>
                    </span>
                    <!--对话框-->
                    <dialog-common
                      :schoolVariety="schoolVariety"
                      :dialogShow="dialogShow"
                      @updata:dialogShow="dialogShow = $event"
                    >
                    </dialog-common>
                  </el-card>
                </el-col>
              </div>
              <div id="sv3">
                <el-col :span="24" id="sv-el-col">
                  <el-card shadow="hover" id="sv-el-card">
                    <img src="/imgs/bk1.png" id="sv-img2" />
                    <span class="sv-text" @click="handleClick(3)">
                      <span id="text">一本院校</span>
                      <span style="margin-left: 15px; font-size: 27px">
                        <i class="el-icon-d-arrow-right"></i>
                      </span>
                    </span>
                    <!--对话框-->
                    <dialog-common
                      :schoolVariety="schoolVariety"
                      :dialogShow="dialogShow"
                      @updata:dialogShow="dialogShow = $event"
                    >
                    </dialog-common>
                  </el-card>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12" style="height: 100%; padding: 0">
              <div id="sv4">
                <el-col :span="24" id="sv-el-col">
                  <el-card shadow="hover" id="sv-el-card">
                    <img src="/imgs/bk2.png" id="sv-img2" />
                    <span class="sv-text" @click="handleClick(4)">
                      <span id="text">二本院校</span>
                      <span style="margin-left: 15px; font-size: 27px">
                        <i class="el-icon-d-arrow-right"></i>
                      </span>
                    </span>
                    <!--对话框-->
                    <dialog-common
                      :schoolVariety="schoolVariety"
                      :dialogShow="dialogShow"
                    >
                    </dialog-common>
                  </el-card>
                </el-col>
              </div>
              <div id="sv5">
                <el-col :span="24" id="sv-el-col">
                  <el-card shadow="hover" id="sv-el-card">
                    <img src="/imgs/zk.png" id="sv-img2" />
                    <span class="sv-text" @click="2(5)">
                      <span id="text">专科院校</span>
                      <span style="margin-left: 15px; font-size: 27px">
                        <i class="el-icon-d-arrow-right"></i>
                      </span>
                    </span>
                    <!--对话框-->
                    <dialog-common
                      :schoolVariety="schoolVariety"
                      :dialogShow="dialogShow"
                      @updata:dialogShow="dialogShow = $event"
                    >
                    </dialog-common>
                  </el-card>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  
<script>
import DialogCommon from "@/components/DialogCommon";
import { getSchoolBySchoolVariety, getAllSchoolShow } from "@/api/school/home";

export default {
  components: { DialogCommon },
  data() {
    return {
      dialogShow: false,
      schoolVariety: 0,
      tableList: [],
      cards: [],
    };
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
    handleClick(schoolVariety) {
      this.dialogShow = true;
      this.schoolVariety = schoolVariety;
      let params = {
        schoolVariety
      }
      getSchoolBySchoolVariety(params).then((res) => {
        res.data.data.map((item) => {
          item.schoolVariety = this.switchSchoolVariety(item.schoolVariety);
          return item;
        });
        this.$store.commit("changeSchoolList", res.data.data);
      });
    },
  },
  computed: {
    schoolList() {
      return this.$store.state.schoolList;
    },
  },
  mounted() {
    getAllSchoolShow().then((res) => {
      this.cards = res.data.data;
    });
  },
};
</script>
  
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
  margin: 0 auto;
  width: 80vw;
  height: auto;
}

#foot {
  padding-top: 40px;
  width: 80vw;
  margin: 0 auto;
  height: auto;
}

#foot-el-row {
  height: auto;
  margin-bottom: 40px;
  outline-style: solid;
  outline-width: 3px;
  outline-color: rgba(154, 154, 154, 0.1);
}

#sv-el-col {
  padding: 0;
  margin: 15px 0px;
}

#sv-el-card {
  display: flex;
  height: 24vh;
}

#sv-img1 {
  width: 100%;
  margin-bottom: 25px;
}

#sv-img2 {
  height: 100%;
  float: left;
  margin-right: 40px;
}

.sv-text {
  position: absolute;
  margin-top: 6%;
}

#text {
  font-family: YouShe;
  font-size: 30px;
  line-height: 55px;
}

#sv2,
#sv3,
#sv4,
#sv5 {
  height: 50%;
  margin: 10px 20px;
}
</style>

