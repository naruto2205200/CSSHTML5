<template>
  <div>
    <!-- <h3>用户列表</h3> -->
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightsList" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="权限说明" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column label="权限等级">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.level==1">一级</el-tag>
                <el-tag v-if="scope.row.level==2" type="success">二级</el-tag>
                <el-tag v-if="scope.row.level==3" type="warning">三级</el-tag>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            rightsList: []
        }
    },
    created() {
        this.getRightsList();
    },
    methods: {
        async getRightsList(){
            const {data:res } = await this.$http.get('/power/rightsList');
            if(res.code!==200){
                return this.$message.error('获取权限列表失败')
            }
            this.rightsList = res.data;           
        }
    },
}
</script>
<style lang="less" scoped>
</style>
