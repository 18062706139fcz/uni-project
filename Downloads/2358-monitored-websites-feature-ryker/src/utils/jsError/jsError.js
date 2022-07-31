import StackTracey from 'stacktracey'

export default MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    class Monitor {
      kind = "stability";
      type = "error";//error
      message = undefined;
      errorType = "jsError";//jsError
      happenTime = new Date().getTime();//获取时间戳毫秒
      position = undefined;
      simpleUrl = undefined;// 需要处理掉无效的前缀信息
      fileNme = undefined;
      wrongCalle = undefined;
      detail = undefined;
      isYibu = undefined
    }
    Vue.config.errorHandler = (error, vm, info) => {
      const stack = new StackTracey(error)
      log1 = new Monitor
      log1.position = `${stack.items[0].column}:${stack.items[0].line}`,//行和列
        log1.fileNme = stack.items[0].fileName,//文件名
        log1.wrongCalle = stack.items[0].callee,
        log1.detail = `${err.toString()}`,//详细错误
        log1.simpleUrl = window.location.href.split('?')[0].replace('#', '')//错误发生的当前路由
      log1.isYibu = 'false'
    }
    window.addEventListener("error", function (event) {
      log2 = new Monitor
      log2.message = event.message, //报错信息
        log2.filename = event.filename, //报错链接
        log2.position = (event.lineno || 0) + ":" + (event.colno || 0), //行列号
        log2.simpleUrl = window.location.href.split('?')[0].replace('#', '')//错误发生的当前路由
      log1.isYibu = 'turn'
    }, true// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
    )
  }


}



