import type { RegionDto } from './regionDto';

export interface WarehouseDto {
    id: number;
    name: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    zipCode: string | null;
    countryCode: string | null;
    contactPhone: string | null;
    email: string | null;
    isPrimary: boolean | null;
    latitude: number | null;
    longitude: number | null;
    description: string | null;
    regionId: number;
    regionDto: RegionDto;
    isActive: boolean;
}
