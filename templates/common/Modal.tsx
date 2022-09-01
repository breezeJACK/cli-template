import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'antd';

interface Payload {
  onOk?: () => void;
  onCancel?: () => void;
  [others: string]: any;
}

type DemoModalType = React.NamedExoticComponent & {
  show: (payload: Payload) => void;
};

const DemoModal: DemoModalType = React.memo(props => {
  const [visible, setVisible] = useState(false);
  const payloadRef = useRef<Payload>({});

  useEffect(() => {
    const lastShow = DemoModal.show;
    DemoModal.show = (payload: Payload) => {
      setVisible(true);
      payloadRef.current = payload;
    };
    return () => {
      DemoModal.show = lastShow;
    };
  }, []);

  const wrapWithClose = (method?: (v: any) => void) => async () => {
    method?.('ok');
    setVisible(false);
  };

  return (
    <Modal
      title={payloadRef.current.title || '默认标题'}
      width={750}
      visible={visible}
      onOk={wrapWithClose(payloadRef.current.onOk)}
      onCancel={() => setVisible(false)}
    >
      这里是内容
    </Modal>
  );
}) as any;
DemoModal.show = (payload: Payload) => console.log('DemoModal is not mounted.');
export default DemoModal;
