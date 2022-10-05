<!--
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-03 10:48:35
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-04 14:46:17
 * @FilePath: /visual-fund-front-end/src/components/left.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts">
    export default {
        data: function() {
            return {
            }
        },
        props: ['arr1']
    }
</script>

<template>
    <div id="partOne">
        <div v-for="item in arr1" :key="item.name" class="items">
            <div class="left">
                <div class="left1">{{item.name}}</div>
                <div class="left2">{{item.stockCode}}</div>
            </div>
            <div class="right">
                <div class="right1">{{item.changeRate}}</div>
                <div class="right2">{{item.shareHeld}}</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    #partOne {
        display: flex;
        flex-direction: column;
        text-align: left;
        color: aliceblue;
        .items {
            display: flex;
            height: 2.1rem;
            justify-content: space-between;
            .left {
                .left2 {
                    font-size: 0.8rem;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }
            }
            .right {
                .right1 {
                    color: greenyellow
                }
                .right2 {
                    font-size: 0.2rem;
                }
            }
        }
    }
</style>