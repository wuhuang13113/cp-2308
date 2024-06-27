<template>
  <div class="card-container">
     <!-- 查询 -->
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="车牌号码">
        <el-input v-model="params.carNumber" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="车主姓名">
        <el-input v-model="params.personName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="params.cardStatus" placeholder="状态">
          <el-option 
          v-for="(item, index) in cardStatusList" 
          :key="item.id"
          :value="item.id"
          :label="item.name"/>
         
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="top">
      <el-button type="primary">添加月卡</el-button>
      <el-button>批量删除</el-button>
    </div>

    <!-- 表格 -->
    <my-table 
    :datalist="cardList"
    :columns="tableColumns" 
    :type-index="true"
    :select-type="true"
    @handleEvent="handleFn"
    @selection-change="handleSelectionChange"
    >
    <template #cardStatus="{ row }">
        {{ formatStatus(row) }}
    </template>
  </my-table>


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
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :page-size="100"
      layout="total, prev, pager, next" 
      :total="total">
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
        carNumber: null,//车辆号码
        personName: null,//车主姓名
        cardStatus: null //车辆状态
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
          watch:350,
          fun: [
            { iconName: 'xf', btnName: '续费', type: 'text' },
            { iconName: 'show', btnName: '查看', type: 'text' },
            { iconName: 'edit', btnName: '编辑', type: 'text' },
            { iconName: 'del', btnName: '删除', type: 'text' }
          ]
        }
      ],
      cardList:[],
      //总条数
      total: 0,
      // 月卡状态
      cardStatusList: [
        {
          id: null,
          name: '全部'
        },
        {
          id: 0,
          name: '可用'
        },
        {
          id: 1,
          name: '已过期'
        }
      ]
    };
  },
  mounted() {
    this.getCardList()
  },
  methods: {
    handleSelectionChange(val){
            console.log(val,'556');
        },
        handleFn(btn,row){
           console.log(btn,row,'555');
        },
    //方法
    doSearch() {
      // console.log('submit!');
      //调用接口之前把页数重置为1
      this.params.page = 1;
      this.getCardList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    async getCardList(){
      const res= await getCardListAPI(this.params)
      console.log(res);
      this.cardList = res.data.rows
      this.total = res.data.total
    },
 
    //格式化状态
    formatStatus(row) {
      const MAP = {
        0: '可用',
        1: '已过期'
      }
      return MAP[row.cardStatus]
    }
  },
//   computed: {
//  //格式化状态
//  formatStatus(row) {
//       const MAP = {
//         0: '可用',
//         1: '已过期'
//       }
//       return MAP[row.cardStatus]
//     }
    
//   },
};
</script>

<style lang="scss" scoped>
.card-pag {
  float: right;
}
</style>


