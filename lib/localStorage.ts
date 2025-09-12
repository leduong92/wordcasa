import { Cart, Voucher } from '@/modals/cart';

export interface CartStorage {
    cart: Cart[];
    voucher: Voucher | null;
    currency: string; // add field currency
}

export const getCartFromStorage = (): CartStorage => {
    if (typeof window === 'undefined') return { cart: [], voucher: null, currency: 'USD' };
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : { cart: [], voucher: null, currency: 'USD' };
};

export const saveCartToStorage = (cart: Cart[], voucher: Voucher | null, currency: string) => {
    if (typeof window !== 'undefined') {
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify({ cart, voucher, currency }));
    }
};
