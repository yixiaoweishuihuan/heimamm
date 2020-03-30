<template>
  <div class="addQues">
    <el-dialog title="新增题库" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 学科 -->
        <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
          <subjectCom v-model="form.subject"></subjectCom>
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
          <enterpriseCom v-model="form.enterprise"></enterpriseCom>
        </el-form-item>
        <!-- 城市 -->
        <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
          <el-cascader
            :props="{value:'label'}"
            v-model="form.city"
            :options="options"
            placeholder="请选择城市"
          ></el-cascader>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 试题标题 -->
        <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth"></el-form-item>
        <quillEditor class="quillEditor" @change="onEditorChange($event)" v-model="form.title"></quillEditor>
        <!-- 单选选择区域 -->
        <el-form-item
          v-if="form.type==1"
          label="单选"
          prop="single_select_answer"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.single_select_answer">
            <radioGroup
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text="item.text"
              :image="item.image"
              @change="v=>{item.image = v}"
              @changeText="v=>{item.text = v}"
            ></radioGroup>
          </el-radio-group>
        </el-form-item>
        <!-- 多选选择区域 -->
        <el-form-item
          v-if="form.type==2"
          label="多选"
          prop="multiple_select_answer"
          :label-width="formLabelWidth"
        >
          <br />
          <el-checkbox-group v-model="form.multiple_select_answer">
            <checkBox
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text="item.text"
              :image="item.image"
              @change="v=>{item.image = v}"
              @changeText="v=>{item.text = v}"
            ></checkBox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 简答区域 -->
        <el-form-item
          v-if="form.type==3"
          label="简答"
          prop="short_answer"
          :label-width="formLabelWidth"
        >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 解析视频 -->
        <el-form-item label="解析视频" prop="video" :label-width="formLabelWidth">
          <videoUplode :videoURL="form.video" @changeVideo="v=>{form.video = v}"></videoUplode>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 答案解析 -->
        <el-form-item label="答案解析" prop="answer_analyze" :label-width="formLabelWidth"></el-form-item>
        <quillEditor @change="editorChange($event)" v-model="form.answer_analyze"></quillEditor>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 试题备注 -->
        <el-form-item label="试题备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" class="text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addQuesQuestion">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//导入 新增题型的方法
import { apiAddQue } from "@/api/question";
//导入视频上传组件
import videoUplode from "./uploadVideo";
//导入 多选组件
import checkBox from "./checkBox";
//导入 单选组组件
import radioGroup from "./radioGroup";
//导入 quill-editor 富文本编辑器组件
import quillEditor from "./quillEditor";
//导入 城市数据
import { regionDataPlus } from "element-china-area-data";
export default {
  components: {
    quillEditor,
    radioGroup,
    checkBox,
    videoUplode
  },
  data() {
    return {
      options: regionDataPlus, //三级联动城市信息
      form: {
        //绑定的数据源
        title: "",
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: 1,
        difficulty: "",
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
            // text: "",
            // image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
            // text: "",
            // image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
            // text: "",
            // image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
            // text: "",
            // image: ""
          }
        ]
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "blur" }],
        step: [{ required: true, message: "请选择阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        type: [{ required: true, message: "请选择题型", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入试题标题", trigger: "blur" }],
        single_select_answer: [
          { required: true, message: "请选择单选答案", trigger: "blur" }
        ],
        multiple_select_answer: [
          { required: true, message: "请选择多选答案", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "请输入简答题答案", trigger: "blur" }
        ],
        video:[],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      dialogFormVisible: false, //是否显示面板
      formLabelWidth: "auto" //lable宽度
    };
  },
  methods: {
    //标题改变时 触发的事件
    onEditorChange(val) {
      this.form.title = val.html;
    },
    //答案解析改变时 触发的事件
    editorChange(val) {
      this.form.answer_analyze = val.html;
    },
    //点击确定按钮
    addQuesQuestion() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiAddQue(this.form)
            .then(res => {
              if (res.data.code == 200) {
                //隐藏新增面板
                this.dialogFormVisible = false;
                this.$message.success("添加成功!");
                //刷新数据
                this.$parent.question();
                //清除数据
                this.$refs.form.resetFields();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("验证失败!");
          return false;
        }
      });
    },
    //点击取消按钮
    cancel() {
      //隐藏新增面板
      this.dialogFormVisible = false;
      //清除数据
      this.$refs.form.resetFields();
    }
  }
};
</script>
<style lang="less">
.addQues {
  .el-dialog__header {
    text-align: left;
    padding-left: 18px;
  }
  .el-dialog__body {
    width: 835px;
    padding-left: 300px;
    .el-form-item__label {
      text-align: left;
    }
    .el-form-item {
      .el-form-item__label {
        padding: 0 41px 0 0;
      }
    }
    .el-input__inner {
      width: 364px;
    }
    .quillEditor {
      margin-bottom: 58px;
    }
    .text {
      margin-left: 71px;
      .el-input__inner {
        width: 754px;
      }
    }
  }
}
</style>