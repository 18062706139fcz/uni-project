<!--
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-03 10:48:35
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-05 14:28:36
 * @FilePath: /visual-fund-front-end/src/components/left.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { ref, reactive } from "vue"
import { TabsPaneContext } from 'element-plus'
import myAxios from "../plugins/myAxios";

let avatar = "/avatar.jpg"
const userAccount = ref('方刚');
const userPassword = ref('ipsum');
let dialogVisible = ref(false)

const login = () => {
    dialogVisible.value = true;
}

const labelPosition = ref('right')

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const success = () => {
    ElMessage({
        message: "登录成功",
        type: 'success',
    })
}
const onSubmit = async () => {
    const res = await myAxios.post('/login', {
        userName: userAccount.value,
        password: userPassword.value,
    })

    if (res.code === 200 && res.data) {
        const token = "token";
        setStorage(token, res.data.token)
        dialogVisible.value = false;
        success()
    } else {
        ElMessage({
            message: "登录失败，账号或者密码错误",
            type: 'error',
        })
    }
}
const setStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))

}
</script>

<template>
    <div id="mainPart1">
        <div class="login" @click="login">
            <div class="avatar">
                <img :src="avatar">
            </div>
            <div>登录</div>
        </div>
        <div class="setting">
            设置
        </div>
        <el-dialog v-model="dialogVisible" width="20%" :close-on-click-modal="false">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="账号登录" name="first">
                    <el-form :label-position="labelPosition" label-width="80px" style="max-width: 300px">
                        <el-form-item label="账号">
                            <el-input v-model="userAccount" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="userPassword" />
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="onSubmit">确认登录</el-button>
                </el-tab-pane>
                <el-tab-pane label="注册用户" name="second">
                    <!-- <el-form :label-position="labelPosition" label-width="80px" style="max-width: 300px">
                        <el-form-item label="账号">
                            <el-input v-model="userAccount" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="userPassword" />
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input v-model="userPassword" />
                        </el-form-item>
                    </el-form> -->
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
#mainPart1 {
    display: flex;
    flex-direction: column;
    padding: 12vh 0 12vh 0;
    height: 76vh;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    color: white;
    font-size: 1rem;
}

::v-deep .el-dialog__header {
    padding: 0;
}

.login {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: 1.5vh;
    color: #666;

    .avatar img {
        height: 5vh;
        width: 5vh;
        border-radius: 100%;
    }
}
</style>