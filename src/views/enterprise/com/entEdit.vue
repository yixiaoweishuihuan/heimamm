<template>
  <div>
    <el-dialog title="修改企业" :visible.sync="dialogFormVisible">
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
        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属领域" :label-width="formLabelWidth">
          <el-select v-model="form.tag" placeholder="请选择所属领域">
            <el-option label="金融" value="金融"></el-option>
            <el-option label="互联网" value="互联网"></el-option>
            <el-option label="电商" value="电商"></el-option>
          </el-select>
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
//导入 修改企业信息的api
import { apiEnterEdit } from "@/api/enterprise.js";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        tag: "",
        eid: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      },
      dialogFormVisible: false, //是否显示编辑框
      formLabelWidth: "122px"
    };
  },
  methods: {
    //取消按钮
    cancel() {
      //隐藏面板
      this.dialogFormVisible = false;
    },
    //确认按钮
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiEnterEdit(this.form)
            .then(res => {
              if (res.data.code == 200) {
                //隐藏面板
                this.dialogFormVisible = false;
                //刷新企业列表
                this.$parent.getEnterprise();
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
    }
  }
};
</script>
<style>
</style>