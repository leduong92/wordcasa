'use client';

interface OrdersSkeletonProps {
    rows?: number;
}

export default function OrdersSkeleton({ rows = 3 }: OrdersSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-gray-100">
                    <td className="py-4 px-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="py-4 px-4">
                        <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                    </td>
                    <td className="py-4 px-4 text-right">
                        <div className="h-4 w-10 bg-gray-200 rounded ml-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-right">
                        <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-right">
                        <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
                    </td>
                </tr>
            ))}
        </>
    );
}
