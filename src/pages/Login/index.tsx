import React, { useState } from 'react';
import { Form, Radio, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/constants/emun';

const userTypes = [
  { value: 'admin', label: '管理员' },
  { value: 'user', label: '普通用户' }
];
const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('admin');
  async function login() {
    const TOKEN = Math.random().toString(30).substr(2);
    await Cookies.set(TOKEN_KEY, TOKEN, { expires: 0.1 });
    navigate('/');
  }
  return (
    <div className="flex-center">
      <div className="pt-100px">
        <div>
          <Radio.Group
            options={userTypes}
            defaultValue={user}
            onChange={e => setUser(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={login}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
