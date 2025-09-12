import type { RegionDto } from './regionDto';

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
