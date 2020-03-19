<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avator">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

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
              <button
                class="btn"
                @click.prevent="getNum"
                :disabled="time!==0"
              >{{time===0?"获取用户验证码":time}}</button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="cancel">取 消</el-button>
        <el-button type="primary" @click.prevent="checkMsg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//导入 apiGetCode submit 方法
import { apiGetCode, submit } from "@/api/register";

//导入自定义验证规则
import {checkPhone,checkEmail} from "@/utils/mycheck.js"

export default {
  data() {
    return {
      dialogFormVisible: false, //是否显示注册面板
      formLabelWidth: "87.3px",
      form: {
        avator: "", //头像属性
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "", //图形码
        checkCode: "" //验证码
      },
      rules: {
        avator: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        nickname: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "用户名长度为5~15个字符",
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
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图形码长度为4个字符", trigger: "blur" }
        ],
        checkCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4个字符", trigger: "blur" }
        ]
      },
      imgUrl:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&time=" + Date.now(), //图片验证码
      tiemID: null, //定时器
      time: 0, //禁用时间
      imgUpload: process.env.VUE_APP_URL + "/uploads", //上传头像的地址
      imageUrl: null //头像地址
    };
  },
  methods: {
    //点击取消 清空表单 并隐藏注册面板
    cancel() {
      //隐藏注册面板
      this.dialogFormVisible = false;
      //清空 头像图片
      this.imageUrl = "";
      //清空表单信息
      this.$refs.form.resetFields();
    },
    //点击确定按钮验证
    checkMsg() {
      this.$refs.form.validate(valid => {
        if (valid) {
          submit({
            username: this.form.nickname,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avator,
            password: this.form.password,
            rcode: this.form.checkCode
          })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success({
                  message: "注册成功！",
                  type: "success"
                });
                //清空表单 并隐藏注册面板
                this.cancel();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              window.console.log(err);
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
        process.env.VUE_APP_URL + "/captcha?type=sendsms&time=" + Date.now();
    },
    //点击获取验证码按钮 获取短信验证码
    getNum() {
      // 判断手机号是否合法
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号不合法");
        return;
      }
      //判断图片验证码是否合法
      if (this.form.code.trim().length !== 4) {
        return this.$message.error("验证码不合法");
      }
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
          if (res.data.code == 200) {
            this.$message.success({
              message: res.data.data.captcha,
              type: "success"
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    //头像模块
    //头像上传成功后执行的回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avator = res.data.file_path;
      this.$refs.form.validateField("avator");
    },
    //头像上传前执行的回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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

  // 头像
  .avatar-uploader {
    text-align: center;

    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
.el-dialog__footer {
  text-align: center;
}
</style>