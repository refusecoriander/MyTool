<template>
    <el-container id="home" class="container">
      <!-- 主体 -->
      <el-main>
        <router-view>
          
        </router-view>
      </el-main>
      <!-- 尾 -->
      <!-- <el-footer>
        <v-footer></v-footer>
      </el-footer> -->
    </el-container>
</template>

<script>

import vFooter from './Foot'

export default {
  name: 'home',
  components: {
    vFooter
  },
  data: function() {
    return{
      headTitle: '主页'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    }
  }
}
</script>

<style lang="less" scoped>
// 上中下
.el-footer {
    background-color: #41b883;
    color: #41b883;
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
.container{
  height: 100vh;
  padding: 0px;
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

</style>
