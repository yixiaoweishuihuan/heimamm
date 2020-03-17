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
              <img class="codeImg" @click="changeImg" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="checkCode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.checkCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" class="btnstyle">
              <button class="btn" @click.prevent="getNum" :disabled="time!==0">{{time===0?"获取用户验证码":time}}</button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="checkMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//导入 apiGetCode 方法
import apiGetCode from "../../../api/regidter";
// 定义校验方法
// 定义一个邮箱的正则
var checkEmail = (rule, value, callback) => {
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 验证参数的合法
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱不合法"));
  }
};
// 定义一个手机的正则
var checkPhone = (rule, value, callback) => {
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 验证参数的合法
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
      formLabelWidth: "87.3px",
      imgUrl:
        process.env.VUE_APP_ONLINEURL +
        "/captcha?type=sendsms&time=" +
        Date.now(), //图片验证码
      tiemID: null, //定时器
      time: 0
    };
  },
  methods: {
    //点击确定按钮验证
    checkMsg() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.dialogFormVisible = false;
          this.$message({
            message: "恭喜你，注册成功",
            type: "success"
          });
        } else {
          this.$message.error("注册失败");
          return false;
        }
      });
    },
    //切换图片验证码
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_ONLINEURL +
        "/captcha?type=sendsms&time=" +
        Date.now();
    },
    //点击获取验证码按钮 获取短信验证码
    getNum() {
      // 将时间设置为 60s
      this.time = 60;
      // 添加一个定时器：判断当前按钮是否可以点击
      this.timeID = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        // 当时间为0时，定时器清空
        if (this.time === 0) {
          clearInterval();
        }
      }, 1000);
      //获取短信验证码
      apiGetCode({
        code: this.form.code,
        phone: this.form.phone
      })
        .then(res => {
          window.console.log(res);
        })
        .catch(err => {
          window.console.log(err);
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