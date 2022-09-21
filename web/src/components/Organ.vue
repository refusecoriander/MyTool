<template>
  <div id="organ">
    <!-- 头 -->
    <div class="header">
      <el-Header>
        <v-header :headTitle="headTitle"></v-header>
      </el-Header>
    </div>

    <div class="btgroup">
      <el-row>
        <el-col :span="8"
          ><el-button @click="gotolink('adrenals')" class="grid-content bg-purple"
            >Adrenal<br />（肾上腺）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('hearts')" class="grid-content bg-purple-light"
            >Cardiac<br />（心脏）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('chests')" class="grid-content bg-purple"
            >Chest<br />（胸部）</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><el-button @click="gotolink('colons')" class="grid-content bg-purple-light"
            >Colon<br />（结肠）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('genitourinarys')" class="grid-content bg-purple"
            >Genitourinary<br />（泌尿生殖器）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('kidneys')" class="grid-content bg-purple-light"
            >Kidney<br />（肾脏）</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><el-button @click="gotolink('livers')" class="grid-content bg-purple"
            >Liver<br />（肝脏）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('musculoskeletals')" class="grid-content bg-purple-light"
            >Musculoskeletal<br />（肌肉 骨骼）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('neuros')" class="grid-content bg-purple"
            >Neuro(Head & Neck)<br />（神经(头部和颈部)）</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><el-button @click="gotolink('pancreass')" class="grid-content bg-purple-light"
            >Pancreas<br />（胰腺）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('smallBowels')" class="grid-content bg-purple"
            >Small Bowel<br />（小肠）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('spleens')" class="grid-content bg-purple-light"
            >Spleen<br />（脾脏）</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          ><el-button @click="gotolink('stomachs')" class="grid-content bg-purple"
            >Stomach<br />（胃）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('traumas')" class="grid-content bg-purple-light"
            >Trauma<br />（创伤）</el-button
          ></el-col
        >
        <el-col :span="8"
          ><el-button @click="gotolink('vasculars')" class="grid-content bg-purple"
            >Vascular<br />（血管）</el-button
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
import vHeader from "./Head";

export default {
  name: "organ",
  components: {
    vHeader,
  },
  data: function () {
    return {
      headTitle: "器官系统",
    };
  },
  methods: {
    async gotolink(id) {
      // 传参
      this.$router.push({path: '/dicom', query:{id:id}})//根据路径+query
    },
  },
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
#organ {
  padding: 60px 0 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.header {
  margin: -60px 0 0;
  top: 0;
  height: 60px;
  width: 100%;
}

.btgroup {
  width: 100%;
  height: 100%;
}
.el-row {
  height: 20%;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  height: 100%;
  border-radius: 4px;
  text-align: center;
}
.bg-purple {
  background: #4fc08d63;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  padding: 2px;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  min-height: 36px;
}
</style>