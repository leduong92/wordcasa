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
    isActive: boolean | null;
}
