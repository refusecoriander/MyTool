<template>
  <div class="container">
    <!-- 头 -->
    <el-Header style="margin-bottom: 2px">
      <v-header :headTitle="headTitle"></v-header>
    </el-Header>
    <div>
      <h2 style=" color: #35495e " >请选择日期进行答题</h2>
      <div class="block">
          <el-date-picker
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
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "./Head";

export default {
  name: "archive",
  components: {
    vHeader,
  },
  data: function () {
    return {
      headTitle: "存档",
      value1: "",
    };
  },
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
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>