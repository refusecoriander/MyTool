<template>
  <div>
    <div class="allmenu" >
      <el-button class="menubt" icon="el-icon-menu" @click="openDrawer" type="primary" circle>
    </el-button>
    </div>
    <el-drawer :visible.sync="drawer" direction="ltr" :with-header="false" @closeDrawer="closeDrawer" size='30%' >
      <el-row style="top:20px;" class="tac">
        <el-col :span="24">
          <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item style="padding:8px" @click="closeDrawer" index="/navigation">
              <i class="el-icon-document"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item style="padding:8px" @click="closeDrawer" index="/xui">
              <i class="el-icon-menu"></i>
              <span slot="title">X-UI面板</span>
            </el-menu-item>
            <el-menu-item style="padding:8px" @click="closeDrawer" index="/baota">
              <i class="el-icon-document"></i>
              <span slot="title">宝塔面板</span>
            </el-menu-item>
            <el-menu-item style="padding:8px" @click="closeDrawer" index="/racknerd">
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
  z-index:9000;
  position: fixed;	  /* 设置fixed固定定位 */
  bottom: 60px;		    /* 距离浏览器窗口下边框20px */
  right: 24px;		    /* 距离浏览器窗口右边框20px */
}
.allmenu.el-button{
  padding: 10px 10px;			       /* 设置内边距 */
  letter-spacing: 2px;		       /* 设置文字间距 */
  background-color: #0000005e;
  border-color: #0000005e;
}
/deep/.el-drawer.ltr {
    background: rgba(9, 9, 9, 0.397);;
  }
  /deep/.el-menu {
    background: rgba(48, 49, 48, 0);;
  }
  /deep/.el-menu-item {
    color:#F8F8FF;
  }
  /deep/.el-menu-item:hover{
    background-color: #04040463;
}
  /deep/.el-menu-item.is-active {
    background-color:#04040463;
  }
.menubt{
  
  background-color: #0000005e;
  border-color: #00000000;
}
</style>