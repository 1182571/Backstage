<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="spu名称"> {{ spu.spuName }} </el-form-item>

      <el-form-item label="sku名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <!--  type='number' 有右边的箭头 -->
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr, index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">>
          <el-table-column prop="prop" width="80" type="selection">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row, spuImageList)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cansel">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      //图片的信息
      spuImageList: [],
      //销售属性
      spuSaleAttrList: [],
      //存储平台属性
      attrInfoList: [],
      //收集sku数据字段
      skuInfo: {
        //第一类数据 通过父组件传递过来
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类 数据的双向绑定
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //第三类 需要自己写代码 手动收集
        //默认图片
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [
          //  {
          //    imgName: "string",
          //    imgUrl: "string",
          //    isDefault: "string",
          //    spuImgId: 0,
          //  },
        ],
        //平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0,
          },
        ],
        //销售属性列表  但是缺少isdefault字段
        skuSaleAttrValueList: [
          //  {
          //    id: 0,
          //    saleAttrId: 0,
          //    saleAttrName: "string",
          //    saleAttrValueId: 0,
          //    saleAttrValueName: "string",
          //    skuId: 0,
          //    spuId: 0,
          //  },
        ],
      },
      spu: {},
      //  收集用户选中的图片
      imagesList: [],
    };
  },
  methods: {
    //获取sku数据 发请求
    async getData(category1Id, category2Id, spu) {
      //收集父组件给的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      //  获取图片信息
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      if (result.code == 200) {
        let list = result.data;
        //在服务器返回数据的时候加上isdefault字段
        list.forEach((element) => {
          element.isDefault = 0;
        });
        this.spuImageList = list;
      }
      //  获取销售属性
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      //  获取平台属性
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    handleSelectionChange(params) {
      //params是用户点击的图片的数据  但是缺少isdefault字段
      this.imagesList = params;
    },
    //点击排他
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      //  默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //取消按钮
    cansel() {
      this.$emit("changeScence", 0)
      Object.assign(this._data, this.$options.data())
    },
    //保存按钮
    async save() {
      //整理平台属性
      const { attrInfoList, skuInfo, spuSaleAttrList, imagesList } = this

      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":")
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])

      //  整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(":")
          prev.push({ saleAttrId, saleAttrValueId })

        }
        return prev
      }, [])
      //  整理图片的数据  map映射出一个新的数组给他
      skuInfo.skuImageList = imagesList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        }
      })
      //发请求
     let result =  await this.$API.spu.reqAddsku(skuInfo)
     if(result.code ==200){
         this.$message({
             type:'success',
             message:'成功'
         })
         this.$emit('changeScences',0)
     }
    }
  },
};
</script>

<style></style>
