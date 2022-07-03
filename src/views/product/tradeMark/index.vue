<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
    >添加</el-button>
    <!-- 表格组件    el-table-column是里面的每一列   border加边框  label现实的标题 width列的宽度
    align对齐方式-->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      />
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- 对于table组件会对每一条数据进行回传 用作用域插槽  row代表作用域插槽回传的每一条数据-->
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="UpdateTradeMark(row)"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-edit"
            size="mini"
            @click="deleteTradeMark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  :current-page="6"当前页 :total="99"总页数 :page-size="3"每一页多少数据 :page-sizes="[3, 5, 10]"每一页展示多少数据  layout怎么布局 pager-count连续页码数-->
    <el-pagination
      style="margin-top: 10px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      layout=" prev, pager, next,jumper,->,total,sizes"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    />
    <!-- 对话框结构 -->
    <el-dialog
      :title="tmForm.id ? '修改' : '添加'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 收集表单的数据绑定一个model  把表单的数据收集到对象身上 表单验证也需要这个属性-->
      <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
      <el-form ref="formName" style="width: 80%" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--on-success可以检测到图片上传成功 会执行一次
            before-upload 上传之前执行一次
             -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 因为不是表单元素不能用v-model收集   action设置图片上传地址-->
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addOrUpdateTradeMark"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    //   自定义校验规则的函数
    var validatePass = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('名称在2-10位'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      // 当前页展示的条数
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false,
      imageUrl: '',
      tmForm: {
        //  对象身上的属性不能瞎写 需要看文档 否则后台收不到
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          // 必须校验的字段   trigger用户的行为方式
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // 自定义校验规则
          { validator: validatePass, trigger: 'change' }
          //   { min: 2, max: 10, message: "长度在 2 到 10 个字符",trigger: "blur",},
        ],
        logoUrl: [{ required: true, message: '请选择图片', trigger: 'change' }]
      }
    }
  },
  //   组件挂在完毕发请求
  mounted() {
    //   写这里只能发一次所以写成一个函数
    this.getPageList()
  },
  methods: {
    //   current-change会默认传第几页 没有传参就用1
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 删除品牌
    deleteTradeMark(row) {
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 当用户点击的时候会触发
        .then(async() => {
          const result = await this.$API.trademark.reqDeleteTrandMark(row.id)
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改品牌的回调
    UpdateTradeMark(row) {
      this.dialogFormVisible = true
      //   将已有的信息赋值给 tofrom  因为将服务器返回的数据给替换了  双向绑定 所以不确定也会修改
      //   使用浅拷贝
      this.tmForm = { ...row }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 点击显示对话框
    showDialog() {
      // 显示对话框前先清空
      // this.tmForm.logoUrl = ''
      // this.tmForm.tmName = ''
      this.tmForm = { tmName: '', logoUrl: '' }
      this.dialogFormVisible = true
    },
    //  图片上传成功的回调
    handleAvatarSuccess(res, file) {
      // res是上传成功的真实数据  真实的地址  file成功后数据
      this.tmForm.logoUrl = res.data
    },
    //  图片上传之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加按钮  或者修改
    addOrUpdateTradeMark() {
      this.$refs.formName.validate(async(success) => {
        if (success) {
          // 先关闭对话框
          this.dialogFormVisible = false
          const result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          )
          if (result.code == 200) {
            this.$message({
              message: this.tmForm.id ? '修改成功' : '添加成功',
              type: 'success'
            })
            this.getPageList(this.tmForm.id ? this.page : 1)
          } else {
            console.log('error submit!!')
            return false
          }
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
