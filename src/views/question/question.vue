<template>
  <div>
    <!-- 顶部 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline" label-width="103px" >
        <el-form-item label="学科">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="请选择学科" value></el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
            <el-option label="老师" :value="3">老师</el-option>
            <el-option label="学生" :value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="请选择阶段" value></el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
            <el-option label="老师" :value="3">老师</el-option>
            <el-option label="学生" :value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="请选择企业" value></el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
            <el-option label="老师" :value="3">老师</el-option>
            <el-option label="学生" :value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="请选择题型" value></el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
            <el-option label="老师" :value="3">老师</el-option>
            <el-option label="学生" :value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="难度">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="请选择难度" value></el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
            <el-option label="老师" :value="3">老师</el-option>
            <el-option label="学生" :value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="obj.email" class="long"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="请选择状态" value></el-option>
            <el-option label="管理员" :value="2">管理员</el-option>
            <el-option label="老师" :value="3">老师</el-option>
            <el-option label="学生" :value="4">学生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="obj.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="标题">
          <el-input v-model="obj.email" class="long"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUser">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">
            <i class="el-icon-plus"></i>&nbsp;新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="table-content">
      <el-table :data="userList" style="width: 100%" :border="true">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="role" label="角色" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <el-link type="primary" @click="editUser(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disable(scope.row)">{{scope.row.status?"禁用":"启用"}}</el-link>&nbsp;
            <el-link
              type="primary"
              @click="delate(scope.row)"
              v-if="['管理员','超级管理员'].includes($store.state.roles)"
            >删除</el-link>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      //筛选使用数据
      obj: {
        date: "", //日期
        username: "",
        email: "",
        role_id: "", //角色
        page: 1, //当前页
        limit: 4 //当前页容量
      },
      //表格数据
      userList: [],
      //页容量分组
      pageSizeArr: [2, 4, 8],
      //数据总条数
      counts: 0
    };
  },
  methods: {
    //获取用户列表
    getUserList() {},
    //筛选用户
    searchUser() {
      this.getUserList();
    },
    //清除筛选
    clearSearch() {
      this.obj.username = "";
      this.obj.email = "";
      this.obj.role_id = "";
    },
    //新增用户
    addUser() {},
    //禁用/启用
    disable() {},
    //删除用户
    delate() {},
    //改变页容量
    sizeChange(index) {
      this.obj.limit = index;
      //刷新用户列表
      this.getUserList();
    },
    //改编页码
    currentChange(index) {
      this.obj.page = index;
      //刷新用户列表
      this.getUserList();
    }
  },
  created() {
    //页面一加载 获取用户列表
    this.getUserList();
  }
};
</script>
<style>
</style>