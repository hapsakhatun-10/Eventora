"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Search, Ticket, LogOut, LayoutDashboard, User, Settings, Plus, Megaphone, Heart } from "lucide-react";
import { useAuth } from "./AuthContext";

const serif = { fontFamily: "var(--font-playfair)" };

const Navbar = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initials = user ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "";

    return (
        <>
            {/* Main Nav */}
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/60">
                <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
                    {/* Left Section */}
                    <div className="flex items-center gap-5 sm:gap-8">
                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                                <span className="text-sm font-bold lowercase" style={serif}>e</span>
                            </div>
                            <h1 className="text-lg font-bold tracking-tight lowercase" style={serif}>
                                <span className="text-slate-900">even</span>
                                <span className="text-orange-600">to</span>
                            </h1>
                        </Link>

                        {/* Search Bar - Desktop */}
                        <div className="hidden h-9 w-80 overflow-hidden rounded-full border border-gray-200 bg-gray-50/80 transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-sm focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm lg:flex">
                            <div className="flex flex-1 items-center gap-2 px-3">
                                <Search size={14} className="text-gray-400" />
                                <input type="text" placeholder="Search events" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" />
                            </div>
                            <div className="my-1.5 w-px bg-gray-200" />
                            <div className="flex w-36 items-center gap-2 px-3">
                                <MapPin size={14} className="text-gray-400" />
                                <input type="text" placeholder="Location" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" />
                            </div>
                            <button className="m-1 flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-white transition-all duration-200 hover:bg-orange-700 active:scale-95">
                                <Search size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Desktop */}
                    <div className="hidden items-center gap-1.5 text-xs font-medium text-gray-600 lg:flex">
                        {user ? (
                            <>
                                {/* Navigation - Logged In */}
                                <nav className="flex items-center gap-0.5">
                                    <Link
                                        href="/find-events"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <Search size={14} className="text-gray-400" />
                                        <span className="text-gray-600 hover:text-orange-600 transition-colors">Find</span>
                                    </Link>

                                    <Link
                                        href="/create-event"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <div className="p-1 rounded bg-orange-100 text-orange-600">
                                            <Plus size={12} />
                                        </div>
                                        <span className="text-gray-600 hover:text-orange-600 transition-colors">Create</span>
                                    </Link>

                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <Megaphone size={14} className="text-gray-400" />
                                        <span className="text-gray-600 hover:text-orange-600 transition-colors">Updates</span>
                                    </Link>

                                    <Link
                                        href="/dashboard/liked"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <Heart size={14} className="text-gray-400" />
                                        <span className="text-gray-600 hover:text-orange-600 transition-colors">Likes</span>
                                    </Link>

                                    <Link
                                        href="/tickets"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <Ticket size={14} className="text-gray-400" />
                                        <span className="text-gray-600 hover:text-orange-600 transition-colors">Tickets</span>
                                    </Link>
                                </nav>

                                {/* Divider */}
                                <div className="mx-1 h-5 w-px bg-gray-200" />

                                {/* Profile */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-bold ring-2 ring-white">
                                            {initials}
                                        </div>

                                        <div className="hidden md:block text-left">
                                            <p className="text-xs font-semibold text-gray-800 leading-none" style={serif}>
                                                {user.name}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                {user.email}
                                            </p>
                                        </div>

                                        <ChevronDown
                                            size={14}
                                            className={`text-gray-400 hidden md:block transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-xl py-1.5 z-50">
                                            <div className="px-3.5 py-2.5 border-b border-gray-100">
                                                <p className="text-xs font-bold text-gray-900" style={serif}>{user.name}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                            >
                                                <LayoutDashboard size={14} />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/settings"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                            >
                                                <Settings size={14} />
                                                Settings
                                            </Link>
                                            <div className="border-t border-gray-100 my-1" />
                                            <button
                                                onClick={() => { setDropdownOpen(false); logout(); }}
                                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={14} />
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Navigation - Logged Out */}
                                <nav className="flex items-center gap-0.5">
                                    <Link
                                        href="/find-events"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <Search size={14} className="text-gray-400" />
                                        <span className="text-gray-600">Find Events</span>
                                    </Link>

                                    <Link
                                        href="/create-event"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <div className="p-1 rounded bg-orange-100 text-orange-600">
                                            <Plus size={12} />
                                        </div>
                                        <span className="text-gray-600">Create Event</span>
                                    </Link>

                                    <Link
                                        href="/help"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <span className="text-gray-600">Help</span>
                                    </Link>

                                    <Link
                                        href="/tickets"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                                    >
                                        <Ticket size={14} className="text-gray-400" />
                                        <span className="text-gray-600">My Tickets</span>
                                    </Link>
                                </nav>

                                {/* Divider */}
                                <div className="mx-1 h-5 w-px bg-gray-200" />

                                <Link href="/login" className="rounded-full border border-orange-500 px-4 py-1.5 text-xs font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-600 hover:text-white hover:shadow-md">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Right */}
                    <div className="flex items-center gap-1 lg:hidden">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-1.5 rounded-full p-1 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-bold">
                                        {initials}
                                    </div>
                                    <ChevronDown size={12} className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl py-1.5 z-50">
                                        <div className="px-3.5 py-2.5 border-b border-gray-100">
                                            <p className="text-xs font-bold text-gray-900" style={serif}>{user.name}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/create-event"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Plus size={14} />
                                            Create Event
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Megaphone size={14} />
                                            Updates
                                        </Link>
                                        <Link
                                            href="/dashboard/liked"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Heart size={14} />
                                            Likes
                                        </Link>
                                        <Link
                                            href="/tickets"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Ticket size={14} />
                                            Tickets
                                        </Link>
                                        <div className="border-t border-gray-100 my-1" />
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <LayoutDashboard size={14} />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/settings"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Settings size={14} />
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100 my-1" />
                                        <button
                                            onClick={() => { setDropdownOpen(false); logout(); }}
                                            className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={14} />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100">
                                    <Search size={18} />
                                </button>
                                <Link href="/login" className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100">
                                    <User size={18} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - below nav */}
            <div className="lg:hidden border-b border-gray-200/60 bg-white/95 backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-1 px-4 py-1.5">
                    <Link href="/find-events" className="rounded-full px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        Find Events
                    </Link>
                    <Link href="/create-event" className="rounded-full px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        Create Event
                    </Link>
                    {user && (
                        <>
                            <Link href="/dashboard/liked" className="rounded-full px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                Likes
                            </Link>
                            <Link href="/tickets" className="rounded-full px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                Tickets
                            </Link>
                        </>
                    )}
                    {!user && (
                        <>
                            <Link href="/help" className="rounded-full px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                Help
                            </Link>
                            <Link href="/login" className="rounded-full border border-orange-500 px-3 py-1.5 text-[11px] font-semibold text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
