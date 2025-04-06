import axios from 'axios';
const instance = axios.create({

    // backend url
    baseURL: 'https://backend-borderless-money.xyz/api/v1'
});

export default instance;