import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  userInfo: {
    name: string;
  };
  access: string[]; // 角色权限 code 集合，
  permission: string[]; // 按钮权限 code 集合，
}

const initialState: AppState = {
  userInfo: {
    name: ''
  },
  access: [],
  permission: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAccess: (state, action) => {
      state.access = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    }
  }
});
export const { updateUserInfo, setAccess, setPermission } = appSlice.actions;

export default appSlice.reducer;
