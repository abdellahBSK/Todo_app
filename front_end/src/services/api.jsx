import axiosInterceptor from "../utils/axiosInterceptor";

export const apiGetTasks = () => {
    const apiUrl = `list/`;
    return axiosInterceptor.get(apiUrl);
  };
