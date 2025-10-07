// components/skeletons/AddressCardSkeleton.tsx
import React from 'react';

export default function AddressCardSkeleton() {
    return (
        <>
            {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="rounded-md border border-neutral-300 p-5 animate-pulse">
                    <div className="flex justify-between items-center mb-2">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-4"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                    </div>

                    <div className="flex gap-3 mt-3">
                        <div className="h-4 bg-gray-300 rounded w-6"></div>
                        <div className="h-4 bg-gray-300 rounded w-6"></div>
                    </div>
                </div>
            ))}
        </>
    );
}
