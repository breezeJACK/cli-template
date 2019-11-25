import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: () =>
                import('./views/index.vue'),
            redirect: "/home",
            children: [{
                path: "home",
                component: () =>
                    import('./views/home/home.vue')
            }]
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import('./views/login/login.vue')
        }

    ]
})