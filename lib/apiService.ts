import { CategoryDto } from '@/modals';
import { GetManageItemPagingRequest } from '@/modals/getManageItemPagingRequest';
import { apiClient, PagedResult } from '@/lib/apiClient';
import { ItemDto } from '@/modals';
import { parseQ } from '@/lib/utils';

export async function getMenus() {
    const response = await apiClient.get<CategoryDto[]>(`/api/category`);
    return response.data;
}

export async function loadProducts(
    slug: string | undefined,
    roomSlug: string | undefined,
    collectionSlug: string | undefined,
    sp: Record<string, string | string[] | undefined>
) {
    const pageIndex = Number(sp.page) > 0 ? Number(sp.page) : 1;
    const pageSize = 15;

    const q = sp.q as string | undefined;
    const parsedFilters = parseQ(q);

    const obj = { ...parsedFilters, slug: slug, room: roomSlug, collection: collectionSlug };

    const request: GetManageItemPagingRequest = {
        pageIndex,
        pageSize,
        sortKey: sp.sortKey as string,
        searchKey: sp.searchKey as string,
        obj,
    };
    console.log(request);
    const response = await apiClient.post<PagedResult<ItemDto>>(`/api/item/paging`, request);

    return {
        products: response.data?.items ?? [],
        totalRecords: response.data?.totalRecords ?? 0,
        totalPages: Math.ceil(response.data?.totalRecords ?? 0 / pageSize),
        pageIndex,
        pageSize,
    };
}
