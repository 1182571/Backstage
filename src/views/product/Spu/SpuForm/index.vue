<template>
  <div>
    {{ unSelectSaleAttr }}
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <!--v-model="spu.spuName"这里收集的是收集到了服务器返回的对象身上,但是添加是全新的 没有这些字段属性  -->
        <el-input placeholder="spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkRList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="spu描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>

      <el-form-item label="spu照片">
        <!-- 图片上传地址   类型照片墙 list-type   两个回调查看删除照片触发-->
        <el-upload :file-list="spuImagesList" action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handLerSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`" v-for="unSelect in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column align="center" type="index" prop="prop" label="序号" width="80"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <!--  @close="handleClose(tag)" -->
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- span与input的切换
               @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addOrUpdataSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 收集未选择的销售属性
      attrIdAndAttrName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      //spu信息属性 初始化的时候是空对象  在修改的时候 会把服务器返回的数据(对象) 赋值给spu
      //但是添加是全新的 没有这些字段属性
      spu: {
        //三级分类的id 添加时候用
        category3Id: 0,
        // 描述初始值
        description: "",
        // spu名称
        spuName: "",
        // 品牌ID
        tmId: "",
        // spu图片信息
        spuImageList: [
          //   {
          //     id: 0,
          //     imgName: "string",
          //     imgUrl: "string",
          //     spuId: 0,
          //   },
        ],
        // 平台属性与属性值
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      },
      tradeMarkRList: [],
      //spu图片数据
      spuImagesList: [],
      //   销售属性的数据
      saleAttrList: [],
    };
  },
  methods: {
    //  保存按钮的
    async addOrUpdataSpu() {
      //整理照片墙参数
      //给每一个item映射一个新的字段  并赋值给当前数组
      this.spu.spuImageList = this.spuImagesList.map((item) => {
        return {
          imageName: item.name,
          // 如果对于新图 数据是在response.data下
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      //  整理完参数发请求
      let result = await this.$API.spu.reqAddOrUpdataSpu(this.spu);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        //回到场景0
        this.$emit("changeScene", { scence: 0, flag: this.spu.id ? '修改' : '添加' });
      }
      Object.assign(this._data,this.$options.data())
    },
    //handleInputConfirm输入框失去焦点
    handleInputConfirm(row) {
      //解构出销售属性当中收集的数据
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("值不能为空");
        return;
      }
      //  属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;

      //  新增的销售属性值
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    //  添加按钮  需要展示input 通过销售属性的inputVisible
    addSaleAttrValue(row) {
      //  row.inputVisible  =true//不是响应式的
      //收集input的value
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    // 照片墙删除某一个图片file代表删除的那张图  fileList剩余的其他的图片
    // 收集照片墙剩余的list
    handleRemove(file, fileList) {
      console.log(file, fileList);
      //对于已有的图片 照片墙中显示的图片有name url字段 因为照片墙显示数据必须有这两个字段
      //  对于服务器而言 不需要name url字段 将来带给服务器的时候需要处理
      this.spuImageList = fileList;
    },
    //handLerSuccess照片图片上传成功的回调
    handLerSuccess(response, file, filelist) {
      // 收集图片信息
      this.spuImagesList = filelist;
    },
    // 照片墙预览
    handlePictureCardPreview(file) {
      // 照片路径
      this.dialogImageUrl = file.url;
      //   对话框的显示
      this.dialogVisible = true;
    },
    //父组件通过ref获取子组件属性 也可以调用子组件的方法  点击发送请求
    async initSpuDate(spuid) {
      // 获取spu信息接口  需要带id
      let spuResult = await this.$API.spu.reqSpu(spuid.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //   获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkRList = tradeMarkResult.data;
      }
      //获取图片数据
      let spuImageRestult = await this.$API.spu.reqImageList(spuid.id);
      if (spuImageRestult.code == 200) {
        //   照片墙需要的数据url name 需要把服务器返回的数据进行处理
        let listArr = spuImageRestult.data;
        listArr.forEach((element) => {
          element.name = element.imgName;
          element.url = element.imgUrl;
        });
        this.spuImagesList = listArr;
      }
      //获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //添加已经收集到的新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    //点击添加spu按钮 发送的请求
    async addSpuData(category3id) {
      //添加spu的时候 父组件传过来的spu3id
      this.spu.category3Id = category3id
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkRList = tradeMarkResult.data;
      }
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消按钮 通知父亲切换场景0
    cancel() {
      this.$emit('changeScene', { scence: 0, flag: '' })
    //  清理数组 es6新增的方法可以合并对象 assign
    // this._data 是当前data的值
    // this.$options是当前配置对象 返回的响应式数据是空的  赋值给响应式数据
    Object.assign(this._data,this.$options.data())
    
    }
  },
  //   计算出还未选择的属性
  computed: {
    unSelectSaleAttr() {
      return this.saleAttrList.filter((item) => {
        //   every要么真要么假 取决于return的结果
        return this.spu.spuSaleAttrList.every((item1) => {
          // 如果两个不相等则是需要的属性
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
