// lib/apiClient.ts
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean>;
    token?: string;
    withAuth?: boolean;
    retries?: number;
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

const getTokenFromCookie = async (): Promise<string | undefined> => {
    try {
        return (await cookies()).get('auth_token')?.value;
    } catch {
        return undefined;
    }
};

const apiFetch = async <T>(
    method: Method,
    path: string,
    body?: any,
    options: RequestOptions = {},
    attempt: number = 0
): Promise<ApiResponse<T>> => {
    const url = buildUrl(path, options.query);

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    const token = options.token || (options.withAuth ? getTokenFromCookie() : undefined);
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(url);
    const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });

    const contentType = res.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    let apiResponse: ApiResponse<T> | null = null;

    if (isJson) {
        try {
            apiResponse = await res.json();
        } catch (err) {
            throw new Error('Invalid JSON response');
        }
    } else {
        throw new Error('Expected JSON response from server');
    }

    if (!res.ok || !apiResponse?.isSuccess) {
        const msg = apiResponse?.message || res.statusText;
        // Retry nếu cần
        // if (options.retries && attempt < options.retries) {
        //     return apiFetch(method, path, body, options, attempt + 1);
        // }
        throw new Error(msg);
    }

    return apiResponse;
};

// Public methods
export const apiClient = {
    get: <T>(path: string, options?: RequestOptions) =>
        apiFetch<T>('GET', path, undefined, options),
    post: <T>(path: string, body?: any, options?: RequestOptions) =>
        apiFetch<T>('POST', path, body, options),
    put: <T>(path: string, body?: any, options?: RequestOptions) =>
        apiFetch<T>('PUT', path, body, options),
    del: <T>(path: string, options?: RequestOptions) =>
        apiFetch<T>('DELETE', path, undefined, options),
    patch: <T>(path: string, body?: any, options?: RequestOptions) =>
        apiFetch<T>('PATCH', path, body, options),
};

export type ApiResponse<T> = {
    data?: T;
    isSuccess: boolean;
    message: string;
    statusCode?: number;
};

export type PagedResult<T> = {
    items: [T];
    totalRecords: number;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
};
