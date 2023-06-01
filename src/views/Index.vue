<template>
    <el-container style="height:100%">
      <el-header height="100px" style="line-height:100px">
        <el-row>
          <el-col :span="6" style="padding-top:10px">
            <img src="./assets/img/院徽（杭电信息工程学院）.png" alt="" width="80px">
          </el-col>
          <el-col :span="14" style="font-size:36px">新闻后台管理系统</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="loginOut">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu class="el-menu-vertical-demo" :unique-opened="uniqueOpened" :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span style="font-size:20px;font-weight:bolder">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="userList"><i class="el-icon-s-grid"></i>用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span style="font-size:20px;font-weight:bolder">文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="articleList"><i class="el-icon-coordinate"></i>文章列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="addArticle"><i class="el-icon-coordinate"></i>添加文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  export default (await import('vue')).defineComponent({
    name: 'Index',
    data () {
      return {
        uniqueOpened: true
      }
    },
    methods: {
      loginOut () {
        alert('退出成功')
        localStorage.removeItem('ttk')
        this.$router.push('/login')
      }
    }
  })
  </script>
  
  <style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    padding: auto;
    border-radius: 4px;
  }
  </style>
  