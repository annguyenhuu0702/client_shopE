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
    },
    registerSuccess: (state,action : PayloadAction<typeUser>) => {
      
    },
    registerFailed: (state,action: PayloadAction<string>) => {
     
    },
    logOut: (state) => {
      
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer