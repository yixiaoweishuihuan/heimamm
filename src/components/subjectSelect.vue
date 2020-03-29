<template>
  <div>
    <el-select class="formItems" :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择学科">
      <template v-for="(item, index) in subjectList">
        <el-option :key="index" :label="item.name" :value="item.id"></el-option>
      </template>
    </el-select>
  </div>
</template>
<script>
//导入 获取学科列表的方法
import { getSubject } from "@/api/subject.js";
export default {
  props: ["value"],
  data() {
    return {
      subjectList: []
    };
  },
  methods: {
    //获取学科列表
    subject() {
      getSubject({})
        .then(res => {
          this.subjectList = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //获取学科列表
    this.subject();
  }
};
</script>
<style>
</style>