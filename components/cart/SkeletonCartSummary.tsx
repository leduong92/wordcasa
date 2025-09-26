import React from 'react';

const SkeletonCartSummary = () => {
    return (
        <div className="pt-20">
            <div className="bg-neutral-200/10 p-6 md:p-8 rounded-lg shadow-sm animate-pulse space-y-4">
                <div className="h-6 w-40 bg-neutral-200 rounded mb-4" />

                {/* rows */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="h-4 w-24 bg-neutral-200 rounded" />
                        <div className="h-4 w-16 bg-neutral-200 rounded" />
                    </div>
                ))}

                {/* total */}
                <div className="border-t pt-4 flex justify-between items-center">
                    <div className="h-5 w-48 bg-neutral-200 rounded" />
                    <div className="h-5 w-24 bg-neutral-200 rounded" />
                </div>

                {/* checkout btn */}
                <div className="h-10 w-full bg-neutral-200 rounded mt-6" />
            </div>
        </div>
    );
};

export default SkeletonCartSummary;
