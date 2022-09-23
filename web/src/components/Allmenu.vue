<template>
  <div>
    <div class="allmenu" >
      <el-button icon="el-icon-menu" @click="openDrawer" type="primary" circle>
    </el-button>
    </div>
    <el-drawer :visible.sync="drawer" direction="ltr" :with-header="false" @closeDrawer="closeDrawer" >
      <el-row style="top:20px;" class="tac">
        <el-col :span="24">
          <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item @click="closeDrawer" index="/navigation">
              <i class="el-icon-document"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item @click="closeDrawer" index="/archive">
              <i class="el-icon-menu"></i>
              <span slot="title">X-UI面板</span>
            </el-menu-item>
            <el-menu-item @click="closeDrawer" index="/baota">
              <i class="el-icon-document"></i>
              <span slot="title">宝塔面板</span>
            </el-menu-item>
            <el-menu-item @click="closeDrawer" index="/racknerd">
              <i class="el-icon-setting"></i>
              <span slot="title">Racknerd</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    openDrawer(){
      this.drawer=true
    },
    closeDrawer(){
      this.drawer=false
    },
    handleOpen(key,keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.allmenu {
  position: fixed;	  /* 设置fixed固定定位 */
  bottom: 60px;		    /* 距离浏览器窗口下边框20px */
  right: 24px;		    /* 距离浏览器窗口右边框20px */
}
.allmenu el-button{
  display: block;			           /* 将<a>标签设为块元素，用于美化样式 */
  border: 1px solid #ccc;		  /* 设置边框样式 */
  padding: 10px 20px;			       /* 设置内边距 */
  letter-spacing: 2px;		       /* 设置文字间距 */
}
</style>