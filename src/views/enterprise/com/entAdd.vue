<template>
  <div>
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
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
// 导入 企业新增接口
import { apiEnterAdd } from "@/api/enterprise.js";
export default {
  data() {
    return {
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //企业备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }],
        remark: [{}],
      },
      formLabelWidth: "122px",
      dialogFormVisible: false
    };
  },
  methods: {
    //点击确定按钮提交新增的企业
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiEnterAdd(this.form)
            .then(res => {
              if (res.data.code == 200) {
                //重新渲染企业列表
                this.$parent.getEnterprise();
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
    },
    //取消按钮
    cancel() {
      //隐藏面板
      this.dialogFormVisible = false;
      //清空表单
      this.$refs.form.resetFields();
      // this.form.remark = "";
    }
  }
};
</script>
<style>
</style>