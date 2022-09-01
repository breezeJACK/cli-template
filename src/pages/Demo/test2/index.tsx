import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DemoModal from './demoModal';
import DemoDrawer from './demoDrawer';
import { isEmpty } from 'lodash-es';

function Demo2() {
  const userInfo = useSelector((state: RootState) => state.app.userInfo);
  const [loading] = useState('');
  function open() {
    DemoModal.show({
      title: '自定义弹窗标题'
    });
  }
  function openDrawer() {
    DemoDrawer.show({
      title: '自定义弹窗标题2',
      onOk(txt) {
        console.log(txt);
      }
    });
  }
  return (
    <>
      <PageHeaderWrapper title={false} />
      <div className="mt-5 overflow-y-auto" style={{ height: 'calc(100vh - 160px)' }}>
        <div>
          state: <span className="text-red-500">{userInfo?.name}</span>
        </div>
        <Button type="primary" onClick={open}>
          open Model
        </Button>
        <br />
        {isEmpty(loading) ? '1' : '2'}
        <br />
        <Button type="primary" onClick={openDrawer}>
          open Drawer
        </Button>
        <DemoModal />
        <DemoDrawer />
        <DatePicker />
      </div>
    </>
  );
}

export default Demo2;
