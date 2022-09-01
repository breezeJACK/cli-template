import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface IProps {
  code?: string | string[];
  empty?: string;
}
const AccessElement: React.FC<IProps> = props => {
  const { code, empty, children } = props;
  const permission = useSelector((state: RootState) => state.app.permission);
  const hasAccess = (code: string) => {
    return permission.some(s => s === code);
  };
  const hasSomeAccess = (code: string[]) => {
    if (code.length === 0) {
      return true;
    }
    let valid = false;
    code.forEach(c => {
      if (permission.some(s => s === c)) {
        valid = true;
      }
    });
    return valid;
  };
  if (!code) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  if (typeof code === 'string' && hasAccess(code)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  if (Array.isArray(code) && hasSomeAccess(code)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{empty}</>;
};

export default AccessElement;
