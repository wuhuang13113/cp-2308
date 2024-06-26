<template>
  <div class="card-container">
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="车牌号码">
        <el-input v-model="formInline.user" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="车主姓名">
        <el-input v-model="formInline.user" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="可用" value="0"></el-option>
          <el-option label="已过期" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="top">
      <el-button type="primary">添加月卡</el-button>
      <el-button>批量删除</el-button>
    </div>

    <!-- 表格 -->
    <my-table 
    :cardList="cardList"
    :columns="tableColumns" 
    :type-index=true
    ></my-table>


    <!-- <el-table :data="cardList" style="width: 100%">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="personName" label="车主名称" />
      <el-table-column prop="phoneNumber" label="联系方式" />
      <el-table-column prop="carNumber" label="车牌号码" />
      <el-table-column prop="carBrand" label="车辆品牌" />
      <el-table-column prop="totalEffectiveDate" label="剩余有效天数" /> 
      <el-table-column prop="cardStatus" label="状态">
        <template slot-scope="scope">
          <div>{{ scope.row.cardStatus == 0 ? '可用' : '已过期' }}</div>
        </template>
</el-table-column>

<el-table-column label="状态" prop="cardStatus" :formatter="formatStatus" />

<el-table-column label="操作" fixed="right" width="170px">
  <template slot-scope="scope">
          <div>
            <el-button type="text" size="small">续费</el-button>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </div>
        </template>
</el-table-column>
</el-table> -->

    <!-- 分页 -->
    <div class="card-pag">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="100"
        layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MyTable from '@/components/MyTable.vue';
import { getCardListAPI } from '@/apis/card';
export default {
  components: {
    'my-table':MyTable
  },
  data() {
    return {
      //请求参数
      params: {
        page: '1',
        pageSize: '10',
      },
      //搜索框值
      formInline: {
        user: '',
        region: ''
      },
      //表格数据
      tableColumns: [
        { title: '车主名称', dataIndex: 'personName'},
        { title: '联系方式', dataIndex: 'phoneNumber' },
        { title: '车牌号码', dataIndex: 'carNumber' },
        { title: '车辆品牌', dataIndex: 'carBrand' },
        { title: '剩余有效天数', dataIndex: 'totalEffectiveDate' },
        { title: '状态', dataIndex: 'cardStatus' },
        {
          title: '操作',
          dataIndex: 'do',
          watch:300,
          fun: [
            { iconName: 'edit', btnName: '续费', type: 'text' },
            { iconName: 'edit', btnName: '查看', type: 'text' },
            { iconName: 'edit', btnName: '编辑', type: 'text' },
            { iconName: 'edit', btnName: '删除', type: 'text' }
          ]
        }
      ],
      cardList:[],
      //总条数
      total: 0
    };
  },
  mounted() {
    getCardListAPI(this.params).then(res => {
      console.log(res);
      this.cardList = res.data.rows
      this.total = res.data.total
    })
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    formatStatus(row) {
      const MAP = {
        0: '可用',
        1: '已过期'
      }
      return MAP[row.cardStatus]
    }
  },
  computed: {},
  filters: {},
  watch: {
  }
};
</script>

<style lang="scss" scoped>
.card-pag {
  float: right;
}
</style>