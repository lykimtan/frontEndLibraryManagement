import axios from 'axios';

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseUrl) => {
    const instance = axios.create({
        baseURL: baseUrl,
        ...commonConfig,
    });

    instance.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token'); 

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        error => Promise.reject(error)
    );

    return instance;
};
