<template>
  <div id="dwv">
    <!-- 头 -->
    <div class="header">
      <el-Header style="margin-bottom: 2px">
        <v-header :headTitle="headTitle"></v-header>
      </el-Header>
    </div>

    <!-- 主体 -->
    <div class="main">
      <!-- Tag抽屉 -->
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :size="size"
        :with-header="false"
      >
        <el-row :md-active.sync="showDicomTags">
          <tagsTable :tagsData="metaData" />
        </el-row>
      </el-drawer>

      <!-- 进度条 -->
      <div style="height: 16px; margin-top: 2px">
        <el-progress
          style="
            font-size: 0.75rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          "
          :text-inside="true"
          :stroke-width="14"
          color="#47c550"
          :percentage="
            parseFloat(((progress * 100) / (organsNames.length - 1)).toFixed(0))
          "
        ></el-progress>
      </div>

      <!-- 功能按键 -->
      <div style="height: 40px; padding-left: 0.5rem; padding-right: 0.5rem">
        <!-- <el-button-group > -->
        <el-row type="flex" justify="center" :gutter="2">
          <!-- 大小 -->
          <el-col :span="6">
            <el-button
              size="small"
              type="primary"
              v-on:click="onChangeTool('ZoomAndPan')"
              :disabled="!dataLoaded"
              >移动大小
            </el-button>
          </el-col>

          <!-- 位宽 -->
          <el-col :span="6">
            <el-button
              size="small"
              type="primary"
              v-on:click="onChangeTool('WindowLevel')"
              :disabled="!dataLoaded"
              >窗位窗宽
            </el-button>
          </el-col>

          <!-- 复位 -->
          <el-col :span="6">
            <el-button
              size="small"
              type="primary"
              v-on:click="onReset()"
              :disabled="!dataLoaded"
              >恢复初始
            </el-button>
          </el-col>

          <!-- Tag -->
          <el-col :span="6">
            <el-button
              size="small"
              type="primary"
              v-on:click="
                showDicomTags = true;
                drawer = true;
              "
              :disabled="!dataLoaded"
              >Tag标签
            </el-button>
          </el-col>
        </el-row>
        <!-- </el-button-group> -->
      </div>

      <!-- 题目：单选 -->
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
        "
        v-if="progress < this.organsNames.length"
      >
        <span v-if="organsNames[progress]" class="subject"
          >【单选】{{ organsNames[progress].name }}</span
        >
      </div>

      <!-- 图片显示框 -->
      <div class="dicAndquiz">
        <div class="layerContainer">
          <canvas class="imageLayer"
            >Only for HTML5 compatible browsers...</canvas
          >
        </div>

        <!-- 选项 -->
        <div>
          <el-radio-group
            v-if="organsNames[progress]"
            v-model="answer"
            size="medium"
          >
            <el-row type="flex" justify="center">
              <el-radio-button label="1"
                >A. {{ organsNames[progress].optionA }}</el-radio-button
              >
            </el-row>
            <el-row type="flex" justify="center">
              <el-radio-button label="2"
                >B. {{ organsNames[progress].optionB }}</el-radio-button
              >
            </el-row>
            <el-row type="flex" justify="center">
              <el-radio-button label="3"
                >C. {{ organsNames[progress].optionC }}</el-radio-button
              >
            </el-row>
            <el-row type="flex" justify="center">
              <el-radio-button label="4"
                >D. {{ organsNames[progress].optionD }}</el-radio-button
              >
            </el-row>
          </el-radio-group>
        </div>

        <!-- 切题按钮 -->
        <div class="udquiz">
          <el-row type="flex" justify="center">
            <el-col :span="5" style="margin-right: 10px">
              <el-button type="primary" @click="prev()">上一题</el-button>
            </el-col>
            <el-col
              :span="5"
              style="
                margin-left: 10px;
                background-color: #f56c6c;
                border-color: #f56c6c;
              "
            >
              <el-button type="danger" @click="submit()">提交</el-button>
            </el-col>
            <el-col :span="5" style="margin-left: 10px">
              <el-button type="primary" @click="next()">下一题</el-button>
              <!-- <el-button v-if="answer===''" type="primary" @click="next()" disabled>下一题</el-button>
              <el-button v-else type="primary" @click="next()">下一题</el-button> -->
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入
import Vue from "vue";
import MdButton from "vue-material";
import dwv from "dwv";
import tagsTable from "./tags-table";
import vHeader from "./Head";

Vue.use(MdButton);

// get element
dwv.gui.getElement = dwv.gui.base.getElement;

// Image decoders (for web workers)
dwv.image.decoderScripts = {
  jpeg2000: "assets/dwv/decoders/pdfjs/decode-jpeg2000.js",
  "jpeg-lossless": "assets/dwv/decoders/rii-mango/decode-jpegloss.js",
  "jpeg-baseline": "assets/dwv/decoders/pdfjs/decode-jpegbaseline.js",
  rle: "assets/dwv/decoders/dwv/decode-rle.js",
};

export default {
  name: "dwv",
  components: {
    vHeader,
    tagsTable,
  },
  data: function () {
    return {
      headTitle: "答题",
      dwvApp: null,
      tools: {
        ZoomAndPan: {},
        WindowLevel: {},
      },
      selectedTool: "Select Tool",
      loadProgress: 0,
      dataLoaded: false,
      metaData: null,
      showDicomTags: false,
      dropboxClassName: "dropBox",
      borderClassName: "dropBoxBorder",
      hoverClassName: "hover",
      drawer: false,
      direction: "ttb",
      size: "500px",
      // 题目和答案
      organsNames: [],
      progress: 0,
      itemsValue: ["A", "B", "C", "D"],
      answer: "",
      answers: new Map(),
      submitted: false,
      score: 0,
      multiAnser: [],
    };
  },

  created() {
    this.fetchOrgansCats();
  },

  // 钩子函数，页面初始化开始
  mounted() {
    // create app
    this.dwvApp = new dwv.App();

    // initialise app
    this.dwvApp.init({
      containerDivId: "dwv",
      tools: this.tools,
    });
    // handle load events
    this.dwvApp.addEventListener("load", (/*event*/) => {
      // set dicom tags
      this.metaData = dwv.utils.objectToArray(this.dwvApp.getMetaData());
      // set the selected tool
      let selectedTool = "Scroll";
      if (
        this.dwvApp.isMonoSliceData() &&
        this.dwvApp.getImage().getNumberOfFrames() === 1
      ) {
        selectedTool = "ZoomAndPan";
      }
      this.onChangeTool(selectedTool);
      // set data loaded flag
      this.dataLoaded = true;
    });
    // handle key events
    this.dwvApp.addEventListener("keydown", (event) => {
      this.dwvApp.defaultOnKeydown(event);
    });
    // handle window resize
    window.addEventListener("resize", this.dwvApp.onResize);

    // possible load from location
    dwv.utils.loadFromUri(window.location.href, this.dwvApp);
  },
  methods: {
    // 切换功能
    onChangeTool: function (tool) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
    },

    // 复位
    onReset: function () {
      this.dwvApp.resetDisplay();
    },
    showDropbox: function (show) {
      const box = this.dwvApp.getElement(this.dropboxClassName);
      if (box) {
        if (show) {
          // reset css class
          box.className = this.dropboxClassName + " " + this.borderClassName;
          // check content
          if (box.innerHTML === "") {
            box.innerHTML = "Drag and drop data here.";
          }
          const size = this.dwvApp.getLayerContainerSize();
          // set the initial drop box size
          const dropBoxSize = (2 * size.height) / 3;
          box.setAttribute(
            "style",
            "width:" + dropBoxSize + "px;height:" + dropBoxSize + "px"
          );
        } else {
          // remove border css class
          box.className = this.dropboxClassName;
          // remove content
          box.innerHTML = "";
          // make not visible
          box.setAttribute("style", "visible:false;");
        }
      }
    },

    //后台传送的数据
    async fetchOrgansCats() {
      const fetchOrgansNames = this.$route.query.id;
      const res = await this.$http.get(`/${fetchOrgansNames}/list`);
      this.organsNames = res.data;

      //显示图片
      this.dwvApp.loadURLs([this.organsNames[this.progress].data]);
    },

    // 上一题
    prev: function () {
      if (this.progress > 0 && this.progress <= this.organsNames.length - 1) {
        this.progress--;
        this.answer = this.answers.get(this.progress);
      // } else {
      //   this.progress--;
      //   this.multiAnser = this.answers.get(this.progress);
      // }
      }
      this.fetchOrgansCats();
    },

    // 下一题
    next: function () {
      if (this.progress < this.organsNames.length - 1) {
        this.answers.set(this.progress, this.answer);
        this.progress++;
        this.answer = "";
      // } else if (this.progress < this.organsNames.length) {
      //   this.answers.set(this.progress, this.multiAnser);
      //   this.progress++;
      //   this.multiAnser = [];
      }
      this.fetchOrgansCats();
    },
    // 提交答案
    submit: function () {},
    // 返回
    back: function () {},

    handleSelect(key, keyPath) {},
  },
};
</script>

<style lang="less" scoped>
// 上中下
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 5px;
  // line-height: 160px;
}
.container {
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
}
// Layout布局
.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
#dwv {
  padding: 60px 0 0;
  box-sizing: border-box;
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  height: 100vh;
}
.header {
  position: absolute;
  top: 0;
  height: 60px;
  width: 100%;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dicAndquiz {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.udquiz {
  margin-bottom: 1rem;
}

.button-row {
  text-align: center;
  padding: 5px;
}

.el-radio-group {
  margin-top: 5px;
  margin-bottom: 10px;
}
/deep/ .el-radio-button__inner {
  width: 330px;
}
.el-button {
  width: 100%;
}

.el-button--primary:active {
  background-color: #e9eef3;
}
.el-button--primary:focus {
  color: #4fc08d;
  background-color: #e9eef3;
  border-color: #4fc08d;
}
.el-button--primary:hover {
  color: #4fc08d;
  background-color: #e9eef3;
  border-color: #4fc08d;
}

.subject {
  margin-top: 0px;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Layers */
.layerContainer {
  padding: 0;
  margin: auto;
  text-align: center;
  flex: 1;
}
.imageLayer {
  left: 0;
  width: 90%;
  height: 90%;
}

/* drag&drop */
.dropBox {
  margin: auto;
  text-align: center;
  vertical-align: middle;
}
.dropBoxBorder {
  border: 5px dashed rgba(68, 138, 255, 0.38);
}
.dropBoxBorder.hover {
  border: 5px dashed var(--md-theme-default-primary);
}

.md-dialog {
  width: 80%;
  height: 90%;
}
</style>
