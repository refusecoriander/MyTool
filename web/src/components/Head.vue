<template>
  <div class="header">
    <!-- 返回 -->
    <div class="back" v-show="isShow">
      <i v-on:click="back" class="el-icon-arrow-left"></i>
    </div>
    <!-- 标题 -->
    <div style="flex: 1" class="headertitle">{{ title }}</div>
    <!-- 下拉菜单 -->
    <div class="menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-menu"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><router-link to="/navigation">主页</router-link></el-dropdown-item
          >
          <el-dropdown-item divided
            ><router-link :to="{
              path:'dwv_1',
              query: {id: 'items'}
              }">答题</router-link></el-dropdown-item
          >
          <el-dropdown-item divided
            ><router-link to="/organ">器官系统</router-link></el-dropdown-item
          >
          <el-dropdown-item divided
            ><router-link to="/archive">存档</router-link></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["headTitle"],
  data() {
    return {
      title: this.headTitle,
      isShow: true,
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: #41b883;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.back {
  margin-left: 1.5rem;
}
.headertitle {
  font-size: 1rem;
}
.menu {
  margin-right: 1.5rem;
}
.el-dropdown-link {
  cursor: pointer;
  color: #35495e;
}
.el-icon-s-home {
  font-size: 1.25rem;
}
.el-icon-arrow-left {
  font-size: 1.25rem;
  color: #35495e;
}
</style>