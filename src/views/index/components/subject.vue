<template>
  <div>
    <!-- 顶部 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.user" class="short"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
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
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i>&nbsp;新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="table-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="num" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="date" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template>
            <el-link type="primary">编辑</el-link>&nbsp;
            <el-link type="primary">禁用</el-link>&nbsp;
            <el-link type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="pageSizeArr"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //顶部页 数据
      formInline: {
        user: "",
        region: ""
      },
      //表格 数据
      tableData: [
        {
          id: 1,
          num: "QD001",
          name: "黑马程序员",
          creater: "刘洋洋",
          date: "2019-11-21",
          status: 1
        },
        {
          id: 2,
          num: "QD001",
          name: "阿里巴巴",
          creater: "北冰洋",
          date: "2019-11-21",
          status: 0
        }
      ],
      //分页 数据
      currentPage: 1, //当前页
      pageSizeArr: [10, 20, 30], //页容量分组
      pageSize: 10, //当前页容量
      counts: 30 //当前数据总数
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
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