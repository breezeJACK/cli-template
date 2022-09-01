import React, { Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ProLayout from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Loading } from '../components';
import { menuConfig } from '../routes/_defaultMenu';
import RightBar from './components/RightBar';
import Logo from '../assets/images/logo.svg';
import DemoService from '@/services/demo';
import './index.less';

function BasicLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, loading } = useRequest(DemoService.getUserInfo);

  function LinkToPage(e: any) {
    if (e.path !== pathname) {
      navigate(e.path);
    }
  }

  const menuConfigs = {
    route: {
      path: '/',
      routes: menuConfig
    }
  };

  // 做入口拦截，用户或权限接口通过再进入页面
  if (!data) {
    return <Loading />;
  }

  return (
    <ProLayout
      layout="mix"
      fixedHeader
      fixSiderbar
      navTheme="light"
      siderWidth={220}
      {...menuConfigs}
      headerHeight={60}
      title="后台管理系统"
      logo={Logo}
      location={{
        pathname: pathname
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页'
        },
        ...routers
      ]}
      headerTitleRender={(logo, title) => (
        <a
          onClick={() => {
            navigate('/');
          }}
        >
          {logo}
          <span className="ml-20px pl-10px border-l-1">{title}</span>
        </a>
      )}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <a onClick={() => LinkToPage(menuItemProps)}>{defaultDom}</a>;
      }}
      rightContentRender={() => <RightBar />}
    >
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ConfigProvider>
    </ProLayout>
  );
}

export default BasicLayout;
