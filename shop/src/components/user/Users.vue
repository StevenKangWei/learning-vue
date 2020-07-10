<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input
                        placeholder="请输入内容"
                        v-model="queryinfo.query"
                        clearable
                        @clear="get_users"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="get_users"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="add_user_visible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="users" stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="state_change(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <el-tooltip effect="dark" content="修改角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                title="添加用户"
                @close="addDialogClose"
                :visible.sync="add_user_visible"
                width="50%"
            >
                <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    label-width="5rem"
                    class="demo-ruleForm"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="mobile">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="add_user_visible=false">取 消</el-button>
                    <el-button type="primary" @click="add_user_visible=false">确 定</el-button>
                </span>
            </el-dialog>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryinfo.pagenum"
                :page-sizes="[1, 5, 10, 20]"
                :page-size="queryinfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        var validateEmail = (rule, value, callback) => {
            const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (reg.test(value)) return callback()
            return callback(new Error('请输入正确的邮箱'))
        }
        var validateMobile = (rule, value, callback) => {
            const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (reg.test(value)) return callback()
            return callback(new Error('请输入正确的手机号'))
        }
        return {
            queryinfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            addFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名长度在 3 - 10 个字符之间',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '密码长度在 6 - 15 个字符之间',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    },
                    {
                        validator: validateEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    },
                    {
                        validator: validateMobile,
                        trigger: 'blur'
                    }
                ]
            },
            users: [],
            total: 0,
            add_user_visible: false
        }
    },
    created() {
        this.get_users()
    },
    methods: {
        async get_users() {
            const { data: res } = await this.$http.get('users', {
                params: this.queryinfo
            })
            if (res.meta.status != 200) return this.$message.error(res.meta.msg)
            this.users = res.data.users
            this.total = res.data.total
        },
        handleSizeChange(size) {
            this.queryinfo.pagesize = size
            this.get_users()
        },
        handleCurrentChange(page) {
            this.queryinfo.pagenum = page
            this.get_users()
        },
        addDialogClose() {
            this.$refs.addFormRef.resetFields()
        },
        async state_change(info) {
            console.log(info)

            const { data: res } = await this.$http.put(
                `users/${info.id}/state/${info.mg_state}`
            )
            if (res.meta.status != 200) {
                info.mg_state = !info.mg_state
                return this.$message.error(res.meta.msg)
            }
            this.$message.success('更新用户状态成功')
        }
    }
}
</script>

<style lang="less" scoped>
</style>