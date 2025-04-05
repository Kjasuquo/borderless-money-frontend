import axios from 'axios';
const instance = axios.create({

    // backend url
    baseURL: 'http://104.155.107.171/api/v1'
});

export default instance;