import { ItemRequest } from '@/modals/getManageItemPagingRequest';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
            default:
                filters.value = filters.value ? `${filters.value},${value}` : value;
                break;
        }
    });

    return filters;
}
