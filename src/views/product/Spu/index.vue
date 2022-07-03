<template>
  <div>
    <!-- 三级联动结构 -->
    <el-card style="margin: 20px 0px">
      <CategorySeletect :show="scene != 0" @getCategroyId="getCategroyId" />
    </el-card>
    <el-card>
      <!-- 底部这里是有三部分切换的 -->
      <!-- 展示spu列表解构 -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="flag" @click="addSpu">添加spu</el-button>
        <el-table border style="width: 100%; margin: 10px 0px" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="spuName" label="spu名称" align="center" />
          <el-table-column prop="description" label="spu描述" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row, $index }">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"/>
              <!-- 修改的时候要把里面的内容给组件 row-->
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spusku" @click="UpdateSpu(row)" />
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" />
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm='deleteSpu(row)'>
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
               @current-change="handleCurrentChange" -->
        <el-pagination style="text-align: center" :current-page="page" :page-sizes="[1, 3, 5]" :page-size="limit" layout=" prev, pager, next, jumper ,->,total, sizes" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
      </div>
      <!-- v-show 在mounted发请求的话 只会发一次 v-if可以是真正意义上的渲染 -->
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @changeScence="changeScences"></SkuForm>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SkuForm from "./SkuForm/";
import SpuForm from "./SpuForm/";
export default {
  name: "Spu",
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      category1id: "",
      category2id: "",
      category3id: "",
      // 分页器初始化参数
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0,
      flag: true,
    };
  },
  methods: {
    //通知父组件修改场景
    changeScences(scence){
        this.scene = scence
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPutList();
    },
    //   分页器点击第几页的回调
    handleCurrentChange(page) {
      this.page = page;
      this.getPutList();
    },
    //   三级联动自定义事件 可以把子组件相应的id传给父组件
    getCategroyId({ categoryid, leave }) {
      if (leave === 1) {
        this.category1id = categoryid;
        this.category2id = "";
        this.category3id = "";
      } else if (leave === 2) {
        this.category2id = categoryid;
        this.category3id = "";
      } else {
        this.category3id = categoryid;
        this.flag = false;
        this.getPutList();
      }
    },
    async getPutList() {
      const { page, limit, category3id } = this;
      const result = await this.$API.spu.reqSpuList(page, limit, category3id);
      this.records = result.data.records;
      this.total =result.data.total
    },
    // 添加spu
    addSpu() {
      this.scene = 1;
      //  通知子组件发请求
      this.$refs.spu.addSpuData(this.category3id);
    },
    // 修改某一个spu
    UpdateSpu(row) {
      this.scene = 1;
      // 点击修改之后    每一次点击都会在子组件发送请求
      //父组件通过ref获取子组件属性 也可以调用子组件的方法  点击发送请求
      // row里有当前的id
      this.$refs.spu.initSpuDate(row);
    },
    // 自定义事件回调  flag为了区分保存按钮是添加还是修改
    changeScene({ scence, flag }) {
      this.scene = scence;
      //子组件通知父组件切换场景 需要再次获取列表
      if (flag == "修改") {
        this.getPutList(this.page);
      } else {
        this.getPutList();
      }
    },
    //删除spu按钮
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '成功'
        })
        //this.getPutList(this.page=1)
        //this.getPutList(this.records.length>1?this.page:this.page-1)
        console.log(this.records.length>1?this.page:this.page-1);
      }
    },
    //添加sku按钮
    addSku(row){
        //console.log(row);
        this.scene = 2
        this.$refs.sku.getData(this.category1id,this.category2id,row)
    }
  },
};
</script>

<style></style>
