<template>
  <el-container id="home" class="container">
    <el-main>
      <el-row>
        <el-col :span="24">
          <h1 class="Mytools">Mytools</h1>
        </el-col>
        <el-col :span="24">
          <h1 style="color:#35495e">拒绝香菜的小工具箱</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button size="large" type="primary" @click="cimsInputClick1">刘明野工具集</el-button>
        </el-col>
        <el-col style="margin-top:20px" :span="24">
          <el-button size="large" type="primary" @click="cimsInputClick2">去水印</el-button>
        </el-col>
        <el-col style="margin-top:20px" :span="24">
          <el-button size="large" type="primary" @click="cimsInputClick3">推特视频下载</el-button>
        </el-col>
        <el-col style="margin-top:20px" :span="24">
          <el-button size="large" type="primary" @click="cimsInputClick4">二维码生成识别</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'navigation',
  components: {
  },
  data: function () {
    return {
      headTitle: '主页'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    cimsInputClick1() {
      window.open('http://tools.liumingye.cn/', '_blank')
    },
    cimsInputClick2() {
      this.$router.push({ path: '/watermark' })
    },
    cimsInputClick3() {
      this.$router.push({ path: '/twitterdown' })
    },
    cimsInputClick4() {
      this.$router.push({ path: '/qrcode' })
    }
  }
}
</script>

<style lang="less" scoped>
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  padding: 0px;
  height: 100%;
  width: 100%;
}

.container {
  height: 100vh;
  padding: 0px;
  background-color: white;
}

body>.el-container {
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

.Mytools {
  font-size: 4rem;
  color: #41b883;
  text-shadow: 1px 1px #35495e;
  margin-bottom: 1.5rem;
}

.el-row {
  height: 50px;
}
</style>
