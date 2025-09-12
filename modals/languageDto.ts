export interface LanguageDto {
    id: number;
    code: string | null;
    name: string | null;
    isDefault: boolean | null;
    isActive: boolean;
}
