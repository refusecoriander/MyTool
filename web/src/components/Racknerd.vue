<template>
  <div class="container">
    <!-- 头 -->
    <div>
      <div class="block">
        <iframe id="Iframe" :src="bdTokenUrl" scrolling="no" style="width:100%;height:100%;"></iframe>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {
  },
  data: function () {
    return {
      bdTokenUrl: 'https://my.racknerd.com/clientarea.php?action=productdetails&id=162823&language=chinese',
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