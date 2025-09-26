// components/SkeletonProductDetail.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonProductDetail() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 md:gap-12 pt-4">
            {/* Left: Sticky Images */}
            <div className="relative lg:col-span-7">
                <div className="sticky top-28">
                    <div className="flex flex-col gap-4 h-[600px]">
                        <Skeleton className="w-full h-[600px] rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Right: Product Info & Variants */}
            <div className="space-y-6 lg:col-span-3">
                {/* Title + SKU */}
                <div>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                </div>

                {/* Dimensions */}
                <div>
                    <Skeleton className="h-4 w-1/4 mb-1" />
                    <Skeleton className="h-4 w-1/5" />
                </div>

                {/* Variant selector */}
                <div>
                    <Skeleton className="h-5 w-24 mb-3" />
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton key={idx} className="w-24 h-24 rounded-md" />
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-6 w-32" />
                </div>

                {/* Add to Cart Button */}
                <Skeleton className="h-12 w-full rounded-lg" />

                {/* Accordion */}
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
