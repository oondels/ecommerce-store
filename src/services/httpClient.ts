import axios from "axios"
import { baseUrl } from "../config/ip"
import { attachInterceptors } from "../interceptors/apiInterceptors"

export const api = axios.create({
  baseURL: `${baseUrl}:2321`,
  withCredentials: true
})

attachInterceptors(api)