export default function Loading() {
    return (
        <div className="w-full font-sans text-gray-900 bg-white animate-pulse">
            <div className="w-full h-72 sm:h-96 md:h-[480px] bg-gray-200" />
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-12">
                <div className="space-y-3">
                    <div className="h-10 w-3/4 bg-gray-200 rounded" />
                    <div className="h-5 w-1/2 bg-gray-100 rounded" />
                </div>
                <div className="flex gap-4">
                    <div className="h-10 w-32 bg-slate-100 rounded-xl" />
                    <div className="h-10 w-28 bg-slate-100 rounded-xl" />
                    <div className="h-10 w-36 bg-slate-100 rounded-xl" />
                </div>
                <div className="space-y-3">
                    <div className="h-6 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                </div>
            </div>
        </div>
    );
}
