<template>
    <div id="foot">
        <el-menu
            type="flex"
            justify="center"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#35495e"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
            style="border-bottom:0px">
            <el-col :span="8">
                <el-menu-item index="/dicom" @click="showAllQuizs('items')">工具一</el-menu-item>
            </el-col>
            <el-col :span="8">
                <el-menu-item index="/baota">宝塔面板</el-menu-item>
            </el-col>
            <el-col :span="8">
                <el-menu-item index="/archive">X-UI面板</el-menu-item>
            </el-col>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'foot',
    methods: {
        handleSelect(key, keyPath) {
        },
        showAllQuizs(id) {
            this.$router.push({path: '/dwv_1', query:{id:id}})
        }
    }
}
</script>

<style lang="less" scoped>

.el-menu-demo /deep/ {
    background-color: #35495e;
}


</style>