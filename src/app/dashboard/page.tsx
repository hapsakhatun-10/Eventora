"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Plus, Ticket, Calendar, Loader2, FolderKanban, Heart } from "lucide-react";
import UserMenu from "../components/UserMenu";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Event {
    _id: string;
    title: string;
    category?: string;
    date: string;
    startTime?: string;
    price?: number;
    banner?: string;
    createdBy?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/auth/me`, { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Not authenticated");
                return res.json();
            })
            .then((data) => setUser(data.user))
            .catch(() => router.push("/login"))
            .finally(() => setLoadingAuth(false));
    }, [router]);

    useEffect(() => {
        if (!user) return;
        fetch(`${API_URL}/events/my`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setMyEvents(data.events || []))
            .catch(() => setMyEvents([]))
            .finally(() => setEventsLoading(false));
    }, [user]);

    if (loadingAuth || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-orange-500" />
            </div>
        );
    }

    const initials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex gap-6">
                <UserMenu />
                <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-xl font-bold shadow-lg">
                        {initials}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome, {user.name}</h1>
                        <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                    </div>
                    <Link
                        href="/create-event"
                        className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700 transition-all hover:shadow-lg active:scale-[0.98]"
                    >
                        <Plus size={18} />
                        Create Event
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                <Ticket size={18} />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900">{myEvents.length}</p>
                                <p className="text-xs text-gray-500">Events Created</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900">
                                    {myEvents.filter((e) => new Date(e.date) >= new Date()).length}
                                </p>
                                <p className="text-xs text-gray-500">Upcoming</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <LayoutDashboard size={18} />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-gray-900">
                                    {myEvents.reduce((sum, e) => sum + (e.price || 0), 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">Total Revenue (৳)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <Link
                        href="/dashboard/manage"
                        className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:border-orange-200 hover:bg-orange-50 transition-all group"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-200 transition-colors">
                            <FolderKanban size={22} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Manage Events</p>
                            <p className="text-xs text-gray-500 mt-0.5">Edit and delete your events</p>
                        </div>
                    </Link>
                    <Link
                        href="/dashboard/liked"
                        className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:border-red-200 hover:bg-red-50 transition-all group"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
                            <Heart size={22} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Liked Events</p>
                            <p className="text-xs text-gray-500 mt-0.5">Your favourite events</p>
                        </div>
                    </Link>
                </div>

                {/* My Events */}
                <div className="rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">My Events</h2>
                        <Link href="/dashboard/manage" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                            Manage All
                        </Link>
                    </div>
                    <div className="p-6">
                        {eventsLoading ? (
                            <div className="flex justify-center py-10">
                                <Loader2 size={24} className="animate-spin text-gray-400" />
                            </div>
                        ) : myEvents.length === 0 ? (
                            <div className="text-center py-10">
                                <Ticket size={40} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">You haven&apos;t created any events yet</p>
                                <Link
                                    href="/create-event"
                                    className="inline-flex items-center gap-2 mt-4 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700 transition-all"
                                >
                                    <Plus size={16} />
                                    Create Your First Event
                                </Link>
                            </div>
                    ) : (
                            <div className="space-y-3">
                                {myEvents.map((event) => {
                                    const bannerUrl = event.banner || null;
                                    return (
                                        <Link
                                            key={event._id}
                                            href={`/event/${event._id}`}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden">
                                                {bannerUrl ? (
                                                    <img src={bannerUrl} alt={event.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                                                        {event.category || "Event"}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors truncate">
                                                    {event.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {event.date}{event.startTime ? ` · ${event.startTime}` : ""}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800 shrink-0">
                                                {event.price ? `৳${event.price.toLocaleString()}` : "Free"}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
