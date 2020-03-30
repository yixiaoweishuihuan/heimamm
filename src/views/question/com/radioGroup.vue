<template>
  <div>
    <el-radio :label="label" class="aRadio">
      <span>{{label}}</span>
      <el-input class="input" :value="text" @changeText="v=>{$emit('input',v)}"></el-input>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-radio>
  </div>
</template>
<script>
export default {
  props: ["label", "text", "image"],
  data() {
    return {
      uploadUrl: process.env.VUE_APP_URL + "/question/upload", //文件上传地址
      // imageUrl: process.env.VUE_APP_URL + this.image //上传的图片地址
      imageUrl: "" //上传的图片地址
    };
  },
  methods: {
    //上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("change", res.data.url);
    },
    //上传前的回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less">
.aRadio {
  display: flex;
  align-items: center;
  margin-bottom: 45px;
  .el-radio__label {
    display: flex;
    align-items: center;
    .input {
      .el-input__inner {
        width: 476px;
      }
      margin: 0 20px 0 29px;
    }
  }
}
</style>