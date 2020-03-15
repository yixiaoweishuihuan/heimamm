<template>
  <div>
    <h1>使用Element</h1>
    <h3>1.0 使用输入框</h3>
    <el-input placeholder="请输入手机号" prefix-icon="el-icon-search" v-model="tel"></el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tel: "" //手机号
    };
  }
};
</script>
<style>
</style>