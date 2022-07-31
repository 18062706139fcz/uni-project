import StackTracey from 'stacktracey'

const jsError = {}

jsError.install = function (Vue) {

  // function setCommonProperty () {
  //   this.kind = "stability";
  //   this.type = "error";//error
  //   this.errorType = "jsError";//jsError
  //   this.happenTime = new Date().getTime(); // 日志发生时间
  //   this.simpleUrl = window.location.href.split('?')[0].replace('#', ''); // 页面的url
  //   this.customerKey = utils.getCustomerKey(); // 用于区分用户，所对应唯一的标识，清理本地数据后失效
  // }


  Vue.config.errorHandler = (error, vm, info) => {
    const stack = new StackTracey(error)
    const log = {
      kind: "stability",
      type: "error", //error
      errorType: "jsError", //jsError
      position: `${stack.items[0].column}:${stack.items[0].line}`,// 需要处理掉无效的前缀信息
      happenTime: new Date().getTime(), // 日志发生时间
      simpleUrl: window.location.href.split('?')[0].replace('#', ''), // 页面的url
      fileNme: stack.items[0].fileName,
      wrongCalle: stack.items[0].callee,
      detail: `${error.toString()}`,
      isYibu: 'false',//是否是异步
    }
    console.log(log)


    //   function VueError (error, vm, info, stack) {
    //     this.position = `${stack.items[0].column}:${stack.items[0].line}`;//行和列;
    //     this.fileNme = stack.items[0].fileName;//文件名;
    //     this.wrongCalle = stack.items[0].callee;
    //     this.detail = `${error.toString()}`;//详细错误;
    //     this.isYibu = 'false';//是否是异步
    //   }
    //   VueError.prototype = new setCommonProperty()
    //   console.log(VueError.position)
  }



  window.addEventListener("error", function (event) {
    // console.log(event)
    let log = {
      kind: "stability", //稳定性指标
      type: "error", //error
      errorType: "jsError", //jsError
      happenTime: new Date().getTime(), // 日志发生时间
      simpleUrl: window.location.href.split('?')[0].replace('#', ''), // 页面的url
      message: event.message, //报错信息
      filename: event.filename, //报错链接
      position: (event.lineno || 0) + ":" + (event.colno || 0), //行列号
      isYiBu: "true",
    };
    console.log(log)
  },
    true
  ); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以


  // window.addEventListener("error", function (event) {
  //   function YibuError (event) {
  //     this.filename = event.filename, //报错链接
  //       this.position = (event.lineno || 0) + ":" + (event.colno || 0), //行列号
  //       this.simpleUrl = window.location.href.split('?')[0].replace('#', '')//错误发生的当前路由
  //     this.isYibu = 'turn';//是否是异步
  //   }
  //   YibuError.prototype = new setCommonProperty()
  //   console.log(YibuError.position)
  // }, true// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
  // )

}
export default jsError
















