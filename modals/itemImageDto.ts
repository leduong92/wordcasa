export interface ItemImageDto {
    id: number;
    sku: string | null;
    itemId: number;
    imageUrl: string | null;
    isPrimary: boolean | null;
    sortOrder: number | null;
    isActive: boolean;
}
