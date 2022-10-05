<!--
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-03 11:12:20
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-04 14:24:24
 * @FilePath: /visual-fund-front-end/src/components/right.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="row">
    <div class="col-6">
      <div class="search">
        <el-input
          v-model="input"
          placeholder="Please input"
          clearable
          class="searchIndex"
          suffix-icon="search"
        />
      </div>
      <div>
        <draggable
          :list="list"
          :disabled="!enabled"
          item-key="name"
          class="col"
          ghost-class="ghost"
          animation="500"
          easing="cubic-bezier(1, 0, 0, 1)"
        >
          <template #item="{ element }">
            <div class="grid-square">
                <Dialog :dialogVisible="element.visiable" 
                        :class="{ 'not-draggable': !enabled }" 
                        :name="element.name">
                  {{ element.name }}
                </Dialog>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import Dialog from "./dialog.vue";

export default {
  name: "grid",
  display: "Grid",
  order: 18,
  components: {
    draggable,
    Dialog
},
  data() {
    return {
      enabled: true,
      list: [
        {
          name: '基金持仓',
          id: 0,
          visiable: false
        },
        { 
          name: "Item 1", 
          id: 1,
          visiable: false
        },
        { 
          name: "Item 2", 
          id: 2,
          visiable: false
         },
        { 
          name: "Item 3", 
          id: 3,
          visiable: false
         },
        { 
          name: "Item 4", 
          id: 4,
          visiable: false
        },
        { 
          name: "Item 5", 
          id: 5,
          visiable: false
         },
      ],
      input: "",
      visiable: false
    };
  },
};
</script>
<style scoped lang="scss">
.row {
  height: 0vh;
  .col-6 {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .search {
      border-radius: 100rem;
      .searchIndex {
        width: 30rem;
        height: 3rem;
        border-radius: 18rem;
      }
    }
    .col {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 5rem;
      margin-left: 12rem;
      margin-right: 12rem;
      .grid-square {
        font-size: 15px;
        width: 8rem;
        height: 8rem;
        display: inline-block;
        background-color: rgba(0,0,0,0.7);
        border: solid 1px black;
        padding: 10px;
        margin: 12px;
        border-radius: 16px;
        text-align: center;
      }
      .ghost {
        opacity: 0.5;
        background: #c8ebfb;
      }
    }
  }
}
</style>
