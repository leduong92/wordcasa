'use client';

export default function OrderDetailSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 animate-pulse">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6">
                {/* Back link */}
                <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mb-8"></div>

                {/* Shipping & Payment info */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                        <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                        <div className="h-4 w-44 bg-gray-200 rounded"></div>
                        <div className="h-4 w-56 bg-gray-200 rounded"></div>
                        <div className="h-4 w-52 bg-gray-200 rounded"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Items */}
                <div className="mt-10">
                    <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

                    {/* 3 fake items */}
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-4 border-b border-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                <div>
                                    <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="mt-6 flex justify-end">
                    <div className="text-right space-y-2">
                        <div className="h-3 w-20 bg-gray-200 rounded ml-auto"></div>
                        <div className="h-5 w-24 bg-gray-200 rounded ml-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
