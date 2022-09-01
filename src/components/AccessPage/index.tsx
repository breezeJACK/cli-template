import React from 'react';
import { Result, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface IProps {
  role: string;
  className?: string;
}
const AccessPage: React.FC<IProps> = props => {
  const { role, children, className } = props;
  const access = useSelector((state: RootState) => state.app.access);
  if (!role) return <div className={className}>{children}</div>;

  if (access.some(s => s !== role)) {
    return (
      <Result
        status="403"
        title="系统提示"
        subTitle="抱歉，您没有查看、编辑相关信息，或者进行相关功能操作的权限"
      />
    );
  } else {
    return <div className={className}>{children}</div>;
  }
};

export default AccessPage;
