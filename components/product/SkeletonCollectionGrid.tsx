// components/SkeletonCollectionGrid.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCollectionGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="group">
                    {/* Image */}
                    <div className="relative w-full h-80 overflow-hidden">
                        <Skeleton className="w-full h-full rounded-md bg-gray-200" />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-2 text-sm py-1">
                        <Skeleton className="h-4 w-64 bg-gray-200" />
                        <Skeleton className="h-4 w-4 bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}
