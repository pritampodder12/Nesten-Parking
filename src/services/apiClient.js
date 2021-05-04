import axios from 'axios';
import { baseURL } from '../utils/Constants';
import { Help } from '../utils/Help';

const axiosClient = axios.create({
    baseURL: baseURL,
    config: {
        headers: {
            'Content-Type': 'application/json',
        },
    },
});

axiosClient.interceptors.request.use(async function (config) {
    let token = await Help.getValidToken();
    if (token) {
        config.headers['x-nesteen-auth'] = token;
    } else {
        token = '';
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return Promise.resolve(response.data);
}, (error) => {
    return Promise.reject(error);
});

const apiClient = {
    getRequest: (path, data) => {
        if (data) {
            return axiosClient.get(path, data);
        } else {
            return axiosClient.get(path);
        }
    },
    postRequest: (path, data) => {
        return axiosClient.post(path, data);
    },
    putRequest: (path, data) => {
        return axiosClient.put(path, data);
    },
    deleteRequest: (path, data) => {
        return axiosClient.delete(path, data);
    },
};

export default apiClient;