<template>
    <div class="table">
        <el-table 
        :data="cardList" 
        style="width: 100%">
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
            <slot :name="column.dataIndex">
              <template v-if="column.fun">
               <el-button 
               v-for="(btn, ind) in column.fun" 
               :key="ind"
               :type="btn.type"
               size="mini">
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
    </div>
</template>

<script>
export default {
    props: {
        columns: {
            type: [Array],
            default: () => []
        },
        cardList: {
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
        }
    }
};
</script>

<style lang="scss" scoped></style>