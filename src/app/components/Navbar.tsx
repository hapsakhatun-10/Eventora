"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Search, Ticket, LogOut, LayoutDashboard, User, Settings } from "lucide-react";
import { useAuth } from "./AuthContext";

const navLinks = [
    { href: "/events", label: "Updates" },
    { href: "/find-events", label: "Find Events" },
    { href: "/create-event", label: "Create Events" },
    { href: "/events", label: "My Tickets" },
];

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
            <nav className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-gray-200">
                <div className="mx-auto flex h-18 items-center justify-between px-4 sm:px-6">
                    {/* Left Section */}
                    <div className="flex items-center gap-6 sm:gap-12">
                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
                            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-md transition-all duration-300 group-hover:shadow-[0_12px_35px_rgba(249,115,22,0.45)]">
                                <Ticket className="h-5 w-5" />
                            </div>
                            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                                <span className="text-slate-900">Even</span>
                                <span className="text-orange-600">to</span>
                            </h1>
                        </Link>

                        {/* Search Bar - Desktop */}
                        <div className="hidden h-11 w-250 overflow-hidden rounded-full border border-gray-300 bg-white transition-all duration-300 hover:border-gray-400 hover:shadow-md focus-within:border-orange-500 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-orange-100 lg:flex">
                            <div className="flex flex-1 items-center gap-2 px-4">
                                <Search size={18} className="text-gray-500" />
                                <input type="text" placeholder="Search events" className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500" />
                            </div>
                            <div className="my-2 w-px bg-gray-300" />
                            <div className="flex w-125 items-center gap-2 px-4">
                                <MapPin size={18} className="text-gray-500" />
                                <input type="text" placeholder="Your location" className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500" />
                            </div>
                            <button className="m-1 flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-white transition-all duration-300 hover:bg-orange-700 hover:shadow-lg active:scale-95">
                                <Search size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Desktop */}
                    <div className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
                        {navLinks.map((link) => (
                            <Link key={link.href + link.label} href={link.href} className="transition-colors duration-200 hover:text-orange-600">
                                {link.label}
                            </Link>
                        ))}
                        <button className="group flex items-center gap-1 transition-colors duration-200 hover:text-orange-600">
                            Help Center
                            <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                        </button>
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-full p-0.5 pr-3 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-sm font-bold">
                                        {initials}
                                    </div>
                                    <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Settings size={16} />
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100 my-1" />
                                        <button
                                            onClick={() => { setDropdownOpen(false); logout(); }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="rounded-full border border-orange-600 px-5 py-2 font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-600 hover:text-white hover:shadow-lg">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Right */}
                    <div className="flex items-center gap-2 lg:hidden">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-sm font-bold"
                                >
                                    {initials}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Settings size={16} />
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100 my-1" />
                                        <button
                                            onClick={() => { setDropdownOpen(false); logout(); }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100">
                                    <Search size={22} />
                                </button>
                                <Link href="/login" className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100">
                                    <User size={22} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - below nav */}
            <div className="lg:hidden border-b border-gray-200 bg-white/95 backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-1 px-4 py-2">
                    {navLinks.map((link) => (
                        <Link key={link.href + link.label} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                    <button className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        Help Center
                    </button>
                    {!user && (
                        <Link href="/login" className="rounded-full border border-orange-600 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
