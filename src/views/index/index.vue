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
          <img :src="$store.state.userIcon" alt />
          <span class="hello">{{$store.state.userName}}，你好</span>
          <el-button type="primary" size="mini" @click="exitUser">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左边 -->
        <el-aside width="auto">
          <el-menu default-active="/index" :collapse="blo" :router="true">
            <template v-for="(item, index) in children">
              <el-menu-item
                :key="index"
                v-if="item.meta.roles.includes($store.state.roles)"
                :index="item.meta.fullPath"
              >
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </template>
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
//导入 子路由
import childrenRouter from "@/router/childrenRouter.js";
//导入 getUserInfo 和 exitLogin 方法
import { exitLogin } from "@/api/index.js";
//导入 getToken 和 removeToken 方法
import { removeToken } from "@/utils/mytoken.js";
export default {
  data() {
    return {
      blo: false, //是否显示左侧导航栏的文字
      info: "", //用户详细信息
      avatar: "", //用户头像
      children: childrenRouter //列表数据源
    };
  },
  methods: {
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