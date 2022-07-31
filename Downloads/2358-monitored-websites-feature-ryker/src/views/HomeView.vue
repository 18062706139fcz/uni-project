<template>
<div class="container">
    <div class="mask">
        <div class="title">目标网站·页面入口</div>
        <div class="items">
        <router-link to="/form"><div class="Form"><a class="changePosition">表单查询></a></div></router-link>
        <router-link to="/blog"><div class="Blog"><a class="changePosition">博客></a></div></router-link>
        <router-link to="/chat"><div class="Chat"><a class="changePosition">聊天页面></a></div></router-link>
        <router-link to="/goods"><div class="Goods"><a class="changePosition">商品浏览></a></div></router-link>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'HomeView',
    components: {}
}
</script>

<style scoped>
.container {
    background: url(@/assets/background.jpg);
    background-size: cover;
}
.title {
    color: #fff;
    font-size: 36px;
    margin-top: 10%;
    margin-bottom: 20px;
}
.mask {
  display: flex;
  align-items: center;
  height: 800px;
  flex-direction:column;
  background: rgba(0, 0, 0,0.5);
}
.items {
  display: grid;
  grid-template-columns: 300px 300px;
  grid-column-gap: 100px;
  grid-row-gap: 10px;
}
.items > * {
  color: #fff;
  height: 160px;
  text-decoration: none;
  font-size: 20px;
  line-height: 200px;
  border-radius: 10px;
  overflow: hidden;
}
.Form {
  background: url(@/assets/Form.png);
  height: 100%;
  background-size: cover;
}
.Blog {
  background: url(@/assets/Blog.png);
  height: 100%;
  background-size: cover;
}
.Chat {
  background: url(@/assets/Chat.png);
  height: 100%;
  background-size: cover;
}
.Goods {
  background: url(@/assets/Goods.png);
  height: 100%;
  background-size: cover;
}
.changePosition {
  margin-left: 70px;
}
</style>
