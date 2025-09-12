import type { ItemVariantOptionDto } from './itemVariantOptionDto';
import type { VariantOptionDto } from './variantOptionDto';

export interface VariantOptionValueDto {
    value: string;
    optionId: number;
    variantOptionDto: VariantOptionDto;
    itemVariantOptionDtos: ItemVariantOptionDto[];
}
