<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
    </el-upload>
    <div>
      <video v-if="videoUrl" :src="videoUrl" loop controls class="video"></video>
    </div>
  </div>
</template>
<script>
export default {
  props:["videoURL"],
  data() {
    return {
      uploadUrl: process.env.VUE_APP_URL + "/question/upload", //文件上传地址
      // videoUrl: process.env.VUE_APP_URL + this.videoURL //上传的图片地址
      videoUrl: '' //上传的图片地址
    };
  },
  methods: {
    //上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.$emit("changeVideo",res.data.url);
    },
    //上传前的回调函数
    beforeAvatarUpload(file) {
      const isMP4 = file.type === "video/mp4";
      const isLt8M = file.size / 1024 / 1024 < 8;

      if (!isMP4) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt8M) {
        this.$message.error("上传视频大小不能超过 8MB!");
      }
      return isMP4 && isLt8M;
    }
  }
};
</script>
<style>
.el-upload__tip {
  margin-left: 95px;
}
.video {
  margin-top: 30px;
  width: 400px;
}
</style>