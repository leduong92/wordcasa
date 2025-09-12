export interface BannerDto {
    id: number;
    displayName: string | null;
    sortOrder: number | null;
    videoUrl: string | null;
    isActive: boolean;
}

export interface BannerDetailDto {
    id: number;
    bannerId: number;
    displayName: string | null;
    category: string | null;
    value: string | null;
    sortOrder: number | null;
    description: string | null;
    title: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
}

export interface BannerDetailRequest {
    id: number | null;
    bannerId: number;
    displayName: string | null;
    sortOrder: number | null;
    imageUrl: string | null;
    title: string | null;
    description: string | null;
    category: string | null;
    value: string | null;
}
