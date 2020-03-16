<template>
  <div class="login">
    <div class="leftbox">
      <div class="title">
        <img src="../../assets/images/titlelogo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <!-- form 表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label-width="0">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label-width="0" class="checkCodeBox">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.checkCode" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="checkImg" src="../../assets/images/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label-width="0" class="isChecked">
          <el-checkbox-group v-model="form.isChecked">
            <el-checkbox name="type">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="btnstyle" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="btnstyle" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/images/rightimg.png" alt class="rightimg" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        phone: "", //手机号码
        password: "", //密码
        checkCode: "", //验证码
        isChecked: false //是否阅读
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less">
.login {
  /* 使用 flex 布局 */
  display: flex;
  /* 让两者左右间隔相等 */
  justify-content: space-around;
  /* 设置上下居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .leftbox {
    width: 478px;
    height: 550px;
    padding: 47px 42px 86px;
    /* padding 不会计入盒子的宽高中 内减盒子*/
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);

    .title {
      /* 使用 flex 布局 */
      display: flex;
      /* 上下对齐 */
      align-items: center;
      margin-bottom: 27px;

      .titlename {
        margin: 0 14px 0 16px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .titleline {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .titlelogin {
        margin-left: 12px;
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .checkCodeBox {
      margin-bottom: 0px;
      .checkImg {
        width: 110px;
        height: 42px;
      }
    }
    .isChecked {
      margin-bottom: 0px;
    }
    .btnstyle {
      width: 100%;
    }
  }

  .rightimg {
    width: 633px;
    height: 435px;
  }
}
</style>