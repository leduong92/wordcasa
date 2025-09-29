import { ItemDto, ItemVariantDto } from './itemDto';

export interface Voucher {
    code: string;
    type: 'percentage' | 'fixed';
    value: number; // Phần trăm (0-100) hoặc số tiền cố định
    minOrder?: number; // Giá trị đơn hàng tối thiểu để áp dụng
}

export interface ShippingAddressDto {
    id?: number;
    userId?: string;
    anonymousId?: string;
    shippingFirstName: string;
    shippingLastName: string;
    shippingAddress1: string;
    shippingAddress2?: string;
    shippingCity: string;
    shippingProvince: string;
    shippingZipCode: string;
    shippingCountryCode: string;
    shippingPhoneNumber: string;
    shippingFloorNumber?: number;
    isRuralArea?: boolean;
    isActive?: boolean;
}
