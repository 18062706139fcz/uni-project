/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-13 11:51:14
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-13 12:04:04
 * @FilePath: /vue-ts-cms/src/shims-vue.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
