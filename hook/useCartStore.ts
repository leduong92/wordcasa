import { clientApi } from '@/lib/clientApi';
import { ItemDto, ItemVariantDto, ItemVariantOptionDto } from '@/modals';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    item: ItemDto;
    variant: ItemVariantDto;
    quantity: number;
}

export interface CartItemDto {
    id: number;
    cartId: number;
    variantId: number;
    productName: string;
    sku: string;
    regionCode: string;
    quantity: number;
    imageUrl: string | null;
    currency: string | null;
    price: number;
    totalPrice: number;
    dimensionsCM: string | null;
    itemVariantOptionDtos: ItemVariantOptionDto[] | null;
}

interface CartState {
    cart: CartItemDto[];
    isLoading: boolean;
    fetchCart: () => Promise<void>;
    addToCart: (itemId: number, variantId: number, quantity: number) => Promise<void>;
    removeFromCart: (variantId: number) => Promise<void>;
    updateQuantity: (variantId: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    totalItems: () => number;
    totalQuantity: () => number;
    totalPrice: () => number;
}

export const useCartStore = create(
    persist<CartState>(
        (set, get) => ({
            isLoading: false,
            fetchCart: async () => {
                set({ isLoading: true });
                try {
                    const res = await clientApi.get<CartItemDto[]>(`/api/cart`, {
                        credentials: 'include',
                    });
                    set({ cart: res.data });
                } catch (error) {
                    console.log(error);
                } finally {
                    set({ isLoading: false });
                }
            },
            cart: [],
            addToCart: async (itemId, variantId, quantity) => {
                try {
                    const res = await clientApi.post<CartItemDto[]>(`/api/cart/add`, {
                        itemId,
                        variantId,
                        quantity,
                    });
                    set({ cart: res.data }); // server trả về cart mới
                } catch (err) {
                    console.error('addToCart error:', err);
                }
            },
            removeFromCart: async (variantId) => {
                try {
                    const res = await clientApi.del<CartItemDto[]>(`/api/cart/remove/${variantId}`);
                    set({ cart: res.data });
                } catch (err) {
                    console.error('removeFromCart error:', err);
                }
            },
            updateQuantity: async (variantId, quantity) => {
                try {
                    const res = await clientApi.put<CartItemDto[]>(`/api/cart/update`, {
                        variantId,
                        quantity,
                    });
                    set({ cart: res.data });
                } catch (err) {
                    console.error('updateQuantity error:', err);
                }
            },
            clearCart: async () => {
                // set({ cart: [] });
                try {
                    await clientApi.del(`/api/cart/clear`);
                    set({ cart: [] });
                } catch (err) {
                    console.error('clearCart error:', err);
                }
            },
            totalItems: () => get().cart.length,
            totalQuantity: () => {
                const cart = get().cart;
                if (!Array.isArray(cart)) return 0;
                return cart.reduce((sum, ci) => sum + (Number(ci?.quantity) || 0), 0);
            },
            totalPrice: () => {
                const cart = get().cart;
                if (!Array.isArray(cart)) return 0;
                return cart.reduce((sum, ci) => sum + (Number(ci?.totalPrice) || 0), 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
