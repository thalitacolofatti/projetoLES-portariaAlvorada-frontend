import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: 'http://localhost:8002/api/',
    withCredentials: true
})