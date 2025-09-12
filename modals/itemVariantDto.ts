import type { InventoryItemDto, InventoryItemRequest } from './inventoryItemDto';
import type { ItemDto } from './itemDto';
import type { ItemImageDto } from './itemImageDto';
import type { ItemPriceDto, ItemPriceRequest } from './itemPriceDto';
import type { ItemVariantOptionDto } from './itemVariantOptionDto';

export interface ItemVariantDto {
    id: number;
    itemId: number;
    itemDto: ItemDto;
    sku: string;
    isDefault: boolean;
    depth: number | null;
    width: number | null;
    height: number | null;
    itemImageDtos: ItemImageDto[] | null;
    itemPriceDtos: ItemPriceDto[] | null;
    inventoryItemDtos: InventoryItemDto[] | null;
    itemVariantOptionDtos: ItemVariantOptionDto[] | null;
    isActive: boolean;
}

export interface ItemVariantUpdateRequest {
    id: number;
    itemId: number;
    sku: string;
    isDefault: boolean;
    depth: number | null;
    width: number | null;
    height: number | null;
    isActive: boolean;
    itemPriceRequests: ItemPriceRequest[] | null;
    inventoryItemRequests: InventoryItemRequest[] | null;
}
