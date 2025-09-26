export default function SkeletonProductCard() {
    return (
        <div className="flex flex-col h-full overflow-hidden animate-pulse">
            {/* Ảnh */}
            <div className="h-[220px] md:h-[240px] lg:h-[260px] bg-gray-200 rounded-md" />

            <div className="flex-1 flex flex-col pt-2">
                {/* Tên sản phẩm */}
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

                {/* SKU */}
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

                {/* Variants */}
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
}
