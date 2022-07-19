import axios from "axios"
import { URL_API } from "../constants"
import { typeRegister } from "../types/auth"

const register = (user : typeRegister) => {
  return axios.post(`${URL_API}/v1/auth/register`,user)
}

export const authApi = {
  register
}