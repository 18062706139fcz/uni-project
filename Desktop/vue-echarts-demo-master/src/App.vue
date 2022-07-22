<!--
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-07-22 23:32:12
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2022-07-23 00:25:18
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/test1">Test1</router-link> |
      <router-link to="/test2">Test2</router-link> |
      <router-link to="/test3">Test3</router-link> |
      <router-link to="/test4">Test4</router-link> |
      <router-link to="/test5">Test5</router-link> |
      <router-link to="/test6">Test6</router-link> |
      <router-link to="/test7">Test7</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
