// import { getCartFromStorage, saveCartToStorage } from '@/lib/localStorage';
// import { Cart, Voucher } from '@/modals/cart';
// import { ItemDto } from "@/modals/itemDto";
// import { create } from 'zustand';

import { ItemDto, ItemVariantDto } from '@/modals';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// interface CartState {
//     cart: Cart[];
//     voucher: Voucher | null;
//     currency: string;
//     total: number;
//     vat: number;
//     subtotal: number;
//     discountAmount: number;
//     addToCart: (product: ItemDto, quantity: number) => void;
//     updateQuantity: (productId: string, quantity: number) => void;
//     removeFromCart: (productId: string) => void;
//     clearCart: () => void;
//     applyVoucher: (voucher: Voucher) => void;
//     removeVoucher: () => void;
//     setCurrency: (currency: string) => void;
// }

// const VAT_RATE = 0.1; // 10%

// export const calculateTotals = (cart: Cart[], voucher: Voucher | null) => {
//     const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
//     // 1. Áp dụng voucher trước VAT
//     let discounted = subtotal;
//     let discountAmount = 0;
//     if (voucher && (!voucher.minOrder || subtotal >= voucher.minOrder)) {
//         if (voucher.type === 'percentage') {
//             discountAmount = discounted * (voucher.value / 100);
//         } else if (voucher.type === 'fixed') {
//             discountAmount = Math.min(voucher.value, subtotal);
//         }
//         discounted = subtotal - discountAmount;
//     }
//     // 2. Tính VAT trên phần đã giảm giá
//     const vat = discounted * VAT_RATE;

//     // 3. Tổng cuối cùng là phần đã giảm + VAT
//     const total = discounted + vat;

//     return { subtotal, discountAmount, vat, total };
// };

// export const useCartStore = create<CartState>((set) => {
//     const { cart, voucher, currency } = getCartFromStorage();
//     const { subtotal, discountAmount, vat, total } = calculateTotals(cart, voucher);
//     return {
//         cart,
//         voucher,
//         currency,
//         subtotal,
//         vat,
//         total,
//         discountAmount,
//         addToCart: (product, quantity) =>
//             set((state) => {
//                 const existingItem = state.cart.find((item) => item.product.id === product.id);
//                 let newCart: Cart[];
//                 if (existingItem) {
//                     const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
//                     newCart = state.cart.map((item) =>
//                         item.product.id === product.id ? { ...item, quantity: newQuantity } : item
//                     );
//                 } else {
//                     newCart = [
//                         ...state.cart,
//                         { product, quantity: Math.min(quantity, product.stock) },
//                     ];
//                 }
//                 const { subtotal, vat, total } = calculateTotals(newCart, state.voucher);
//                 saveCartToStorage(newCart, state.voucher, state.currency);
//                 return { cart: newCart, subtotal, vat, total };
//             }),
//         updateQuantity: (productId, quantity) =>
//             set((state) => {
//                 const newCart = state.cart
//                     .map((item) => {
//                         if (item.product.id === productId) {
//                             const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
//                             return { ...item, quantity: newQuantity };
//                         }
//                         return item;
//                     })
//                     .filter((item) => item.quantity > 0);
//                 const { subtotal, vat, total } = calculateTotals(newCart, state.voucher);
//                 const voucher = state.voucher;
//                 const validVoucher =
//                     voucher && voucher.minOrder !== undefined && subtotal >= voucher.minOrder
//                         ? voucher
//                         : null;
//                 saveCartToStorage(newCart, validVoucher, state.currency);
//                 return { cart: newCart, subtotal, vat, total };
//             }),
//         removeFromCart: (productId) =>
//             set((state) => {
//                 const newCart = state.cart.filter((item) => item.product.id !== productId);
//                 const { subtotal, vat, total } = calculateTotals(newCart, state.voucher);
//                 saveCartToStorage(newCart, state.voucher, state.currency);
//                 return { cart: newCart, subtotal, vat, total };
//             }),
//         clearCart: () =>
//             set((state) => {
//                 saveCartToStorage([], null, state.currency);
//                 return { cart: [], voucher: null, subtotal: 0, vat: 0, total: 0 };
//             }),
//         applyVoucher: (voucher) =>
//             set((state) => {
//                 const { subtotal, vat, total } = calculateTotals(state.cart, voucher);
//                 saveCartToStorage(state.cart, voucher, state.currency);
//                 return { voucher, subtotal, vat, total };
//             }),
//         removeVoucher: () =>
//             set((state) => {
//                 const { subtotal, vat, total } = calculateTotals(state.cart, null);
//                 saveCartToStorage(state.cart, null, state.currency);
//                 return { voucher: null, subtotal, vat, total };
//             }),
//         setCurrency: (currency) =>
//             set((state) => {
//                 saveCartToStorage(state.cart, state.voucher, state.currency);
//                 return { currency };
//             }),
//     };
// });

export interface CartItem {
    item: ItemDto;
    variant: ItemVariantDto;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: ItemDto, variant: ItemVariantDto, quantity: number) => void;
    removeFromCart: (variantId: number) => void;
    updateQuantity: (variantId: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create(
    persist<CartState>(
        (set, get) => ({
            cart: [],
            addToCart: (item, variant, quantity) => {
                set((state) => {
                    const existingItem = state.cart.find(
                        (cartItem) => cartItem.variant.id == variant.id
                    );
                    if (existingItem) {
                        const updatedCart = state.cart.map((cartItem) =>
                            cartItem.variant.id === variant.id
                                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                                : cartItem
                        );
                        return { cart: updatedCart };
                    } else {
                        return { cart: [...state.cart, { item, variant, quantity }] };
                    }
                });
            },
            removeFromCart: (variantId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.variant.id !== variantId),
                }));
            },
            updateQuantity: (variantId, quantity) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.variant.id === variantId ? { ...item, quantity } : item
                    ),
                }));
            },
            clearCart: () => {
                set({ cart: [] });
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
