import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Graph from '../components/Graph.vue'
import Welcome from '../components/Welcome.vue'

import * as constants from '../components/constants'

Vue.use(VueRouter)

const routes = [{
        path: constants.URL_INDEX,
        redirect: constants.URL_LOGIN,
    }, {
        path: constants.URL_LOGIN,
        component: Login
    },
    {
        path: constants.URL_HOME,
        component: Home,
        redirect: constants.URL_WELCOME,
        children: [{
            path: constants.URL_WELCOME,
            component: Welcome,
        }]
    },
    {
        path: constants.URL_GRAPH,
        component: Graph
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // return next();
    if (to.path == constants.URL_LOGIN) return next();
    const token = window.sessionStorage.getItem(constants.TOKEN);
    if (!token) return next(constants.URL_LOGIN);
    next();
})

export default router