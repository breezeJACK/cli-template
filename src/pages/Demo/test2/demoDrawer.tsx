import React, { useState, useEffect, useRef } from 'react';
import { Input, Drawer, Button } from 'antd';

interface Payload {
  onOk?: (val: string) => void;
  onCancel?: () => void;
  [others: string]: any;
}

type DemoDrawerType = React.NamedExoticComponent & {
  show: (payload: Payload) => void;
};

const DemoDrawer: DemoDrawerType = React.memo(props => {
  const [visible, setVisible] = useState(false);
  const payloadRef = useRef<Payload>({});
  useEffect(() => {
    const lastShow = DemoDrawer.show;
    DemoDrawer.show = (payload: Payload) => {
      setVisible(true);
      payloadRef.current = payload;
    };
    return () => {
      DemoDrawer.show = lastShow;
    };
  }, []);

  const wrapWithClose = () => {
    payloadRef.current.onOk?.('OK');
    setVisible(false);
  };

  function onClose() {
    payloadRef.current.onOk?.('close');
    setVisible(false);
  }

  return (
    <Drawer
      title={payloadRef.current.title || '默认标题'}
      destroyOnClose
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Button type="primary" onClick={wrapWithClose}>
        保存
      </Button>
    </Drawer>
  );
}) as any;
DemoDrawer.show = (payload: Payload) => console.log('DemoDrawer is not mounted.');
export default DemoDrawer;
