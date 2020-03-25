<template>
  <div>
    <!-- 顶部 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="obj.rid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="obj.name" class="long"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="obj.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="obj.status" class="long">
            <el-option label="全部" value></el-option>
            <el-option label="启用" :value="1">启用</el-option>
            <el-option label="禁用" :value="0">禁用</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubject">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubject">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="table-content">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="intro" label="简称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column label="创建日期" width="180">
          <template slot-scope="scope">{{scope.row.create_time | myTime}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <el-link type="primary" @click="editSubject(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disable(scope.row)">{{scope.row.status?"禁用":"启用"}}</el-link>&nbsp;
            <el-link type="primary" @click="delate(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="obj.page"
        :page-sizes="pageSizeArr"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      ></el-pagination>
    </el-card>
    <!-- 新增学科 dialog框 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑学科 dialog框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>
<script>
//导入 操作学科列表的数据的 api
import { getSubject, changeStatus, delateSubject } from "@/api/subject.js";
//导入 addDialog 框
import addDialog from "./com/addDialog";
//导入 editDialog 框
import editDialog from "./com/editDialog";
export default {
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      //表格 数据
      subjectList: [],
      //分页/行内表单 数据
      obj: {
        name: "", //学科名称
        page: 1, //当前页码
        limit: 4, //页容量
        rid: "", //学科编号
        username: "", //创建者
        status: "" //状态
      },
      pageSizeArr: [2, 4, 8], //页容量分组
      counts: 0 //当前数据总数
    };
  },
  methods: {
    //打开新增学科面板
    addSubject() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    //获取学科列表
    getSubjectList() {
      getSubject(this.obj)
        .then(res => {
          //给表格数据赋值
          this.subjectList = res.data.data.items;
          //给 总学科数 赋值
          this.counts = res.data.data.pagination.total;
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    //禁用按钮点击事件
    disable(row) {
      let id = row.id;
      changeStatus(id)
        .then(res => {
          if (res.data.code == 200) {
            //重新获取学科列表
            if (row.status === 0) {
              this.$message.success("启用成功！");
            } else {
              this.$message.success("禁用成功！");
            }
            this.getSubjectList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //页容量改变事件
    sizeChange(index) {
      //改变页容量
      this.obj.limit = index;
      //重新 获取学科列表
      this.getSubjectList();
    },
    //页码改变事件
    currentChange(index) {
      //改变页码
      this.obj.page = index;
      //重新获取学科列表
      this.getSubjectList();
    },
    //筛选按钮
    searchSubject() {
      this.getSubjectList();
    },
    //清空搜索表单
    clearSearch() {
      (this.obj.name = ""),
        (this.obj.rid = ""),
        (this.obj.username = ""),
        (this.obj.status = ""),
        this.getSubjectList();
    },
    //编辑按钮
    editSubject(row) {
      //显示 编辑框
      this.$refs.editDialog.dialogFormVisible = true;
      //编辑状态保存
      if (this.$refs.editDialog.form.id !== row.id) {
        this.$refs.editDialog.form = JSON.parse(JSON.stringify(row));
      }
    },
    //删除按钮
    delate(row) {
      this.$confirm("请确认是否删除该学科?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delateSubject(row.id)
            .then(res => {
              if (res.data.code == 200) {
                //判断当前页是否是最后一条数据
                if (this.subjectList.length === 1) {
                  //当前页码减一
                  this.obj.page -= 1;
                }
                this.$message.success("删除成功！");
                //刷新 学科列表
                this.getSubjectList();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              window.console.log(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  },
  created() {
    //页面一加载 获取学科列表
    this.getSubjectList();
  }
};
</script>
<style lang="less">
.demo-form-inline {
  .short {
    width: 100px;
  }
  .long {
    width: 150px;
  }
}
.table-content {
  margin-top: 20px;
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>