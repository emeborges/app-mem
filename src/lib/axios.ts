import axios from 'axios'

// const BASE_URL = "http://localhost:3002"
const BASE_URL = process.env.NEXT_PUBLIC_ENV === 'develop' ? "https://dev.meuestagiomed.com.br/" : "https://api.meuestagiomed.com.br/"

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