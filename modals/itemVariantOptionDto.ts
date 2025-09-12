import type { ItemVariantDto } from './itemVariantDto';
import type { VariantOptionValueDto } from './variantOptionValueDto';

export interface ItemVariantOptionDto {
    id: number;
    itemVariantId: number;
    itemVariantDto: ItemVariantDto;
    optionValueId: number;
    optionValueDto: VariantOptionValueDto;
}
