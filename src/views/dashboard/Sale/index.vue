<template>
  <el-card class="box-card" style="margin:10px;0px">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <el-tabs class="tab" v-model="activename">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <!-- 右侧内容 -->
        <span @click="setDay">本日</span>
        <span @click="setWeek">本周</span>
        <span @click="setmonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="data"
          value-format="yyyy-MM-dd"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <bar :activename="activename"></bar>
        </el-col>
        <el-col :span="6" class="right">
          <list :activename="activename"></list>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
import bar from "./bar/";
import list from "./list";

export default {
  name: "",

  components: {
    bar,
    list,
  },
  data() {
    return {
      activename: "销售额",
      data: [],
    };
  },
  methods: {
    setDay() {
      let day = dayjs().format("YYYY-MM-DD");
      this.data = [day, day];
    },
    setWeek() {
      let start = dayjs().day(1).format("YYYY-MM-DD");
      let end = dayjs().day(7).format("YYYY-MM-DD");
      this.data = [start, end];
    },
    setmonth() {
      let start = dayjs().startOf("month").format("YYYY-MM-DD");
      let end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.data = [start, end];
    },
    setYear() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.data = [start, end];
    },
  },
};
</script>

<style>
.clearfix {
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  padding: 0;
}
.clearfix {
  position: relative;
}
.date {
  width: 200px;
  margin: 0 20px;
}
.right span {
  padding: 0 10px;
}

</style>
