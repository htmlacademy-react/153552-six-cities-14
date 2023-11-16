import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { UserInfo } from '../../types/state';

const initialState: {user: UserInfo | null} = {
  user: null,
};

export const userInfoData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUserInfo } = userInfoData.actions;
