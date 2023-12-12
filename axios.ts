import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: 'https://projetoles-portaria-alvorada-backend.vercel.app',
    withCredentials: true
})
