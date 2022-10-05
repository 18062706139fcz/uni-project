<!--
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-03 09:55:38
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-03 20:08:46
 * @FilePath: /visual-fund-front-end/src/view/mainView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
    // 如果使用了 setup, 则无需注册
import Left from '../components/left.vue';
import Right from '../components/right.vue';
</script>

<template>
    <div id="mainPart">
            <Left class="left"></Left>
            <Right class="right"></Right>
    </div>
</template>

<style scoped lang="scss">
    #mainPart {
        display: flex;
        // height: 100vh;
        flex-direction: row;
        background-image: url('../assets/image/bgc.webp');
        background-size: cover;
        .left {
            width: 4.5em;
        }
        .right {
            height: 76vh;
            flex: 1;
        }
    }

</style>