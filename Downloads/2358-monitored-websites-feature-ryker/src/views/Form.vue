<template>
  <div class="container">
    <formHeader />
    <div class="mainPart">
      <div class="center">
        <div class="word">学生信息</div>
        <div class="section">
          <div class="one">
            <span>EvalError</span
            ><span>
              <el-button type="primary" @click="EvalError">触发异常</el-button>
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>InternalError</span
            ><span>
              <el-button type="primary" @click="InternalError"
                >触发异常</el-button
              >
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>RangeError</span
            ><span>
              <el-button type="primary" @click="RangeError">触发异常</el-button>
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>ReferenceError</span
            ><span>
              <el-button type="primary" @click="ReferenceError"
                >触发异常</el-button
              >
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>SyntaxError「测试出现问题无法编译」</span
            ><span>
              <el-button type="primary" @click="SyntaxError"
                >触发异常</el-button
              >
            </span>
          </div>
          <formDivider />
          <!-- 已发生类型错误 -->
          <div class="one">
            <span>TypeError</span
            ><span>
              <el-button type="primary" @click="TypeError">触发异常</el-button>
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>URIError</span
            ><span>
              <el-button type="primary" @click="URIError">触发异常</el-button>
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>AsyncError</span
            ><span>
              <el-button type="primary" @click="AsyncError">触发异常</el-button>
            </span>
          </div>
          <formDivider />
          <div class="one">
            <span>异步操作</span
            ><span>
              <el-button type="primary" @click="Yibu">触发异常</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * undefined
 * 1. Promise() 1秒之后，报Promise.reject()
 * 2. 前后事件追踪
 * 3. 封装一个同步｜异步（多种实现）
 * 4. 列出相关错误「文档」
 */
// a
import formHeader from '@/components/formHeader.vue'
import formDivider from '@/components/formDivider.vue'
export default {
  name: 'Form',
  components: {
    formHeader,
    formDivider
  },
  methods: {
    TypeError () {
      // 这里写一个undefined错误
      window.someVar.error = 'error';
    },
    URIError () {
      // 用 encodeURI 等编码含有不合法字符的字符串，导致编解码失败
      // 编码操作会将每一个字符实例替换为一到四个相对应的UTF-8编码形式的转义序列。
      // 如果试图一个非高-低位完整的代理自负，将会抛出一个URIError错误
      let a = encodeURI('\uD800%')
      console.log(a)
    },
    SyntaxError () {
      // 期望获得一个特定的语法结构，但得到了其他的。 可能只是一个简单的错字。
      const l = console.log
      let cat = 'cat'
    },
    ReferenceError () {
      foo.substring(1);
    },
    // 如果非法调用 eval()，则抛出 EvalError 异常。
    // 根据EcmaSpec 2018版：
    // 此异常不再会被JavaScript抛出，但是EvalError对象仍然保持兼容性。
    EvalError () {
      return eval("(" + obj + ")");
    },
    //InternalError
    // 该错误在JS引擎内部发生，特别是当它有太多数据要处理并且堆栈增长超过其关键限制时。
    InternalError () {
      function foo () {
        foo()
      }
      foo()
    },
    // RangeError
    // 当数字超出允许的值范围时，将抛出此错误
    RangeError () {
      const arr = [90, 88]
      arr.length = 90 ** 99
    },
    AsyncError () {
      Promise.reject('this is an error message');
    },
    Yibu() {
      setTimeout(() => {
        return a
      }, 1000);
    }


  }
}
</script>

<style>
.container {
  height: 1320px;
}

.center {
  margin: 0 auto;
  max-width: 900px;
}

.word {
  line-height: 65px;
  font-weight: bolder;
}

.section {
  /* border: 1px solid rgb(162, 162, 142); */
  height: 800px;
}

.one {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
