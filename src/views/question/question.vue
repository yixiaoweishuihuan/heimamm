<template>
  <div class="ques">
    <!-- 头部 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- subject选择框组件 -->
          <subjectCom class="formItems" v-model="obj.subject"></subjectCom>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select class="formItems" v-model="obj.step">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <!-- enterprise选择框组件 -->
          <enterpriseCom class="formItems" v-model="obj.enterprise"></enterpriseCom>
        </el-form-item>
        <el-form-item label="题型">
          <el-select class="formItems" v-model="obj.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select class="formItems" v-model="obj.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input class="formItems" v-model="obj.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="formItems" v-model="obj.status" placeholder="请选择状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            class="formItems"
            v-model="obj.create_date"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题">
          <el-input class="myTitle" v-model="obj.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addQues">
            <i class="el-icon-plus"></i>&nbsp;新增试题
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格部分 -->
    <el-card class="tableItem">
      <!-- 表格数据 -->
      <el-table :data="quesList" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目" width="280">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="140">
          <template slot-scope="scope">
            {{scope.row.subject_name}}.
            <span v-if="scope.row.step==1">初级</span>
            <span v-if="scope.row.step==2">中级</span>
            <span v-if="scope.row.step==3">高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-if="scope.row.type==2">多选</span>
            <span v-if="scope.row.type==3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="140"></el-table-column>
        <el-table-column prop="username" label="创建者" width="140"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">禁用</span>
            <span v-if="scope.row.status==1">启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="status(scope.row)">{{scope.row.status==0?"启用":"禁用"}}</el-link>&nbsp;
            <el-link type="primary" @click="delate(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="obj.page"
        :page-sizes="pageSizes"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增题目弹框 -->
    <addQuestion ref="addQuestion"></addQuestion>
  </div>
</template>
<script>
//导入 新增/编辑 弹出框
import addQuestion from './com/addQusetion'
//导入 操作题目的api方法
import { apiGetQuseList, apiSetStatus, apiDelQues } from "@/api/question.js";
export default {
  components:{
    addQuestion
  },
  data() {
    return {
      //头部绑定的数据
      obj: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: 1, //当前页
        limit: 4 //当前页容量
      },
      quesList: [], //表格数据
      pageSizes: [2, 4, 8], //页容量
      total: 0, //数据总数
      subjectList: [], //学科列表
      enterpriseList: [] //企业列表
    };
  },
  methods: {
    //搜索事件
    search() {
      //获取满足条件的题目列表
      this.question();
    },
    //清除搜索表单
    clear() {
      this.obj.subject = "";
      this.obj.step = "";
      this.obj.enterprise = "";
      this.obj.type = "";
      this.obj.difficulty = "";
      this.obj.username = "";
      this.obj.status = "";
      this.obj.create_date = "";
      this.obj.title = "";
    },
    //新增试题
    addQues() {
      this.$refs.addQuestion.dialogFormVisible = true;
    },
    //编辑按钮
    edit() {},
    //禁用/启用按钮
    status(row) {
      apiSetStatus(row.id)
        .then(res => {
          if (res.data.code == 200) {
            this.question();
            if (row.status == 1) {
              this.$message.success("禁用成功！");
            } else {
              this.$message.success("启用成功！");
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除按钮
    delate(row) {
      this.$confirm("是否删除该题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelQues(row.id)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！");
                this.question();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //当前页容量改变事件
    sizeChange(index) {
      this.obj.limit = index;
      this.question();
    },
    //页改变事件
    currentChange(index) {
      this.obj.page = index;
      this.question();
    },
    //获取题目列表
    question() {
      apiGetQuseList(this.obj)
        .then(res => {
          // console.log(res);
          this.quesList = res.data.data.items;
          this.total = res.data.data.pagination.total;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //获取题目列表
    this.question();
  }
};
</script>
<style lang="less">
.ques {
  .el-form-item {
    .el-form-item__label {
      padding: 0 31px 0 21px;
    }
    .el-form-item__content {
      .formItems {
        width: 150px;
      }
    }
    .myTitle {
      width: 388px;
    }
  }
  .tableItem {
    margin-top: 21px;
    .el-pagination {
      text-align: center;
      margin-top: 31px;
    }
  }
}
</style>