<template>
  <div>
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
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
//导入 编辑学科的方法
import { editSubject } from "@/api/subject";
export default {
  data() {
    return {
      form: {
        id: "",
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      formLabelWidth: "122px",
      dialogFormVisible: false
    };
  },
  methods: {
    //点击确定按钮提交修改后的的学科
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          editSubject(this.form)
            .then(res => {
              if (res.data.code == 200) {
                //隐藏面板
                this.dialogFormVisible = false;
                this.$message.success("修改成功！");
                //重新渲染学科列表
                this.$parent.getSubjectList();
              } else if (res.data.code == 0) {
                this.$message.error("学科编号不能重复");
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
    }
  }
};
</script>
<style>
</style>