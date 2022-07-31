import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import service from '@/utils/request'
import jsError from '@/utils/jsError/index'
// import StackTracey from 'stacktracey'

Vue.config.productionTip = false
Vue.prototype.$req = service
// 例子
// getData() {
//     this.$req.get('/user', {
//             params: {
//                 ID: 12345
//             }
//         })
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
Vue.use(ElementUI);
Vue.use(jsError)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
