import axios from "axios"
const API_URL = 'http://localhost:2399 '
const AUTH_API_URL = "http://localhost:2321"
import { attachInterceptors } from "../interceptors/apiInterceptors"

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  withCredentials: true
})

attachInterceptors(api, authApi)