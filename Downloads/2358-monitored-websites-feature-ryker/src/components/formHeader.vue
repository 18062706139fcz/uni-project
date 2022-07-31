<template>
  <div class="header">
    <div class="left">
        <el-button icon="el-icon-back" class="back" size="mini" @click="back"></el-button>
        <span style="font-size: 15px;margin-left: 15px;line-height: 50px;">成绩云</span>
    </div>
    <div class="right" style="font-size: 10px;">
    <img src="@/assets/userInfoImg.jpg" alt="" class="userInfoImg">
    858577用户</div>
  </div>
</template>

<script>
export default {
    methods: {
        // 通过路由跳转实现回退
        back() {
            this.$router.push('/')
        }
    }
}
</script>
<style>
.header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #3F7EFE;
    color: #fff;
}
.userInfoImg {
    height: 16px;
    width: 16px;
    border-radius: 10px;
    position: relative;
    top: 3px;
    margin-right: 7px;
}
</style>