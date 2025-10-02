// lib/clientApi.ts
import { ApiResponse } from '@/modals';
import axios, { AxiosRequestHeaders } from 'axios';
import { getSession, signOut } from 'next-auth/react';

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

    if (session?.error === 'RefreshAccessTokenError') {
        console.warn('Refresh token expired → forcing logout');

        // clear session not redirect
        signOut({ redirect: false }).then(() => {
            // window.dispatchEvent(new Event('open-login-popup'));
        });
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await signOut({ redirect: false });
            // window.dispatchEvent(new Event('open-login-popup'));
        }
        return Promise.reject(error);
    }
);

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
