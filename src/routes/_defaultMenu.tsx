import { PieChartOutlined, MailOutlined, AntDesignOutlined, HomeOutlined } from '@ant-design/icons';

export const menuConfig = [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />
  },
  {
    path: '/list',
    name: '列表页面',
    icon: <PieChartOutlined />,
    routes: [
      {
        path: '/list/antd',
        name: 'antd',
        icon: <AntDesignOutlined />
      }
    ]
  },
  {
    path: '/demo',
    name: '组件封装',
    icon: <MailOutlined />,
    routes: [
      {
        path: '/demo/test1',
        name: '权限页面',
        icon: <AntDesignOutlined />
      },
      {
        path: '/demo/test2',
        name: '组件页面',
        icon: <AntDesignOutlined />
      }
    ]
  }
];
