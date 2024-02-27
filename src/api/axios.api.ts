import axios from "axios"
import {getTokenFromLocalStorage} from "../helpers/localstorage.helper";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage()
  }
})
