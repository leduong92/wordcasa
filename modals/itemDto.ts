import { CollectionDto, RegionDto, RoomDto, TypeDto, WarehouseDto } from './systemDto';

export interface ItemDto {
    id: number;
    parentCode: string;
    slug: string;
    productName: string | null;
    marketingDescription: string | null;
    description: string | null;
    width: number | null;
    depth: number | null;
    height: number | null;
    depthInch: string | null;
    widthInch: string | null;
    heightInch: string | null;
    netWeightKg: number | null;
    grossWeightKg: number | null;
    netWeightLbs: number | null;
    grossWeightLbs: number | null;
    isNew: boolean;
    isActive: boolean;
    materials: string | null;
    collectionId: number | null;
    typeId: number | null;
    roomId: number | null;
    collection: CollectionDto | null;
    type: TypeDto | null;
    room: RoomDto | null;
    itemVariantDtos: ItemVariantDto[] | [];
}

export interface InventoryItemDto {
    id: number;
    itemId: number;
    warehouseId: number | null;
    quantityOnHand: number;
    quantityReserved: number;
    minimumStockLevel: number;
    availableQuantity: number;
    lastUpdated: string;
    warehouseDto: WarehouseDto;
}

export interface InventoryItemRequest {
    id: number;
    itemId: number;
    warehouseId: number | null;
    quantityOnHand: number;
}

export interface ItemImageDto {
    id: number;
    sku: string | null;
    itemId: number;
    imageUrl: string | null;
    isPrimary: boolean | null;
    sortOrder: number | null;
    isActive: boolean;
}

export interface ItemPriceDto {
    id: number;
    itemId: number;
    regionId: number;
    regionDto: RegionDto;
    price: number;
    currency: string | null;
    effectiveDate: string;
    expirationDate: string | null;
}

export interface ItemPriceRequest {
    id: number;
    itemId: number;
    regionId: number;
    price: number;
}

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

export interface ItemVariantOptionDto {
    id: number;
    itemVariantId: number;
    itemVariantDto: ItemVariantDto;
    optionValueId: number;
    optionValueDto: VariantOptionValueDto;
}

export interface ItemCategoryDto {
    id: number;
    productName: string;
    slug: string;
    sku: string;
    itemVariantDtos: ItemVariantDto[];
}

export interface VariantOptionDto {
    id: number;
    variantName: string;
    variantOptionValueDtos: VariantOptionValueDto[];
}

export interface VariantOptionValueDto {
    value: string;
    optionId: number;
    variantOptionDto: VariantOptionDto;
    itemVariantOptionDtos: ItemVariantOptionDto[];
}
