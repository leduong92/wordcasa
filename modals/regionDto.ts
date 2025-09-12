export interface RegionDto {
    id: number;
    code: string | null;
    name: string | null;
    currency: string | null;
    description: string | null;
    latitude: number;
    longitude: number;
    isActive: boolean;
}
