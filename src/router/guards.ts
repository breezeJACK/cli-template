import { Router, RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
// import { GlobalStore } from '@/store'
import { isEmpty } from 'lodash-es';
import { store } from '@/store';
import { useUserStore } from '@/store/modules/user';
import env from '@/utils/env';

const user = useUserStore(store);
const canUserAccess = async (router: Router, to: RouteLocationRaw) => {
  if (isEmpty(user.getIdNumber)) {
    if (env.DEV) {
      const userInfo = {
        idNumber: '110101199006075686'
      };
      user.setUserInfo(userInfo);
      return true;
    } else {
      // await getUserInfo();
      return true;
    }
  } else {
    return true;
  }
};

const routerBefore = (router: Router) => {
  router.beforeEach(async (to: RouteLocationNormalized) => {
    /* 权限验证 */
    await canUserAccess(router, to);
  });
};
export const setupRouterGuard = (router: Router): void => {
  routerBefore(router);
};
