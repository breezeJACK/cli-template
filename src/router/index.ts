import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home/index.vue';
import BasicLayout from '@/layout/BasicLayout.vue';
import demoRoutes from './demo';
import { setupRouterGuard } from './guards';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: BasicLayout,
    children: [
      {
        path: '/',
        redirect: 'welcome'
      },
      {
        path: '/welcome',
        name: 'Dashborad',
        component: Home
      },
      ...demoRoutes
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      title: '404',
      keepAlive: false,
      requireAuth: false
    },
    component: () => import('../views/NotFound/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export const setupRouter = (app: App<Element>): void => {
  app.use(router);
  setupRouterGuard(router);
};

export default router;
