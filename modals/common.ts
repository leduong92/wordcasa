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

export type GetManageItemPagingRequest = {
    sortKey?: string;
    searchKey?: string;
    obj?: ItemRequest;
    pageIndex: number;
    pageSize: number;
};

export type ItemRequest = {
    category?: string;
    slug?: string;
    flags?: string;
    price?: string;
    room?: string;
    collection?: string;
};
