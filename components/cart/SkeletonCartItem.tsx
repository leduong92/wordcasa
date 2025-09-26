import React from 'react';

const SkeletonCartItem = () => {
    return (
        <>
            <h1 className="text-6xl font-serif mb-6 font-basker ">Cart</h1>
            {[1, 2].map((i) => (
                <div
                    key={i}
                    className="bg-neutral-200/10 border-b p-4 md:p-6 rounded-lg flex flex-col md:flex-row gap-4 animate-pulse"
                >
                    {/* Image skeleton */}
                    <div className="relative w-full md:w-60 h-48 md:h-60 flex-shrink-0 bg-neutral-200 rounded-lg" />

                    {/* Info skeleton */}
                    <div className="flex-1 flex flex-col justify-between w-full px-2 space-y-4">
                        {/* Title + quantity */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="h-5 w-40 bg-neutral-200 rounded" />
                                <div className="h-4 w-24 bg-neutral-200 rounded" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-neutral-200 rounded" />
                                <div className="h-5 w-6 bg-neutral-200 rounded" />
                                <div className="h-8 w-8 bg-neutral-200 rounded" />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="h-3 w-24 bg-neutral-200 rounded" />
                            <div className="h-5 w-32 bg-neutral-200 rounded" />
                        </div>

                        {/* Size + remove */}
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <div className="h-4 w-28 bg-neutral-200 rounded" />
                                <div className="h-4 w-20 bg-neutral-200 rounded" />
                            </div>
                            <div className="h-4 w-16 bg-neutral-200 rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SkeletonCartItem;
