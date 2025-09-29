'use client';
import { ShippingAddressDto } from '@/modals';
import React, { useState } from 'react';

const ShippingAddressForm = ({
    initialData,
    onSave,
    onCancel,
}: {
    initialData: ShippingAddressDto;
    onSave: (data: ShippingAddressDto) => void;
    onCancel: () => void;
}) => {
    const [formData, setFormData] = useState<ShippingAddressDto>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                name="shippingFirstName"
                placeholder="First Name"
                value={formData.shippingFirstName}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="shippingLastName"
                placeholder="Last Name"
                value={formData.shippingLastName}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="shippingAddress1"
                placeholder="Address Line 1"
                value={formData.shippingAddress1}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
            />
            <input
                name="shippingAddress2"
                placeholder="Address Line 2"
                value={formData.shippingAddress2}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
            />
            <input
                name="shippingCity"
                placeholder="City"
                value={formData.shippingCity}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="shippingProvince"
                placeholder="Province"
                value={formData.shippingProvince}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="shippingZipCode"
                placeholder="Zip Code"
                value={formData.shippingZipCode}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="shippingCountryCode"
                placeholder="Country Code"
                value={formData.shippingCountryCode}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                name="shippingPhoneNumber"
                placeholder="Phone Number"
                value={formData.shippingPhoneNumber}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="number"
                name="shippingFloorNumber"
                placeholder="Floor Number"
                value={formData.shippingFloorNumber}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isRuralArea"
                    checked={formData.isRuralArea}
                    onChange={handleChange}
                />
                Rural Area
            </label>
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
                Set as default address
            </label>

            <div className="col-span-2 flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white  hover:bg-blue-400 px-4 py-2 rounded cursor-pointer"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ShippingAddressForm;
