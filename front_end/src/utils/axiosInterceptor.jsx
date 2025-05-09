import axios from 'axios';
import deviceStorage from './deviceStorage';
const axiosInterceptor = axios.create({

  baseURL: 'http://localhost:8000/api/',

});
// Add a request interceptor
axiosInterceptor.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const accessToken = deviceStorage.retrieveKey('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url === '/token/refresh/'
    ) {
      return Promise.reject(error);
    }

    const refreshToken = await deviceStorage.retrieveKey('refresh_token');
    if (refreshToken) {
      const data = {
        refresh: refreshToken,
      };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axiosInterceptor
          .post('/token/refresh/', data)
          .then(async (res) => {
            console.log('originalRequest.url :', originalRequest.url);
            // 1) Save the new access token.
            await deviceStorage.saveKey('access_token', res.data.access);
            // 2) Change Authorization header
            error.response.config.headers['Authorization'] =
              'Bearer ' + res.data.access;
            // 3) return originalRequest object with Axios.
            return axiosInterceptor(error.response.config);
          })
          .catch(async (error) => {
            // Destroy all tokens.
            if (error.response?.status === 401) {
              await deviceStorage.destroyKey('refresh_token');
              await deviceStorage.destroyKey('access_token');
            }
            // return Error object with Promise
            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInterceptor;
