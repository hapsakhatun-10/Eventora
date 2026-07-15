export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex gap-6 animate-pulse">
                <div className="hidden lg:block w-56 space-y-4">
                    <div className="h-10 w-full bg-gray-200 rounded-xl" />
                    <div className="h-10 w-full bg-gray-200 rounded-xl" />
                    <div className="h-10 w-full bg-gray-200 rounded-xl" />
                </div>
                <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 bg-gray-200 rounded-2xl" />
                        <div className="space-y-2">
                            <div className="h-7 w-48 bg-gray-200 rounded" />
                            <div className="h-4 w-32 bg-gray-100 rounded" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded-2xl" />
                        ))}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3">
                                <div className="h-14 w-14 bg-gray-200 rounded-xl" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-3 w-1/2 bg-gray-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
