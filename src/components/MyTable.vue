<template>
    <div class="table">
        <el-table 
        style="width: 100%"
        :data="datalist" 
        v-bind="$attrs"
        v-on="$listeners"
        >

        <!-- 选择框 -->
        <el-table-column
         v-if="selectType"
         type="selection"
         width="75">
        </el-table-column>
      <!-- 序号 -->
        <el-table-column
        v-if="typeIndex"
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          v-for="(column, index) in columns" 
          :key="index"
          :label="column.title" 
          :prop="column.dataIndex"
          >
        <template #default="{ row }">
            <slot :name="column.dataIndex" :row="row">
                
              <template v-if="column.fun">
               <el-button 
               v-for="(btn, ind) in column.fun" 
               :key="ind"
               :type="btn.type"
               size="mini"
               @click="handleFn(btn,row)">
                {{ btn.btnName }}
               </el-button>
              </template>

              <template v-else>
                  {{ row[column.dataIndex] }}
              </template>
            </slot>
        </template>

        </el-table-column>
        </el-table>

           <!-- 分页 -->
    <!-- <div class="card-pag">
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :page-size="100"
      layout="total, prev, pager, next" 
      >
      </el-pagination>
    </div> -->
    </div>
</template>

<script>
export default {
    props: {
        columns: {
            type: [Array],
            default: () => []
        },
        datalist: {
            type: [Array],
            default: () => []
        },
        typeIndex:{
            type:Boolean,
            default:false
        },
        selectType:{
            type:Boolean,
            default:false
        },
        total:{
            type:Number,
            default:0
        }
    },
    methods:{
        // handleSelectionChange(val){
        //     console.log(val,'556');
        // },
        // handleFn(btn,row){
        //    console.log(btn,row,'555');
        // //    switch (btn.iconName) {
        // //     case 'xf':
        // //         this.$emit('handleXf',row)
        // //         break;
        // //     case 'show':
        // //         this.$emit('handleShow',row)
        // //         break;
        // //     case 'edit':
        // //         this.$emit('handleEdit',row)
        // //         break;
        // //     case 'del':
        // //         this.$emit('handleDel',row)
        // //         break;
        // //    }

        // }
    }
};
</script>

<style lang="scss" scoped></style>