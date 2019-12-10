import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import "./assets/styles/glob-css.scss"


Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

// 对用户是否登录进行判断
// router.beforeEach((to, from, next) => {
//     const role = sessionStorage.getItem("userName");
//     if (!role && to.path !== "/login") {
//         next('/login');
//     } else {
//         next()
//     }
// })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')