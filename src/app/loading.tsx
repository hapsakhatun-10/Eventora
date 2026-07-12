export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="mt-4 text-sm font-medium text-gray-500">Loading...</p>
        </div>
    );
}
