// We're writing the interceptor code here that will intercept our code and add the proper headers required for our request
import axios from "axios" //Send netowrk request by checking the access token
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL //importing the base url from the dotenv file, so that the request to all other urls will be made upon the base url

})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
    
)
export default api