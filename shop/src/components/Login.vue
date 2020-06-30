<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt />
            </div>
            <el-form ref="formref" :model="form" :rules="rules" class="login_form">
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item class="buttons">
                    <el-button type="success" @click="login">登录</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import * as constants from './constants'
export default {
    data() {
        return {
            form: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 32,
                        message: '长度在 2 到 32 个字符之间',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        min: 6,
                        message: '长度最少6位',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        reset() {
            this.$refs.formref.resetFields()
        },
        login() {
            this.$refs.formref.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post('login', this.form)
                if (res.meta.status !== 200)
                    return this.$message.error('登录失败')
                this.$message.success('登录成功')
                window.sessionStorage.setItem('token', res.data.token)
                this.$router.push('/home')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px #333333;
}

.avatar_box {
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
    }
}

.buttons {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>