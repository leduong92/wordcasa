// lib/clientApi.ts
import axios, { AxiosRequestHeaders } from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for auth
axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = (session as any)?.accessToken;

    if (token) {
        (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export const clientApi = {
    get: async <T>(path: string, params?: any) => {
        const res = await axiosInstance.get<ApiResponse<T>>(path, { params });
        return res.data;
    },
    post: async <T>(path: string, body?: any) => {
        const res = await axiosInstance.post<ApiResponse<T>>(path, body);
        return res.data;
    },
    put: async <T>(path: string, body?: any) => {
        const res = await axiosInstance.put<ApiResponse<T>>(path, body);
        return res.data;
    },
    del: async <T>(path: string, params?: any) => {
        const res = await axiosInstance.delete<ApiResponse<T>>(path, { params });
        return res.data;
    },
    patch: async <T>(path: string, body?: any) => {
        const res = await axiosInstance.patch<ApiResponse<T>>(path, body);
        return res.data;
    },
};

export type ApiResponse<T> = {
    data?: T;
    isSuccess: boolean;
    message: string;
    statusCode?: number;
};
