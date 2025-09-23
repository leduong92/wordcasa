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

export interface CollectionDto {
    id: number;
    name: string | null;
    displayName: string | null;
    sortOrder: number | 0;
    slug: string | null;
    description: string | null;
    metaKeyword: string | null;
    metaDescription: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    isActive: boolean | null;
}
export interface FabricLeatherDto {
    id: number;
    code: string | null;
    imageUrl: string | null;
    category: string | null;
    isActive: boolean;
}

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

export interface RoomDto {
    id: number;
    name: string | null;
    displayName: string | null;
    sortOrder: number | 0;
    slug: string | null;
    description: string | null;
    metaKeyword: string | null;
    metaDescription: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    isActive: boolean | null;
    CategoryDtos: CategoryDto[] | null;
}

export interface CategoryDto {
    id: number;
    roomId: number;
    roomDto: RoomDto;
    categoryDetailDtos: CategoryDetailDto[];
    name: string | null;
    displayName: string | null;
    sortOrder: number | null;
    slug: string | null;
    description: string | null;
    metaKeyword: string | null;
    metaDescription: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    isActive: boolean | null;
}

export interface CategoryDetailDto {
    id: number;
    categoryId: number;
    name: string | null;
    displayName: string | null;
    sortOrder: number | null;
    slug: string | null;
    description: string | null;
    metaKeyword: string | null;
    metaDescription: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    isActive: boolean | null;
}

export interface LanguageDto {
    id: number;
    code: string | null;
    name: string | null;
    isDefault: boolean | null;
    isActive: boolean;
}

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

export type UserDto = {
    id?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    isActive?: boolean;
};

export interface ResetPasswordDto {
    email: string;
    newPassword: string;
}

export type LoginResponse = {
    token: string;
    userDto: UserDto;
};
