<template>
  <div class="enterprise-container">
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="企业名称">
        <el-input v-model="formInline.user" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="top">
      <el-button type="primary">添加企业</el-button>
    </div>
    <!-- 表格 -->
    <my-table 
    :datalist="enterList"
    :columns="tableColumns" 
    :type-index=true
    >
    <!-- <template #cardStatus="{ row }">
        {{ formatStatus(row) }}
    </template> -->

  </my-table>

  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
import MyTable from '@/components/MyTable.vue'
import {getEnterpriseListAPI} from '@/apis/enterprise'
export default {
  components:{
    MyTable
  },
  name: 'Building',
  data() {
    return {
       //请求参数
       params: {
        page: '1',
        pageSize: '10',
      },
      //搜索数据
      formInline:{
        user:''
      },
       //表格数据
       tableColumns: [
        { title: '企业名称', dataIndex: 'name' },
        { title: '联系人', dataIndex: 'contact'},
        { title: '联系电话', dataIndex: 'contactNumber' },
        {
          title: '操作',
          dataIndex: 'do',
          watch:300,
          fun: [
            { iconName: 'edit', btnName: '添加合同', type: 'text' },
            { iconName: 'edit', btnName: '查看', type: 'text' },
            { iconName: 'edit', btnName: '编辑', type: 'text' },
            { iconName: 'edit', btnName: '删除', type: 'text' }
          ]
        }
      ],
      enterList:[],
      //总条数
      total: 0
    }
  },
  mounted(){
    //调用
    this.getEnterList()
  },
  methods:{
    async getEnterList(){
    const res= await getEnterpriseListAPI(this.params)
    // console.log(res);
    this.enterList=res.data.rows
    this.total=res.data.total
    },
    onSubmit() {
      console.log('submit!');
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
