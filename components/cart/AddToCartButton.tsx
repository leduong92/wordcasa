'use client';
import { useCartStore } from '@/hook/useCartStore';
import { CommonPageProps, ItemDto, ItemVariantDto } from '@/modals';
import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';

interface AddToCartButtonProps extends CommonPageProps {
    item: ItemDto;
    variant: ItemVariantDto;
}

const AddToCartButton = ({ item, variant, t }: AddToCartButtonProps) => {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    const addItem = useCartStore((state) => state.addToCart);

    const handleAdd = () => {
        if (variant) {
            setIsAdding(true);
            addItem(item.id, variant.id, quantity);
            setTimeout(() => {
                setIsAdding(false);
            }, 700);
        } else {
        }
    };

    return (
        <button
            className="w-full bg-neutral-800 hover:bg-neutral-600 text-neutral-100 py-3 rounded-md text-lg flex justify-center items-center cursor-pointer gap-3"
            onClick={handleAdd}
            disabled={isAdding}
        >
            <ShoppingBag size={18} />
            <span className="text-sm">{isAdding ? 'Processing...' : 'Add to Cart'}</span>
        </button>
    );
};

export default AddToCartButton;
