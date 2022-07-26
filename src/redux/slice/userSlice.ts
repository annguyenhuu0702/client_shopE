import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeUser } from '../../types/user';

export interface typeUserState {
  users: typeUser[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: typeUserState = {
  users: [],
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getAllUser: (state) => {
      state.isLoading = true;
    },
    getAllUserSuccess: (state, action: PayloadAction<typeUser[]>) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },
    getAllUserFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
