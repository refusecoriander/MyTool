<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}题目</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="相关器官">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <div class="block">
          <!-- <el-date-picker v-model="model.year" type="year"  format="第 yyyy 年" value-format="yyyy" placeholder="选择年">
          </el-date-picker>
          <span>-</span> -->
          <el-date-picker v-model="model.month" type="month"  format="第 MM 月" value-format="yyyy-MM" placeholder="选择月">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="题目">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="dicom文件">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.data" :src="model.data" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="选项A">
        <el-input v-model="model.optionA"></el-input>
      </el-form-item>
      <el-form-item label="选项B">
        <el-input v-model="model.optionB"></el-input>
      </el-form-item>
      <el-form-item label="选项C">
        <el-input v-model="model.optionC"></el-input>
      </el-form-item>
      <el-form-item label="选项D">
        <el-input v-model="model.optionD"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      categories: [],
      model: {},
      value1: ''
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "data", res.url);
      // this.model.icon = res.url
    },
    async save() {
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/items", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`); // eslint-disable-line no-unused-vars
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },

  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>