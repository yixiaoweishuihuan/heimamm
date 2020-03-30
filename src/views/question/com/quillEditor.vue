<template>
  <quill-editor
    ref="myQuillEditor"
    :value="value"
    @input="v=>{$emit('input',v)}"
    :options="editorOption"
  />
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      editorOption: {
          // Some Quill options...
        }
    }
  }
};
</script>
<style>
</style>