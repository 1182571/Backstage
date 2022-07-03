<template>
  <el-form :inline="true" class="demo-form-inline" :model="cForm">
    <el-form-item label="一级分类">
      <!-- select可以进行v-model数据收集 收集到的是value -->
      <el-select
        v-model="cForm.category1id"
        placeholder="请选择"
        :disabled="show"
        @change="handler1"
      >
        <el-option
          v-for="c1 in list1"
          :key="c1.id"
          :label="c1.name"
          :value="c1.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        v-model="cForm.category2id"
        placeholder="请选择"
        :disabled="show"
        @change="handler2"
      >
        <el-option
          v-for="c2 in list2"
          :key="c2.id"
          :label="c2.name"
          :value="c2.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        v-model="cForm.category3id"
        placeholder="请选择"
        :disabled="show"
        @change="handler3"
      >
        <el-option
          v-for="c3 in list3"
          :key="c3.id"
          :label="c3.name"
          :value="c3.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CategorySeletect',
  props: ['show'],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      //   收集相应的一级二级三级的idcategory1id
      cForm: {
        category1id: '',
        category2id: '',
        category3id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code == 200) {
        this.list1 = result.data
      }
    },
    //   一级分类的select发生变化时 触发
    async handler1() {
      // 清楚数据 上一次的id
      this.list2 = [];
      (this.list3 = []), (this.cForm.category2id = '')
      this.cForm.category3id = ''
      // 解构出一级分类的id
      const { category1id } = this.cForm
      this.$emit('getCategroyId', { categoryid: category1id, leave: 1 })
      const result = await this.$API.attr.reqCategory2List(category1id)
      if (result.code == 200) {
        this.list2 = result.data
      }
    },
    // 二级分类发生改变时触发
    async handler2() {
      this.list3 = []

      this.cForm.category3id = ''
      const { category2id } = this.cForm
      this.$emit('getCategroyId', { categoryid: category2id, leave: 2 })
      const result = await this.$API.attr.reqCategory3List(category2id)
      if (result.code == 200) {
        this.list3 = result.data
      }
    },
    // 三级分类事件回调
    handler3() {
      const { category3id } = this.cForm
      this.$emit('getCategroyId', { categoryid: category3id, leave: 3 })
    }
  }
}
</script>

<style></style>
