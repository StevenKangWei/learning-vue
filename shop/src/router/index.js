import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import * as constants from '../components/constants'

Vue.use(VueRouter)

const routes = [{
    path: constants.URL_LOGIN,
    component: Login
}, {
    path: constants.URL_HOME,
    component: Home
}]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == constants.URL_LOGIN) return next();
    const token = window.sessionStorage.getItem(constants.TOKEN);
    if (!token) return next(constants.URL_LOGIN);
    next();
})

export default router