<template>
    <div class="home-container">
        <el-container>
            <el-header>
                <div>
                    <img class="logo" src="../assets/logo.png" alt />
                    <span>管理系统</span>
                </div>
                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="iscollapse ? '64px' : '250px'">
                    <div class="toggle-button" @click="togglemenu">|||</div>
                    <el-menu
                        :unique-opened="true"
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409eff"
                        v-for="item in menulist"
                        :key="item.id"
                        :collapse="iscollapse"
                        :collapse-transition="false"
                        :router="true"
                    >
                        <el-submenu :index="item.id + ''">
                            <template slot="title">
                                <i :class="icons[item.id]"></i>
                                <span>{{ item.authName }}</span>
                            </template>
                            <el-menu-item
                                :index="'/' + subitem.path"
                                v-for="subitem in item.children"
                                :key="subitem.id"
                            >
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>{{subitem.authName}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import * as constants from './constants'
export default {
    data() {
        return {
            menulist: [],
            icons: {
                125: 'el-icon-user',
                103: 'el-icon-house',
                101: 'el-icon-shopping-bag-1',
                102: 'el-icon-s-order',
                145: 'el-icon-s-data'
            },
            iscollapse: false
        }
    },
    created() {
        this.getMenuList()
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push(constants.URL_LOGIN)
        },
        togglemenu() {
            this.iscollapse = !this.iscollapse
        },
        async getMenuList() {
            const { data: res } = await this.$http.get(constants.API_MENUS)
            if (res.meta.status != 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            console.log(res)
        }
    }
}
</script>

<style lang="less" scoped>
.el-footer,
.el-header {
    background: #373d41;
}

.el-header {
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    .logo {
        width: 40px;
        height: 40px;
        margin-left: 1rem;
        img {
            width: 100%;
            height: 100%;
        }
    }

    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 1rem;
        }
    }
}

// .logo {
//     width: 34px;
//     height: 35px;
//     > img {
//         width: 100%;
//         height: 100%;
//     }
// }

.el-aside {
    background: #333744;
    .el-menu {
        border-right: none;
    }
}

.el-main {
    // min-height: 100%;
    background: #eaedf1;
}

.el-container,
.home-container {
    height: 100%;
}

.toggle-button {
    background: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>