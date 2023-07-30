import {io} from 'socket.io-client'
import baseURL from './config'
// const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL

const socketInstance = io(baseURL)

export default socketInstance