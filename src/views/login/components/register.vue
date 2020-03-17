<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" class="code">
              <img class="codeImg" src="../../../assets/images/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="checkCode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.checkCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" class="btnstyle">
              <button class="btn">获取用户验证码</button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
var checkEmail = (rule, value, callback) => {
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱不合法"));
  }
};
var checkPhone = (rule, value, callback) => {
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号格式不正确"));
  }
};
export default {
  data() {
    return {
      dialogFormVisible: false, //是否显示注册面板
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        checkCode: ""
      },
      rules: {
        nickname: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "用户名长度为5~10个字符",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "密码长度为5~10个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "密码长度为4个字符", trigger: "blur" }
        ],
        checkCode: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 5, message: "密码长度为5个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "87.3px"
    };
  },
  methods: {
    checkMsg() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$message({
            message: "恭喜你，注册成功",
            type: "success"
          });
        } else {
          this.$message.error("注册失败");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.el-dialog__header {
  padding: 0;
  height: 53px;
  line-height: 53px;
  text-align: center;
  background: linear-gradient(to right, #01c5fb, #1396fd);
  .el-dialog__title {
    font-size: 18px;
    color: rgba(254, 254, 254, 1);
  }
}
.el-dialog__body {
  padding-left: 0;
  .el-form-item__label {
    padding-right: 22px;
  }
  .code {
    height: 41px;
    text-align: right;
    .codeImg {
      width: 143px;
      height: 41px;
    }
  }
  .btnstyle {
    height: 41px;
    text-align: right;
    .btn {
      width: 143px;
      height: 41px;
      border: 1px solid rgba(211, 215, 223, 1);
      border-radius: 4px;
      background-color: #fff;
    }
  }
}
.el-dialog__footer {
  text-align: center;
}
</style>