import axios from 'axios'

// const BASE_URL = "http://localhost:3002"
const BASE_URL = "https://dev.meuestagiomed.com.br/"

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const axiosAuth = axios.create( {
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})