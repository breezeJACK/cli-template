import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/constants/emun';

export const Login = () => {
  const TOKEN = Math.random().toString(30).substr(2);
  Cookies.set(TOKEN_KEY, TOKEN, { expires: 0.2 });
};

export const logout = () => {};
