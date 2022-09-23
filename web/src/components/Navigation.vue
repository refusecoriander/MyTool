<template>
  <el-container id="home" class="container">
    <!-- 头 -->
    <el-Header style="margin-bottom: 2px">
      <v-header :headTitle="headTitle"></v-header>
    </el-Header>
    <!-- 主体 -->
    <el-main>
      <div>
        <h1 class="Mytools">Mytools</h1>
        <h1>------</h1>
        <h1 style="color:#35495e">天才北的小工具箱</h1>
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-button size="large" type="primary" @click="cimsInputClick1">X-UI</el-button>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-button size="large" type="primary" @click="cimsInputClick2">工具</el-button>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-button size="large" type="primary" @click="cimsInputClick2">宝塔面板</el-button>
          </el-col>
        </el-row> -->
      </div>
    </el-main>
    <!-- 尾 -->
    <el-footer style="height:56px">
      <v-footer></v-footer>
    </el-footer>
  </el-container>
</template>

<script>

import vHeader from './Head'
import vFooter from './Foot'

export default {
  name: 'navigation',
  components: {
    vHeader,
    vFooter
  },
  data: function () {
    return {
      headTitle: '主页'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    /* cimsInputClick1() {
      window.open('https://test.refusecoriander.top/racknerd', '_blank')
    }, */
    cimsInputClick2() {
      window.open('http://tools.liumingye.cn/', '_blank')
    },
    /* cimsInputClick3() {
      window.open('http://172.245.60.107:8888/c9b3323e/', '_blank')
    } */
  }
}
</script>

<style lang="less" scoped>
// 上中下
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 0px;
  height: 100%;
  width: 100%;
}

.container {
  height: 100vh;
  padding: 0px;
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
