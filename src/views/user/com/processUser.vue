<template>
  <div>
    <el-dialog :title="isEdit?'修改用户':'新增用户'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select v-model="form.role_id">
            <el-option label="请选择角色" value></el-option>
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="form.status">
            <el-option label="请选择状态" value></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//导入 自定义校验方法
import { checkPhone, checkEmail } from "@/utils/mycheck.js";
//导入 操作用户的api
import { apiEditUser, apiAddUser } from "@/api/user.js";
export default {
  data() {
    return {
      isEdit: true, //是否是修改页面
      dialogFormVisible: false, //是否显示面板
      formLabelWidth: "122px",
      form: {
        id: "",
        username: "",
        email: "",
        phone: "",
        avatar: "",
        password: "",
        role_id: "",
        status: "",
        remark: "" //企业备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }],
        status: [],
        remark: []
      }
    };
  },
  methods: {
    //确认按钮
    onSubmit() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            apiEditUser(this.form)
              .then(res => {
                if (res.data.code == 200) {
                  //隐藏面板
                  this.dialogFormVisible = false;
                  //刷新企业列表
                  this.$parent.getUserList();
                  this.$message.success("修改成功！");
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                window.console.log(err);
              });
          } else {
            this.$message.error("验证失败！");
            return false;
          }
        });
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            apiAddUser(this.form)
              .then(res => {
                if (res.data.code == 200) {
                  //重新渲染企业列表
                  this.$parent.getUserList();
                  this.$message.success("新增成功！");
                  //隐藏面板 清空表单
                  this.cancel();
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                window.console.log(err);
              });
          } else {
            this.$message.error("验证失败！");
          }
        });
      }
    },
    //取消按钮
    cancel() {
      if (!this.isEdit) {
        //清空表单
        this.$refs.form.resetFields();
      }
      //隐藏面板
      this.dialogFormVisible = false;
    }
  },
};
</script>
<style>
</style>