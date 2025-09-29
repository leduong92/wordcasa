// lib/serverApi.ts
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean>;
    token?: string;
    withAuth?: boolean;
}

const buildUrl = (path: string, query?: RequestOptions['query']) => {
    const url = new URL(path, BASE_URL);
    if (query) {
        Object.entries(query).forEach(([key, value]) =>
            url.searchParams.append(key, String(value))
        );
    }
    return url.toString();
};

async function serverFetch<T>(
    method: Method,
    path: string,
    body?: any,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const url = buildUrl(path, options.query);

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    let token = options.token;

    if (options.withAuth) {
        const session = await getServerSession(authOptions);
        token = token ?? (session as any)?.accessToken;
    }

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, {
        ...options,
        method,
        headers,
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`API ${res.status}: ${msg}`);
    }

    return res.json();
}

// Public API
export const serverApi = {
    get: <T,>(path: string, options?: RequestOptions) =>
        serverFetch<T>('GET', path, undefined, options),
    post: <T,>(path: string, body?: any, options?: RequestOptions) =>
        serverFetch<T>('POST', path, body, options),
    put: <T,>(path: string, body?: any, options?: RequestOptions) =>
        serverFetch<T>('PUT', path, body, options),
    del: <T,>(path: string, options?: RequestOptions) =>
        serverFetch<T>('DELETE', path, undefined, options),
    patch: <T,>(path: string, body?: any, options?: RequestOptions) =>
        serverFetch<T>('PATCH', path, body, options),
};

export type ApiResponse<T> = {
    data?: T;
    isSuccess: boolean;
    message: string;
    statusCode?: number;
};
