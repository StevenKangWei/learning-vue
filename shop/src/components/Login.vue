<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt />
            </div>
            <el-form :model="loginForm" class="login_form">
                <el-form-item>
                    <el-input
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                        type='password'
                    ></el-input>
                </el-form-item>
                <el-form-item class="buttons">
                    <el-button type="success">登录</el-button>
                    <el-button type="primary">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: "zhangsan",
                password: "123"
            }
        };
    }
};
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