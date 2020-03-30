<template>
  <div>
    <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择企业">
      <template v-for="(item, index) in enterpriseList">
        <el-option :key="index" :label="item.name" :value="item.id"></el-option>
      </template>
    </el-select>
  </div>
</template>
<script>
//导入 获取企业列表的方法
import { apiEnterList } from "@/api/enterprise.js";
export default {
  props: ["value"],
  data() {
    return {
      enterpriseList: []
    };
  },
  methods: {
    //获取企业列表
    enterprise() {
      apiEnterList({})
        .then(res => {
          this.enterpriseList = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //获取企业列表
    this.enterprise();
  }
};
</script>
<style>
</style>