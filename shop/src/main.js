import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import * as constants from './components/constants'
import './assets/css/global.css'

import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem(constants.TOKEN);
    return config
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')