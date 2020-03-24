<template>
  <div>
    <!-- 顶部 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user" class="long"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态" class="long">
            <el-option label="启用" value="able"></el-option>
            <el-option label="禁用" value="unable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
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
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="short_name" label="创建者"></el-table-column>
        <el-table-column prop="username" label="创建日期"></el-table-column>
        <el-table-column prop="create_time" label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <el-link type="primary">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disable(scope.row)">{{scope.row.status?"禁用":"启用"}}</el-link>&nbsp;
            <el-link type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background :current-page="currentPage" :page-sizes="pageSizeArr" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="counts" >
      </el-pagination>
    </el-card>
    <!-- 新增学科 dialog框 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>
<script>
//导入 操作学科列表的数据的 api
import { getSubject,changeStatus } from '@/api/subject.js';
//导入 addDialog 框
import addDialog from './com/addDialog';
export default {
  components:{
    addDialog
  },
  data() {
    return {
      //顶部页 数据
      formInline: {
        user: "",
        region: ""
      },
      //表格 数据
      subjectList:[],
      //分页 数据
      currentPage: 1, //当前页
      pageSizeArr: [10, 20, 30], //页容量分组
      pageSize: 10, //当前页容量
      counts: 30 //当前数据总数
    };
  },
  methods: {
    addSubject() {
      this.$refs.addDialog.dialogFormVisible="true";
    },
    //获取学科列表
    getSubjectList(){
      getSubject({}).then((res)=>{
        this.subjectList = res.data.data.items;
      }).catch(error=>{
        window.console.log(error);
      })
    },
    //禁用按钮点击事件
    disable(row){
      let id = row.id;
      changeStatus(id).then(res=>{
        if(res.data.code==200){
          //重新获取学科列表
          this.getSubjectList();
          if(row.status===0){
            this.$message.success("启用成功！");
          }else{
            this.$message.success("禁用成功！");
          }
        }else{
          this.$message.error(res.data.message);
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  created() {
    //页面一加载 获取学科列表
    this.getSubjectList();
  },
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