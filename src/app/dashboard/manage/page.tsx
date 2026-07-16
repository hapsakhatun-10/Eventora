"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Plus,
    Trash2,
    ExternalLink,
    Calendar,
    MapPin,
    Loader2,
    Ticket,
} from "lucide-react";
import UserMenu from "../../components/UserMenu";
import { useToast } from "../../components/Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Event {
    _id: string;
    title: string;
    category?: string;
    date: string;
    startTime?: string;
    endTime?: string;
    price?: number;
    totalSeats?: number;
    availableSeats?: number;
    banner?: string;
    venue?: string;
    city?: string;
    createdBy?: string;
}

export default function ManageEventsPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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

    const handleDelete = async (eventId: string) => {
        setDeletingId(eventId);
        try {
            const res = await fetch(`${API_URL}/events/${eventId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                setMyEvents((prev) => prev.filter((e) => e._id !== eventId));
                setConfirmDelete(null);
                showToast("Event deleted successfully", "success");
            } else {
                const data = await res.json();
                showToast(data.message || "Failed to delete event", "error");
            }
        } catch {
            showToast("Failed to delete event", "error");
        } finally {
            setDeletingId(null);
        }
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Manage My Events</h1>
                            <p className="text-sm text-gray-500 mt-1">View, edit, and delete your events</p>
                        </div>
                        <Link
                            href="/create-event"
                            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900 transition-all hover:shadow-lg active:scale-[0.98]"
                        >
                            <Plus size={18} />
                            Create Event
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-4">
                            <p className="text-2xl font-extrabold text-gray-900">{myEvents.length}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Total Events</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4">
                            <p className="text-2xl font-extrabold text-blue-600">
                                {myEvents.filter((e) => new Date(e.date) >= new Date()).length}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">Upcoming</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4">
                            <p className="text-2xl font-extrabold text-green-600">
                                {myEvents.filter((e) => new Date(e.date) < new Date()).length}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">Past</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4">
                            <p className="text-2xl font-extrabold text-slate-900">
                                ${myEvents.reduce((sum, e) => sum + (e.price || 0), 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">Total Value</p>
                        </div>
                    </div>

                    {/* Events Table */}
                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">All Events</h2>
                        </div>

                        {eventsLoading ? (
                            <div className="flex justify-center py-16">
                                <Loader2 size={28} className="animate-spin text-gray-400" />
                            </div>
                        ) : myEvents.length === 0 ? (
                            <div className="text-center py-16">
                                <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-medium text-lg">No events yet</p>
                                <p className="text-gray-400 text-sm mt-1">Create your first event to get started</p>
                                <Link
                                    href="/create-event"
                                    className="inline-flex items-center gap-2 mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all"
                                >
                                    <Plus size={16} />
                                    Create Event
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {myEvents.map((event) => {
                                    const bannerUrl = event.banner || null;
                                    const isPast = new Date(event.date) < new Date();
                                    return (
                                        <div
                                            key={event._id}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Thumbnail */}
                                            <Link href={`/event/${event._id}`} className="h-16 w-16 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden hover:opacity-80 transition-opacity">
                                                {bannerUrl ? (
                                                    <Image src={bannerUrl} alt={event.title} width={64} height={64} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full bg-linear-to-br from-slate-900 to-blue-900 flex items-center justify-center text-white text-[10px] font-bold">
                                                        {event.category || "Event"}
                                                    </div>
                                                )}
                                            </Link>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <Link href={`/event/${event._id}`} className="font-bold text-gray-900 text-sm hover:text-slate-900 transition-colors truncate">
                                                        {event.title}
                                                    </Link>
                                                    {isPast && (
                                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">Past</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {event.date}{event.startTime ? ` · ${event.startTime}` : ""}
                                                    </span>
                                                    {(event.venue || event.city) && (
                                                        <span className="flex items-center gap-1 truncate">
                                                            <MapPin size={12} />
                                                            {[event.venue, event.city].filter(Boolean).join(", ")}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-sm font-semibold text-gray-800 shrink-0 hidden sm:block">
                                                {event.price ? `$${event.price.toLocaleString()}` : "Free"}
                                            </div>

                                            {/* Seats */}
                                            <div className="text-xs text-gray-500 shrink-0 hidden sm:block w-20 text-right">
                                                {event.totalSeats ? `${event.availableSeats}/${event.totalSeats} left` : "—"}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1 shrink-0">
                                                <Link
                                                    href={`/event/${event._id}`}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    title="View event"
                                                >
                                                    <ExternalLink size={16} />
                                                </Link>

                                                {confirmDelete === event._id ? (
                                                    <div className="flex items-center gap-1 bg-red-50 rounded-lg px-2 py-1">
                                                        <button
                                                            onClick={() => handleDelete(event._id)}
                                                            disabled={deletingId === event._id}
                                                            className="text-xs font-bold text-red-600 hover:text-red-700 disabled:opacity-50"
                                                        >
                                                            {deletingId === event._id ? (
                                                                <Loader2 size={14} className="animate-spin" />
                                                            ) : (
                                                                "Confirm"
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmDelete(null)}
                                                            className="text-xs font-medium text-gray-500 hover:text-gray-700"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setConfirmDelete(event._id)}
                                                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Delete event"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
