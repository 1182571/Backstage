// 注册为全局组件 封装自己的button 有提示
<template>
  <a :title="title" style="margin: 10px">
    <el-button v-bind="$attrs" v-on="$listeners"> </el-button>
  </a>
</template>

<script>
export default {
  name: "HintButton",
  props: ["title"],
};
</script>

<style></style>
