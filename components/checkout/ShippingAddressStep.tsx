'use client';

import { clientApi } from '@/lib/clientApi';
import { useEffect, useState } from 'react';
import ShippingAddressForm from './ShippingAddressForm';
import { Check, Pencil, Plus, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CommonPageProps } from '@/modals';
import AddressCardSkeleton from './AddressCardSkeleton';

export interface ShippingAddressDto {
    id?: number;
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

interface ShippingAddressStepProps extends CommonPageProps {
    onSubmit: (address: ShippingAddressDto) => void;
    onCancel: () => void;
}

export default function ShippingAddressStep({ onSubmit, onCancel, t }: ShippingAddressStepProps) {
    const [addresses, setAddresses] = useState<ShippingAddressDto[]>([]);
    const [editing, setEditing] = useState<ShippingAddressDto | null>({
        shippingFirstName: '',
        shippingLastName: '',
        shippingAddress1: '',
        shippingAddress2: '',
        shippingCity: '',
        shippingProvince: '',
        shippingZipCode: '',
        shippingCountryCode: '',
        shippingPhoneNumber: '',
        shippingFloorNumber: 0,
        isRuralArea: false,
        isActive: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = (addr: ShippingAddressDto | null) => {
        setEditing(addr);
        setOpen(true);
    };

    // load từ backend khi mở step
    useEffect(() => {
        async function loadAddresses() {
            setIsLoading(true);
            const res = await clientApi.get<ShippingAddressDto[]>(`/api/shippingaddress`, {
                withAuth: true,
            });
            const list = res.data ?? [];
            setAddresses(list);
            setIsLoading(false);
        }
        loadAddresses();
    }, []);

    const handleSave = async (address: ShippingAddressDto) => {
        let saved: ShippingAddressDto;
        setIsLoading(true);
        if (address.id && address.id > 0) {
            // update

            const res = await clientApi.put<ShippingAddressDto[]>(`/api/shippingaddress`, address);
            const list = res.data ?? [];
            setAddresses(list);
        } else {
            // create → generate id tạm (unique)
            const newId = Math.max(0, ...addresses.map((a) => a.id ?? 0)) + 1;
            const newAddress = { ...address, id: newId };

            const res = await clientApi.post<ShippingAddressDto[]>(
                `/api/shippingaddress`,
                newAddress
            );
            const list = res.data ?? [];
            setAddresses(list);
        }
        setIsLoading(false);
        setEditing(null);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;

        const res = await clientApi.del<ShippingAddressDto[]>(`/api/shippingaddress/${id}`);

        const list = res.data ?? [];
        setAddresses(list);
    };

    const handleSelectDefault = async (id?: number) => {
        if (!id) return;
        setIsLoading(true);
        const res = await clientApi.put<ShippingAddressDto[]>(
            `/api/shippingaddress/set-detault/${id}`
        );

        const updated = res.data ?? [];

        setAddresses(updated);
        setIsLoading(false);
    };

    return (
        <div className="space-y-2 p-3">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-2 text-neutral-600">Shipping Address</h2>

                {/* Add new */}
                <button
                    onClick={() =>
                        handleOpen({
                            shippingFirstName: '',
                            shippingLastName: '',
                            shippingAddress1: '',
                            shippingAddress2: '',
                            shippingCity: '',
                            shippingProvince: '',
                            shippingZipCode: '',
                            shippingCountryCode: '',
                            shippingPhoneNumber: '',
                            shippingFloorNumber: 0,
                            isRuralArea: false,
                            isActive: true,
                        })
                    }
                    className="px-4 py-1 bg-blue-400 text-neutral-100 hover:bg-blue-500 rounded-md cursor-pointer flex items-center gap-1"
                    aria-label="Add new address"
                >
                    <Plus size={15} /> <span className="">New Address</span>
                </button>
            </div>

            {/* List addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-600 py-1">
                {isLoading ? (
                    <AddressCardSkeleton />
                ) : (
                    <>
                        {addresses.map((addr, idx) => (
                            <div
                                key={addr.id}
                                className={`rounded-md border p-5 cursor-pointer ${
                                    addr.isActive ? 'border-blue-400' : 'border-neutral-300'
                                }`}
                                onClick={() => handleSelectDefault(addr.id)}
                            >
                                <div className="font-semibold flex justify-between items-center">
                                    <span>
                                        {addr.shippingFirstName} {addr.shippingLastName}
                                    </span>
                                    {addr.isActive && (
                                        <div className="text-green-600 text-sm">
                                            <Check />
                                        </div>
                                    )}
                                </div>
                                <span className="flex gap-2">
                                    {addr.shippingAddress1}{' '}
                                    {addr.isRuralArea && <p className="">(Rural Area)</p>}
                                </span>
                                <p>
                                    {addr.shippingCity}, {addr.shippingProvince}{' '}
                                    {addr.shippingZipCode}
                                </p>
                                <p>{addr.shippingCountryCode}</p>
                                <p>{addr.shippingPhoneNumber}</p>

                                <div className="flex gap-3 mt-2 items-center">
                                    <button
                                        className="text-blue-600 text-sm cursor-pointer"
                                        onClick={() => handleOpen(addr)}
                                        aria-label="Edit Address"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        className="text-red-700 text-sm cursor-pointer"
                                        onClick={() => handleDelete(addr.id)}
                                        aria-label="Remove Address"
                                    >
                                        <Trash size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Form add/edit */}
            {/* {editing && (
                <ShippingAddressForm
                    initialData={editing}
                    onCancel={() => setEditing(null)}
                    onSave={handleSave}
                />
            )} */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editing?.id ? 'Edit Address' : 'New Address'}</DialogTitle>
                    </DialogHeader>

                    <ShippingAddressForm
                        initialData={editing as ShippingAddressDto}
                        onCancel={() => setOpen(false)}
                        onSave={(data) => {
                            handleSave(data);
                            setOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
