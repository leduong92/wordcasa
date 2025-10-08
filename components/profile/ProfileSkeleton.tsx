'use client';

export default function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-2xl">
                {/* Avatar + Info */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                    <div className="space-y-2">
                        <div className="h-5 w-40 bg-gray-200 rounded"></div>
                        <div className="h-4 w-52 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Form fields */}
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i}>
                            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                </div>

                {/* Account Settings */}
                <div className="mt-2 border-t py-3">
                    <div className="h-8 w-20 bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        </div>
    );
}
