'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const products = [
    {
        id: 1,
        name: 'Wooden Chair',
        price: '2.500.000₫',
        image: '/chair.jpg',
        x: '30%', // vị trí marker theo % trên ảnh
        y: '40%',
    },
    {
        id: 2,
        name: 'Modern Sofa',
        price: '12.000.000₫',
        image: '/bench.jpg',
        x: '65%',
        y: '55%',
    },
    {
        id: 3,
        name: 'Coffee Table',
        price: '4.200.000₫',
        image: '/table.jpg',
        x: '50%',
        y: '70%',
    },
];

export default function ShopTheLook() {
    const [selected, setSelected] = useState<(typeof products)[0] | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center">Shop the Look</h2>

            <div className="relative w-full rounded-lg overflow-hidden shadow-md">
                {/* Ảnh lifestyle */}
                <Image
                    src="/bed_1.jpg"
                    alt="Living Room Look"
                    width={600}
                    height={500}
                    className="w-full h-auto object-contain"
                />

                {/* Marker trên ảnh */}
                {products.map((product) => (
                    <button
                        key={product.id}
                        className="absolute w-6 h-6 rounded-full bg-black/70 hover:bg-gray-600 text-white flex items-center justify-center text-base cursor-pointer"
                        style={{
                            top: product.y,
                            left: product.x,
                            transform: 'translate(-50%, -50%)',
                        }}
                        onClick={() => setSelected(product)}
                    >
                        +
                    </button>
                ))}
            </div>

            {/* Popup sản phẩm */}
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent className="max-w-md">
                    {selected && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selected.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex gap-4">
                                <Image
                                    src={selected.image}
                                    alt={selected.name}
                                    width={150}
                                    height={150}
                                    className="rounded-md"
                                />
                                <div className="flex flex-col justify-between">
                                    <p className="text-gray-700">{selected.price}</p>
                                    <Button className="mt-4">Add to Cart</Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
