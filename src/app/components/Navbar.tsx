"use client";

import Link from "next/link";
import { ChevronDown, MapPin, Search, Ticket } from "lucide-react";

const Navbar = () => {
    return (
        <header className="border-b border-gray-200 bg-white">
            <nav className="mx-auto flex h-[72px] w-full items-center justify-between px-6">
                {/* Left Section */}
                <div className="flex items-center gap-12">
                    {/* Logo */}


                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                            <Ticket className="h-6 w-6" />
                        </div>

                        <h1 className="text-3xl font-black tracking-tight">
                            <span className="text-slate-900">Even</span>
                            <span className="text-orange-600">to</span>
                        </h1>
                    </Link>


                    <div className="hidden h-12 w-220 overflow-hidden rounded-full border border-gray-300 bg-white transition-all duration-200 hover:border-gray-500 focus-within:border-black focus-within:ring-1 focus-within:ring-black lg:flex">
                        {/* Search Input */}
                        <div className="flex flex-1 items-center gap-3 px-5">
                            <Search
                                size={20}
                                className="text-gray-500 transition-colors group-focus-within:text-black"
                            />

                            <input
                                type="text"
                                placeholder="Search events"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                            />
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-gray-300" />

                        {/* Location Input */}
                        <div className="flex w-110 items-center gap-3 px-5">
                            <MapPin size={20} className="text-gray-500" />

                            <input
                                type="text"
                                placeholder="Your Location"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="m-1 flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white transition-all duration-200 hover:scale-105 hover:bg-orange-700 active:scale-95">
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
                    <Link
                        href="#"
                        className="nav-link"
                    >
                        Updates
                    </Link>

                    <Link
                        href="#"
                        className="nav-link"
                    >
                        Find Events
                    </Link>

                    <Link
                        href="#"
                        className="nav-link"
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
                        href="#"
                        className="nav-link"
                    >
                        Find my tickets
                    </Link>

                    <Link
                        href="#"
                        className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-gray-100 hover:text-orange-600"
                    >
                        Sign in
                    </Link>
                </div>

                {/* Mobile Search Icon */}
                <button className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden">
                    <Search size={22} />
                </button>
            </nav>
        </header>
    );
};

export default Navbar;