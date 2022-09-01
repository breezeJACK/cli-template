import { defineStore } from 'pinia';

interface UserInfo {
  idNumber: string;
}
interface UserState {
  userInfo: UserInfo;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: {
      idNumber: ''
    }
  }),
  actions: {
    setUserInfo(data: UserInfo) {
      this.userInfo = data;
    }
  },
  getters: {
    getIdNumber(): string {
      return this.userInfo.idNumber;
    }
  }
});
