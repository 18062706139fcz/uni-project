<!--
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-03 10:48:35
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-05 14:28:21
 * @FilePath: /visual-fund-front-end/src/components/left.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import StockCode from "./stockCode.vue";
import { ref } from "vue";
const props = defineProps({
  dialogVisible: Boolean,
  name: String,
});
// props: ['dialogVisible', 'name']
let dialogVisibleOne = props.dialogVisible
type Fund = {
  name: string;
  stockCode: string;
  changeRate: string;
  shareHeld: string;
};
let arr1 = ref<Fund[]>([
  {
    name: "九安医疗",
    stockCode: "002432",
    changeRate: "-1.18%",
    shareHeld: "43.12",
  },
  {
    name: "宁德时代",
    stockCode: "300750",
    changeRate: "-4.32%",
    shareHeld: "400.89",
  },
  {
    name: "数字政通",
    stockCode: "300075",
    changeRate: "-0.21%",
    shareHeld: "14.35",
  },
]);
let tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
]);
</script>

<template>
  <div>
    <el-button text @click="dialogVisibleOne = true" class="name">
      <slot></slot>
    </el-button>
    <StockCode v-if="name == '基金持仓'" :arr1="arr1"></StockCode>

    <div v-if="name == '基金持仓'">
      <el-dialog v-model="dialogVisibleOne" title="基金持仓" width="50%" draggable>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="date" label="Date" width="120" />
          <el-table-column prop="name" label="Name" width="100" />
          <el-table-column prop="state" label="State" width="100" />
          <el-table-column prop="city" label="City" width="110" />
          <el-table-column prop="address" label="Address" width="300" />
          <el-table-column prop="zip" label="Zip" width="120" />ß
        </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisibleOne = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisibleOne = false"
              >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped lang="scss">
.name {
  text-align: center;
  color: orange;
}
</style>
