// lib/clientApi.ts
import { ApiResponse } from '@/modals';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (error: any) => void;
    config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            if (token && prom.config.headers) {
                prom.config.headers['Authorization'] = `Bearer ${token}`;
            }
            prom.resolve(axios(prom.config));
        }
    });
    failedQueue = [];
};

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
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // window.dispatchEvent(new Event('open-login-popup'));

            const originalRequest = error.config!;
            if (isRefreshing) {
                // Nếu đang refresh, chờ kết quả
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Lấy refreshToken từ next-auth session
                const session = await getSession();
                const refreshToken = (session as any)?.refreshToken;

                if (!refreshToken) {
                    signOut(); // không có refreshToken → logout
                    return Promise.reject(error);
                }

                // gọi API refresh
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/account/refresh`,
                    {
                        refreshToken,
                    }
                );
                console.log('After refresh:', response);
                const newToken = response.data.accessToken;
                const newRefresh = response.data.refreshToken;

                // cập nhật session trong Next-Auth
                // bạn cần implement updateSession API riêng (Next.js route handler)
                await fetch('/api/auth/update-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accessToken: newToken, refreshToken: newRefresh }),
                });

                processQueue(null, newToken);
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }
                return axios(originalRequest);
            } catch (err) {
                processQueue(err, null);
                signOut(); // refresh fail → logout
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
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
