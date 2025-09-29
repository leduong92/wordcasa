import { ItemRequest } from '@/modals';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(value);
};

export function capitalizeWords(str: string) {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export function parseQ(q?: string): ItemRequest {
    if (!q) return {};

    const filters: ItemRequest = {};
    q.split('__').forEach((part) => {
        const [field, value] = part.split('--');
        if (!field || !value) return;

        switch (field) {
            case 'category':
                filters.category = filters.category ? `${filters.category},${value}` : value;
                break;
            case 'flags':
                filters.flags = filters.flags ? `${filters.flags},${value}` : value;
                break;
            case 'price':
                filters.price = filters.price ? `${filters.price},${value}` : value;
                break;
            case 'room':
                filters.room = filters.room ? `${filters.room},${value}` : value;
                break;
            case 'collection':
                filters.collection = filters.collection ? `${filters.collection},${value}` : value;
                break;
            default:
                filters.slug = filters.slug ? `${filters.slug},${value}` : value;
                break;
        }
    });

    return filters;
}
