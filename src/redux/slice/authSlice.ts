import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeRegister } from '../../types/auth';
import { typeUser } from '../../types/user';

export interface typeAuthState {
  isLoading: boolean;
  isError: boolean;
  currentUser: typeUser | null;
}

const initialState: typeAuthState = {
  isLoading: false,
  isError: false,
  currentUser: JSON.parse(localStorage.getItem('mickey:user') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    register: (state, action: PayloadAction<typeRegister>) => {
      state.isLoading = true;
      state.isError = false;
    },
    registerSuccess: (state, action: PayloadAction<typeUser>) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.currentUser = action.payload;
      localStorage.setItem('mickey:user', JSON.stringify(state.currentUser));
    },
    registerFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    logOut: (state) => {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
