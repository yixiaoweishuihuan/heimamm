<template>
  <div class="app">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="left">
          <i class="el-icon-s-fold" @click="blo=!blo"></i>
          <img src="../../assets/images/index-logo.png" alt />
          <span class="heimamm">黑马面面</span>
        </div>
        <div class="right">
          <img :src="avatar" alt />
          <span class="hello">{{info.username}}，你好</span>
          <el-button type="primary" size="mini" @click="exitUser">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左边 -->
        <el-aside width="auto">
          <el-menu
            default-active="/index/chart"
            class="el-menu-vertical-demo"
            :collapse="blo"
            :router="true"
          >
            <el-menu-item index="/index/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/index/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右边 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//导入 getUserInfo 和 exitLogin 方法
import { getUserInfo, exitLogin } from "@/api/index.js";
//导入 getToken 和 removeToken 方法
import { removeToken } from "@/utils/mytoken.js";
export default {
  data() {
    return {
      blo: false, //是否显示左侧导航栏的文字
      info: "", //用户详细信息
      avatar: "" //用户头像
    };
  },
  methods: {
    //获取用户信息
    getUser() {
      getUserInfo()
        .then(res => {
          if (res.data.code == 200) {
            this.info = res.data.data;
            this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
            //       } else if (res.data.code == 206) {
            //         this.$message.error("token错误！");
            //         //跳转到登录页面
            //         this.$router.push("/login");
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    //退出
    exitUser() {
      this.$confirm("请确认是否退出该账户！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送请求 退出该账户
          exitLogin()
            .then(res => {
              if (res.data.code == 200) {
                //清除 token
                removeToken();
                //提示
                this.$message.success("退出成功");
                //跳转到登录页面
                this.$router.push("/login");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    }
  },
  created() {
    //判断 token 是否为空
    // if (!getToken()) {
    //   this.$message.error("对不起，您还未登录!");
    //   //跳转到登录页面
    //   this.$router.push("/login");
    //   return;
    // }
    //页面一加载 调用 getUser方法 获取用户详细信息
    this.getUser();
  }
};
</script>
<style lang="less">
html,
body,
.app,
.el-container {
  height: 100%;
  .el-header {
    color: #333;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
      }
      img {
        width: 33px;
        height: 28px;
        margin: 0 11px 0 22px;
      }
      span {
        font-size: 22px;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .hello {
        font-size: 15px;
        color: rgba(99, 99, 99, 1);
        margin: 0 38px 0 9px;
      }
    }
  }

  .el-aside {
    color: #333;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }

  .el-main {
    background: rgba(232, 233, 236, 1);
    color: #333;
  }
}
</style>