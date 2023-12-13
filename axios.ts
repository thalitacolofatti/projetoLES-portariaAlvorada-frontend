import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: 'https://projeto-les-portaria-alvorada-backend.vercel.app/api/',
    // baseURL: 'http://localhost:8001/api/',
    withCredentials: true
})
