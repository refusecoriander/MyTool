<template>
  <div class="container">
    <!-- 头 -->
    <el-Header style="margin-bottom: 2px">
      <v-header :headTitle="headTitle"></v-header>
    </el-Header>
    <div>
      <div class="block">
        <iframe id="Iframe" :src="bdTokenUrl" scrolling="no" style="width:100%;height:100%;"></iframe>
        <!-- <el-date-picker
            v-model="value1"
            type="month"
            format="yyyy-MM "
            value-format="yyyy-MM"
            placeholder="选择月"
          >
          </el-date-picker>
        <router-link
          :to="{
            path: 'dwv_1',
            query: { id: value1 },
          }"
        >
          <el-button type="primary" >答题</el-button>
        </router-link> -->
      </div>
    </div>
    <el-footer style="height:56px" >
      <v-footer></v-footer>
    </el-footer>
  </div>
</template>


<script>
import vHeader from "./Head";
import vFooter from './Foot'

export default {
  name: "archive",
  components: {
    vHeader,
    vFooter
  },
  data: function () {
    return {
      bdTokenUrl: 'https://test.refusecoriander.top/racknerd',
      headTitle: "存档",
      value1: "",
    };
  },
  /* created() {
    this.getUrl();
    this.$nextTick(() => {
      this.getCode();
    });
  }, */
  mounted() {
    /**
     * iframe-宽高自适应显示   
     */
    document.getElementById('Iframe').src=document.getElementById('Iframe').src;
    const oIframe = document.getElementById('Iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
    oIframe.style.height = (Number(deviceHeight) - 120) + 'px'; //数字是页面布局高度差
  },
  methods: {
    /**
     * 获取-外部接口信息
     */
    /* getUrl() {
      let that = this
      let bdUrl = { queryurl: this.$paths.bdpath + '/locate' };
      this.$api.getBdToken(bdUrl, function (res) {
        that.bdTokenUrl = res.data.data;
      })
    }, */
  }
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-dropdown {
  vertical-align: top;
}

.el-dropdown+.el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>