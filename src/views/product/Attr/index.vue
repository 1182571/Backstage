<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySeletect @getCategroyId="getCategroyId" :show='!isShowTable'></CategorySeletect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="address" label="属性值列表">
            <template slot-scope="{ row, index }">
              <!-- row就是attrList的每一项 -->
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
            <!-- 删除也需要作用域插槽 这样删除的时候才能知道id -->
            <template slot-scope="{ row, index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button type="primary" @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toedit(row, $index)"
                style="display: block; heigth: 100px"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除${row.valueName}`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="AddOrUpdate" :disabled='attrInfo.attrValueList.length < 1'>保存</el-button>
        <el-button type="primary" @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1id: "",
      category2id: "",
      category3id: "",
      //控制span的显示隐藏  这里成了控制全部的了
      //   flag: true,
      //   接受平台属性的
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "",
        attrValueList: [
          //  起始状态不应该有 到点击的时候再出来
        ],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategroyId({ categoryid, leave }) {
      if (leave == 1) {
        this.category1id = categoryid;
        this.category2id = "";
        this.category3id = "";
      } else if (leave == 2) {
        this.category3id = "";
        this.category2id = categoryid;
      } else {
        //   代表三级分类id有了 可以发请求获取数据
        this.category3id = categoryid;
        this.getAttrList();
      }
    },
    // 获取平台属性 当确定三级分类后发请求
    async getAttrList() {
      //接口需要三个id 获取分类ID
      const { category1id, category2id, category3id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1id,
        category2id,
        category3id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值的回调
    addAttrValue() {
      // 向属性值属性里面添加属性
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于已有的属性值修改的时候 新增的属性值也要有id 就是已有的属性
        valueName: "",
        // 给自己的属性身上各自添加 这样控制的就是自己的了
        flag: true,
      });
      this.$nextTick(() => {
        console.log(this.$refs);
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [
          //  起始状态不应该有 到点击的时候再出来
        ],
        categoryId: this.category3id,
        categoryLevel: 3,
      };
    },
    // 修改属性的
    updateAttr(row) {
      console.log(row);
      this.isShowTable = false;
      //实质这里的对象指向的是同一个地址 一个变都变 由于数据里面有一个数组 浅拷贝无法实现 所以用到深拷贝  浅拷贝就是只拷贝一层 深拷贝是全部层都拷贝 老师没有说错
      this.attrInfo = cloneDeep(row);
      //   修改某一个属性的时候  给相应的属性值元素加上flag这个标记
      this.attrInfo.attrValueList.forEach((element) => {
        // 但是这样不是响应式的 无法探测新增的属性 element.flag = false
        this.$set(element, "flag", false);
      });
    },
    toLook(row) {
      // 如果输入的是空格
      if (row.valueName.trim() == "") {
        this.$message("输入一个正常的值");
        return;
      }
      // 新增的属性值不能与已有的重复  some遍历的是最新的元素 应该吧最新的row自身元素去除 要不然是重复的
      let res = this.attrInfo.attrValueList.some((item) => {
        // 需要将row去除
        // row是最新的属性值 数组的最后一项元素  判断的时候不能自己跟自己比
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (res) return; //如果出现了重复的 不执行后面的代码
      row.flag = false;
    },
    // 点击span
    toedit(row, index) {
      row.flag = true;
      // 获取input节点实现自动聚焦
      // 点击span的时候 切换为inpit的编辑模式,对于浏览器说 浏览器需要重绘 需要耗费时间 不可能一点击就获取到
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 确认删除的
    deleteAttrValue(index) {
      // 先不用发请求等保存的时候一块发
      this.attrInfo.attrValueList.splice("index", 1);
    },
    // 保存按钮 添加或修改
    async AddOrUpdate() {
      // 整理参数  属性值不为空 不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            // 并且把flag字段删除
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await this.$API.attr.reqAddOrUpdate(this.attrInfo);
        this.isShowTable = true
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
          this.$message('保存失败')
      }
    },
  },
};
</script>

<style></style>
