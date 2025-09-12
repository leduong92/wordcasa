'use client';
// import { calculateTotals, useCartStore } from '@/store/useCartStore';
import React, { useMemo, useState } from 'react';

const CartTotal = () => {
    // const cart = useCartStore((state: { cart: any }) => state.cart);
    // const voucher = useCartStore((state: { voucher: any }) => state.voucher);
    // const { subtotal, vat, discountAmount, total } = useMemo(
    //     () => calculateTotals(cart, voucher),
    //     [cart, voucher]
    // );
    // return (
    //     <div className="flex flex-col justify-between gap-2">
    //         <div className="flex justify-between">
    //             <span className="text-sm">Subtotal:</span>
    //             <span className="text-sm">${subtotal.toFixed(2)}</span>
    //         </div>
    //         {voucher && (!voucher.minOrder || subtotal >= voucher.minOrder) && (
    //             <div className="flex justify-between">
    //                 <span className="text-green-600 text-sm">
    //                     Voucher ({voucher.code} - {voucher.value}%):
    //                 </span>
    //                 <span className="text-sm">
    //                     -{voucher.type === 'percentage' ? `$${discountAmount}` : `${voucher.value}`}
    //                 </span>
    //             </div>
    //         )}
    //         <div className="flex justify-between">
    //             <span className="text-sm">VAT (10%):</span>
    //             <span className="text-sm">${vat.toFixed(2)}</span>
    //         </div>
    //         <div className="h-[2px] boxShadown"></div>
    //         <div className="flex justify-between">
    //             <span className="text-lg font-semibold">Total:</span>
    //             <span className="text-lg font-semibold">${total.toFixed(2)}</span>
    //         </div>
    //     </div>
    // );
};

export default CartTotal;
