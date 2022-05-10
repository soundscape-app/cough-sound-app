import { observable, action } from 'mobx';
import { Request, Storage } from '~/utils';
import axios from 'axios';
import { ProcessStore } from './ProcessStore';
import UserStore from './UserStore';

type TUserRegister = {
  username: string,
  password: string,
  password2: string,
}

const AuthStore = observable({
  isLogin: false,
  userInfo: {
    username: '' as string,
    gender: '' as 'Female' | 'Male',
    age: 0 as number,
  },

  autoLogin: action(async () => {
    const token = await Storage.loginToken.get();
    const username = "test"; // TODO: fetchUserInfo 로 가져온 정보 활용할 것
    if (token) {
      AuthStore.setToken(token);
      // AuthStore.userInfo.username = username;
      AuthStore.isLogin = true;
    }
  }),
  login: action(async (username: string, password: string) => {
    const { token, message } : { token: string, message: string } = await Request.login('/auth/login', { username, password });
    if (!token) {
      return message;
    } else {
      AuthStore.setToken(token);
      UserStore.fetchProfile().then();

      // AuthStore.userInfo.username = username;
      // ProcessStore.fetchResults();

      AuthStore.isLogin = true;
      return ""
    }
  }),
  setToken: action((token: string) => {
    axios.defaults.headers.common['Authorization'] = "Token " + token;
    Storage.loginToken.set(token);
  }),

  logout: action(() => {
    AuthStore.removeToken();
    Storage.loginToken.remove();
    ProcessStore.resetResults();
    AuthStore.isLogin = false;
  }),
  removeToken: action(() => {
    axios.defaults.headers.common['Authorization'] = "";
  }),

  fetchUserInfo: action(async () => {
    const userInfo = await Request.get('/user');
    AuthStore.userInfo = userInfo;
  }),

  register: action(async (username: string, password: string) => {
    const { token, message } : { token: string, message: string } = await Request.login('/auth/register', { username, password });
    if (!token) {
      return message
    } else {
      AuthStore.setToken(token);
      UserStore.fetchProfile().then();

      // AuthStore.userInfo.username = username;
      // ProcessStore.fetchResults();

      AuthStore.isLogin = true;
      return ""
    }
  }),

});

export default AuthStore;