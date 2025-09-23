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
