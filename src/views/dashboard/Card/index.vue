<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售量" count="123">
            <template slot="charts">
              <span
                >周同比56%
                <svg
                  t="1656995659705"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3419"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 384L512 128 256 384h192v512h128V384z"
                    p-id="3420"
                  ></path></svg
              ></span>
              <span
                >日同比19%
                <svg
                  t="1656995718447"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4437"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 640l-256 256-256-256h192V128h128v512z"
                    p-id="4438"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer"> 日销售额12345 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="222">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer"> 日访问量12345 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="22233">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer"> 转化率12345 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="4234">
            <template slot="charts">
              <progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span
                >周同比56%
                <svg
                  t="1656995659705"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3419"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 384L512 128 256 384h192v512h128V384z"
                    p-id="3420"
                  ></path></svg
              ></span>
              <span
                >日同比19%
                <svg
                  t="1656995718447"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4437"
                  width="16"
                  height="16"
                >
                  <path
                    d="M768 640l-256 256-256-256h192V128h128v512z"
                    p-id="4438"
                  ></path></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import barCharts from './barCharts'
import lineCharts from "./lineChart/";
import Detail from "./Detail/";
import progressCharts from './progressCharts'
export default {
  name: "Card",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  },
};
</script>

<style></style>
