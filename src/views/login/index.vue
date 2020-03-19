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
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label-width="0" prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="checkCode">
          <el-row class="checkCode">
            <el-col :span="16">
              <el-input v-model="form.checkCode" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="checkImg" :src="imgUrl" alt @click="changeImg" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label-width="0" prop="isChecked">
          <el-checkbox-group v-model="form.isChecked" class="isChecked">
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
          <el-button class="btnstyle" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/images/rightimg.png" alt class="rightimg" />
    <!-- 使用 注册组件 -->
    <register ref="register"></register>
  </div>
</template>
<script>
//导入注册组件
import register from "./components/register";
//导入 自定义规则
import { checkPhone } from "@/utils/mycheck.js";
//导入 登录的 apiLogin 方法
// import { apiLogin } from "@/api/login.js";
export default {
  //注册
  components: {
    register
  },
  data() {
    return {
      form: {
        phone: "", //手机号码
        password: "", //密码
        checkCode: "", //验证码
        isChecked: [] //是否阅读
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "密码长度为5~10个字符", trigger: "blur" }
        ],
        checkCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "密码长度为4", trigger: "blur" }
        ],
        isChecked: [
          {
            type: "array",
            required: true,
            message: "请阅读并勾选协议！",
            trigger: "change"
          }
        ]
      },
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login&xxx=" + Date.now() //验证码图片地址
    };
  },
  methods: {
    //点击验证码图片 切换验证码
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&xxx=" + Date.now(); //验证码图片地址
    },
    //登录
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //发送请求 登录申请
          // apiLogin({
          //   phone:this.form.phone,
          //   password:this.form.password,
          //   code:this.form.checkCode
          // }).then(res=>{
          //   console.log(res);
          // }).catch(err=>{
          //   console.log(err);
          // })
          this.$message({
            message: "验证成功！",
            type: "success"
          });
        } else {
          this.$message.error("验证失败！");
          return false;
        }
      });
    },
    //注册
    register() {
      this.$refs.register.dialogFormVisible = true;
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
    .checkCode {
      line-height: 0;
      .checkImg {
        width: 110px;
        height: 42px;
      }
    }

    .isChecked {
      line-height: 0;
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