import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface modalState {
  isModal: boolean;
  title: string;
}

const initialState = {
  isModal: false,
  title: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    showModal: (state, action: PayloadAction<string>) => {
      state.isModal = true;
      state.title = action.payload;
    },
    hideModal: (state) => {
      state.isModal = false;
      state.title = '';
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalSelector = (state: RootState) => state.modal;

export default modalSlice.reducer;
