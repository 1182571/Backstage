<template>
  <div>
    <div class="header">
      <span class="searchheader">搜索用户数</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="main">
      <span class="maintitle">12321</span>
      <span class="maincon">17.1</span>
      <i class="el-icon-caret-bottom" style="color: red"></i>
      <i class="el-icon-caret-top" style="color: greenyellow"></i>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.header {
  display: flex;
  align-items: center;
}
.searchheader {
  margin-right: 20px;
}
.maintitle {
  margin-right: 30px;
}
.main {
  margin: 10px 0;
}
.maincon {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>
