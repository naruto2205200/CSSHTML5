<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/TB18l5SiHvpK1RjSZPiXXbmwXXa-86-86.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="isCollapse? '64px':'200px'">
        <div class="toggle-button" @click="toggleBtn">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition = "false"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-4-1">
              <i class="el-icon-menu"></i>
              <span>选项1</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <i :class="iconOjb[item.id]"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      iconOjb: {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': ''
      },
      isCollapse: false
    }
  },
  create() {
    // 初始化加载数据
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.status !== 200) return this.$message.error(res.msg)
      this.menuList = res.data
      console.log(res)
    },
    // 左侧菜单的折叠和展开
    toggleBtn() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;

    > div {
      display: flex;
      align-items: center;
      img {
        height: 54px;
      }
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border: 0;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.toggle-button {
  color: #ffffff;
  text-align: center;
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
}
</style>
