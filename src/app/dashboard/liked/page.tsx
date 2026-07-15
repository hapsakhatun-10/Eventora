"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Heart,
    MapPin,
    Clock,
    Loader2,
    Calendar,
} from "lucide-react";
import UserMenu from "../../components/UserMenu";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Event {
    _id: string;
    title: string;
    category?: string;
    date: string;
    startTime?: string;
    endTime?: string;
    price?: number;
    banner?: string;
    venue?: string;
    city?: string;
    availableSeats?: number;
    totalSeats?: number;
}

function getFavoriteIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem("evento_favorites");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function removeFavorite(eventId: string) {
    try {
        const stored = localStorage.getItem("evento_favorites");
        const favorites: string[] = stored ? JSON.parse(stored) : [];
        const updated = favorites.filter((id) => id !== eventId);
        localStorage.setItem("evento_favorites", JSON.stringify(updated));
    } catch {}
}

export default function LikedEventsPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; name: string } | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [events, setEvents] = useState<Event[]>([]);
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
        const ids = getFavoriteIds();
        if (ids.length === 0) {
            Promise.resolve().then(() => setEventsLoading(false));
            return;
        }
        fetch(`${API_URL}/events/batch?ids=${ids.join(",")}`)
            .then((res) => res.json())
            .then((data) => setEvents(data.events || []))
            .catch(() => setEvents([]))
            .finally(() => setEventsLoading(false));
    }, [user]);

    const handleRemove = (eventId: string) => {
        removeFavorite(eventId);
        setEvents((prev) => prev.filter((e) => e._id !== eventId));
    };

    if (loadingAuth || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-slate-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-4 sm:px-6 py-8 sm:py-12 flex gap-6">
                <UserMenu />
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Liked Events</h1>
                        <p className="text-sm text-gray-500 mt-1">Events you&apos;ve saved to your favourites</p>
                    </div>

                    {/* Events */}
                    {eventsLoading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-gray-400" />
                        </div>
                    ) : events.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-white text-center py-16">
                            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium text-lg">No liked events yet</p>
                            <p className="text-gray-400 text-sm mt-1">Browse events and tap the heart icon to save them here</p>
                            <Link
                                href="/find-events"
                                className="inline-flex items-center gap-2 mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all"
                            >
                                Browse Events
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {events.map((event) => {
                                const bannerUrl = event.banner || null;
                                const location = [event.venue, event.city].filter(Boolean).join(", ");
                                return (
                                    <div
                                        key={event._id}
                                        className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow group"
                                    >
                                        {/* Banner */}
                                        <Link href={`/event/${event._id}`} className="block relative h-44 overflow-hidden">
                                            {bannerUrl ? (
                                                <img
                                                    src={bannerUrl}
                                                    alt={event.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-slate-900 to-blue-900 flex items-center justify-center text-white font-bold">
                                                    {event.category || "Event"}
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <button
                                                    onClick={() => handleRemove(event._id)}
                                                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-red-500 shadow-lg hover:bg-white hover:scale-110 transition-all"
                                                    title="Remove from favourites"
                                                >
                                                    <Heart size={16} fill="currentColor" />
                                                </button>
                                            </div>
                                        </Link>

                                        {/* Info */}
                                        <div className="p-4 space-y-3">
                                            <Link href={`/event/${event._id}`}>
                                                <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-slate-900 transition-colors line-clamp-2">
                                                    {event.title}
                                                </h3>
                                            </Link>

                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                <span>{event.date}{event.startTime ? ` · ${event.startTime}` : ""}</span>
                                            </div>

                                            {location && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <MapPin size={12} className="shrink-0" />
                                                    <span className="truncate">{location}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {event.price ? `৳${event.price.toLocaleString()}` : "Free"}
                                                </p>
                                                {event.totalSeats ? (
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock size={11} />
                                                        <span>{event.availableSeats} spots left</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
