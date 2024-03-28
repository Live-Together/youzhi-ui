import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:80/api'
})