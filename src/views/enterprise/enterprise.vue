<template>
  <div>
    <!-- 顶部 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="obj.eid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
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
          <el-button type="primary" @click="searchEnterprise">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addEnterprise">
            <i class="el-icon-plus"></i>&nbsp;新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="table-content">
      <el-table :data="entList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column label="创建日期" width="180">
          <template slot-scope="scope">{{scope.row.create_time | myTime}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <el-link type="primary" @click="editEnterprise(scope.row)">编辑</el-link>&nbsp;
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
    <!-- 新增企业组件 -->
    <!-- <entAdd ref="entAdd"></entAdd> -->
    <!-- 编辑企业组件 -->
    <!-- <entEdit ref="entEdit"></entEdit> -->
    <!-- 新增/编辑 企业的组件 -->
    <processEnt ref="processEnt"></processEnt>
  </div>
</template>
<script>
//导入 新增企业组件
// import entAdd from "./com/entAdd";
//导入 编辑企业组件
// import entEdit from "./com/entEdit";
//导入 新增/编辑 企业的组件
import processEnt from "./com/processEnt";
//导入 操作方法的接口
import {
  apiEnterList,
  apiEnterStatus,
  apiEnterDelate
} from "@/api/enterprise.js";
export default {
  components: {
    // entAdd,
    // entEdit,
    processEnt
  },
  data() {
    return {
      obj: {
        name: "", //企业名称
        page: 1, //当前页码
        limit: 2, //页容量
        eid: "", //企业编号
        username: "", //创建者
        status: "" //状态
      },
      entList: [], //企业信息列表
      pageSizeArr: [2, 4, 8], //页容量分组
      counts: 0 //当前数据总数
    };
  },
  methods: {
    //获取 企业列表
    getEnterprise() {
      apiEnterList(this.obj)
        .then(res => {
          if (res.data.code === 200) {
            //给企业列表赋值
            this.entList = res.data.data.items;
            //给 总企业数 赋值
            this.counts = res.data.data.pagination.total;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    //筛选
    searchEnterprise() {
      //刷新企业列表
      this.getEnterprise();
    },
    //清除
    clearSearch() {
      this.obj.eid = "";
      this.obj.name = "";
      this.obj.username = "";
      this.obj.status = "";
    },
    //新增
    addEnterprise() {
      //   this.$refs.entAdd.dialogFormVisible = true;
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isEdit = false;
    },
    //编辑
    editEnterprise(row) {
      //   this.$refs.entEdit.dialogFormVisible = true;
      //   if (row.id !== this.$refs.entEdit.form.id) {
      //     this.$refs.entEdit.form = JSON.parse(JSON.stringify(row));
      //   }
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isEdit = true;
      if (row.id !== this.$refs.processEnt.form.id) {
        this.$refs.processEnt.form = JSON.parse(JSON.stringify(row));
      }
    },
    //禁用/启用
    disable(row) {
      apiEnterStatus(row.id)
        .then(res => {
          if (res.data.code == 200) {
            if (row.status == 0) {
              this.$message.success("启用成功!");
            } else {
              this.$message.success("禁用成功!");
            }
            //刷新 企业列表
            this.getEnterprise();
          } else {
            window.console.log(res.data.message);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    //删除
    delate(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiEnterDelate(row.id)
            .then(res => {
              if (res.data.code == 200) {
                if (this.entList.length == 1) {
                  this.obj.page--;
                }
                //刷新 企业列表
                this.getEnterprise();
                this.$message.success("删除成功!");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              window.console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //页容量改变事件
    sizeChange(index) {
      //改变当前页容量
      this.obj.limit = index;
      //刷新 企业列表
      this.getEnterprise();
    },
    //页码改变事件
    currentChange(index) {
      //改变当前页码
      this.obj.page = index;
      //刷新 企业列表
      this.getEnterprise();
    }
  },
  created() {
    //发送请求 获取企业列表
    this.getEnterprise();
  }
};
</script>
<style>
</style>