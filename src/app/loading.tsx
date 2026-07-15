export default function Loading() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50/30">
            <div className="flex flex-col items-center gap-8">
                {/* Animated Logo */}
                <div className="relative">
                    <div className="absolute inset-0 bg-slate-400/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/30 animate-bounce">
                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Event<span className="text-slate-500">o</span>ra
                        </span>
                    </div>
                </div>

                {/* Animated Loading Dots */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-3 h-3 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-3 h-3 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>

                {/* Skeleton Content Preview */}
                <div className="w-full max-w-md space-y-4 mt-4">
                    {/* Skeleton Banner */}
                    <div className="h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl bg-[length:200%_100%] bg-[linear-gradient(90deg,#f3f4f6_25%,#e5e7eb_50%,#f3f4f6_75%)] animate-shimmer" />

                    {/* Skeleton Text Lines */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse" style={{ animationDelay: "0.2s" }} />
                        <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>

                    {/* Skeleton Cards */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-24 bg-gray-200 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                                <div className="h-3 bg-gray-200 rounded-full w-full animate-pulse" style={{ animationDelay: `${i * 0.15 + 0.1}s` }} />
                                <div className="h-3 bg-gray-200 rounded-full w-2/3 animate-pulse" style={{ animationDelay: `${i * 0.15 + 0.2}s` }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Loading Text */}
                <div className="flex items-center gap-2 mt-4">
                    <svg className="w-5 h-5 text-slate-900 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-sm font-medium text-slate-500">Preparing your experience...</p>
                </div>
            </div>
        </div>
    );
}
