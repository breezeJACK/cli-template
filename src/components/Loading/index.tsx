import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Loading() {
  return (
    <div className="text-center pt-40px">
      <div>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
      <div className="mt-2 text-theme-gray">加载中...</div>
    </div>
  );
}

export default Loading;
