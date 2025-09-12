import type { WarehouseDto } from './warehouseDto';

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
