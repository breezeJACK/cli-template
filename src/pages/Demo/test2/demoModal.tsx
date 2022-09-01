import React, { useState, useEffect, useRef } from 'react';
import { Input, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '@/store/app';
import { RootState } from '@/store';

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
  const dispath = useDispatch();
  const userInfo = useSelector((state: RootState) => state.app.userInfo);
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

  function changeName(e) {
    dispath(updateUserInfo({ name: e.target.value }));
  }

  return (
    <Modal
      title={payloadRef.current.title || '默认标题'}
      width={550}
      visible={visible}
      destroyOnClose
      onOk={wrapWithClose(payloadRef.current.onOk)}
      onCancel={() => setVisible(false)}
    >
      <h3>修改 redux 状态</h3>
      <Input onChange={changeName} placeholder="姓名" value={userInfo.name} />
    </Modal>
  );
}) as any;
DemoModal.show = (payload: Payload) => console.log('DemoModal is not mounted.');
export default DemoModal;
