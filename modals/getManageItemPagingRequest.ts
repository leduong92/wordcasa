export type GetManageItemPagingRequest = {
    sortKey?: string;
    searchKey?: string;
    obj?: ItemRequest;
    pageIndex: number;
    pageSize: number;
};

export type ItemRequest = {
    category?: string;
    value?: string;
};
