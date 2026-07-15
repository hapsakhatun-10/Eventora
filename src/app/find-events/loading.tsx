export default function Loading() {
    return (
        <div className="w-full bg-white flex flex-col font-sans">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-6 w-full items-start">
                <div className="hidden lg:block lg:col-span-2 w-full">
                    <div className="bg-gray-50 rounded-2xl p-5 space-y-6 animate-pulse">
                        <div className="h-5 w-20 bg-gray-200 rounded" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-200" />
                                    <div className="h-3 w-20 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <main className="lg:col-span-6 space-y-4 sm:space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                        <div className="h-7 w-72 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-96 bg-gray-100 rounded mt-2 animate-pulse" />
                    </div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-4 border-b border-gray-100 pb-5 animate-pulse">
                            <div className="w-48 h-32 bg-gray-200 rounded-xl flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                <div className="h-3 w-1/2 bg-gray-100 rounded" />
                                <div className="h-3 w-1/3 bg-gray-100 rounded" />
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="h-4 w-16 bg-gray-200 rounded" />
                                    <div className="h-4 w-20 bg-slate-200 rounded-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
                <div className="hidden lg:block lg:col-span-4 h-[calc(100vh-140px)] bg-gray-100 rounded-2xl animate-pulse" />
            </div>
        </div>
    );
}
