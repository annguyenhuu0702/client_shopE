import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typeRegister } from "../../types/auth";
import { typeUser } from "../../types/user";


export interface typeAuthState {
  isLoading: boolean,
  error: boolean,
  message: string,
  currentUser: typeUser | null
}

const initialState: typeAuthState = {
  isLoading: false,
  error: false,
  message: "",
  currentUser : JSON.parse(localStorage.getItem("mickey:user") || "null")  
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    register: (state,action : PayloadAction<typeRegister>) => {
      state.isLoading = true
    },
    registerSuccess: (state,action : PayloadAction<typeUser>) => {
      state.isLoading = false
      state.error = false
      state.currentUser = action.payload
      localStorage.setItem("mickey:user", JSON.stringify(state.currentUser))
    },
    registerFailed: (state,action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = true
      state.message = action.payload
    },
    logOut: (state) => {
      state.error = false
      state.isLoading = false
      state.currentUser = null
      localStorage.setItem("mickey:user", JSON.stringify(state.currentUser))
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer