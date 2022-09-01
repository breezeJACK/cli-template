import { RouteRecordRaw } from 'vue-router';

const demoRoutes: Array<RouteRecordRaw> = [
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo/index.vue')
  }
];

export default demoRoutes;
