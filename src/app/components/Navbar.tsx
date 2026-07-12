import Link from "next/link";
import { ChevronDown, MapPin, Search, Ticket } from "lucide-react";

const Navbar = () => {
    return (
        <header className="sticky  w-full bg-white/10 backdrop-blur-md top-0 z-50 border-b border-gray-200">
            <nav className="mx-auto flex h-18 items-center justify-between px-6">
                {/* Left Section */}
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-md transition-all duration-300  group-hover:shadow-[0_12px_35px_rgba(249,115,22,0.45)]">
                            <Ticket className="h-5 w-5" />
                        </div>

                        <h1 className="text-2xl font-extrabold tracking-tight">
                            <span className="text-slate-900">Even</span>
                            <span className="text-orange-600">to</span>
                        </h1>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden h-11 w-250 overflow-hidden rounded-full border border-gray-300 bg-white transition-all duration-300 hover:border-gray-400 hover:shadow-md focus-within:border-orange-500 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-orange-100 lg:flex">
                        {/* Search */}
                        <div className="flex flex-1 items-center gap-2 px-4">
                            <Search
                                size={18}
                                className="text-gray-500"
                            />

                            <input
                                type="text"
                                placeholder="Search events"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                            />
                        </div>

                        {/* Divider */}
                        <div className="my-2 w-px bg-gray-300" />

                        {/* Location */}
                        <div className="flex w-125 items-center gap-2 px-4">
                            <MapPin
                                size={18}
                                className="text-gray-500"
                            />

                            <input
                                type="text"
                                placeholder="Your location"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="m-1 flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-white transition-all duration-300 hover:bg-orange-700 hover:shadow-lg active:scale-95">
                            <Search size={16} />
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
                    <Link
                        href="/events"
                        className="transition-colors duration-200 hover:text-orange-600"
                    >
                        Updates
                    </Link>

                    <Link
                        href="/find-events"
                        className="transition-colors duration-200 hover:text-orange-600"
                    >
                        Find Events
                    </Link>

                    <Link
                        href="/create-event"
                        className="transition-colors duration-200 hover:text-orange-600"
                    >
                        Create Events
                    </Link>

                    <button className="group flex items-center gap-1 transition-colors duration-200 hover:text-orange-600">
                        Help Center
                        <ChevronDown
                            size={16}
                            className="transition-transform duration-200 group-hover:rotate-180"
                        />
                    </button>

                    <Link
                        href="/events"
                        className="transition-colors duration-200 hover:text-orange-600"
                    >
                        My Tickets
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-full border border-orange-600 px-5 py-2 font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-600 hover:text-white hover:shadow-lg"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Mobile Search */}
                <button className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden">
                    <Search size={22} />
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
