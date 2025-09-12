import type { VariantOptionValueDto } from './variantOptionValueDto';

export interface VariantOptionDto {
    id: number;
    variantName: string;
    variantOptionValueDtos: VariantOptionValueDto[];
}
