"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    MapPin,
    Clock,
    Calendar,
    Loader2,
    ArrowLeft,
    Ticket,
    Users,
    Share2,
    Heart,
} from "lucide-react";
import ShareButton from "../../components/ShareButton";
import FavoriteButton from "../../components/FavoriteButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface RawEvent {
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
    address?: string;
    shortDescription?: string;
    description?: string;
    totalSeats?: number;
    availableSeats?: number;
}

export default function EventDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [event, setEvent] = useState<RawEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetch(`${API_URL}/events/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => setEvent(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-orange-500" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-gray-500 text-lg font-medium">Event not found</p>
                <Link
                    href="/find-events"
                    className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition-colors"
                >
                    Browse Events
                </Link>
            </div>
        );
    }

    const bannerUrl = event.banner ? `${API_URL}/uploads/${event.banner}` : null;
    const location = [event.venue, event.city].filter(Boolean).join(", ");
    const fullAddress = [event.address, event.city].filter(Boolean).join(", ");
    const seatsLeft = event.availableSeats ?? event.totalSeats;

    return (
        <div className="min-h-screen bg-white">
            {/* Banner */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100">
                {bannerUrl ? (
                    <img
                        src={bannerUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-orange-500 via-orange-600 to-red-500 flex items-center justify-center">
                        <Ticket size={64} className="text-white/30" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Back button */}
                <Link
                    href="/find-events"
                    className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-800 hover:bg-white transition-colors shadow-sm"
                >
                    <ArrowLeft size={16} />
                    Back
                </Link>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white transition-colors shadow-sm">
                        <Share2 size={15} />
                    </button>
                    <button className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white transition-colors shadow-sm">
                        <Heart size={15} />
                    </button>
                </div>

                {/* Category badge */}
                {event.category && (
                    <div className="absolute bottom-4 left-4 sm:left-6">
                        <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-orange-600 uppercase tracking-wide shadow-sm">
                            {event.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            {event.title}
                        </h1>

                        {event.shortDescription && (
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                {event.shortDescription}
                            </p>
                        )}

                        {/* Date & Time */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{event.date}</p>
                                    <p className="text-xs text-gray-500">Date</p>
                                </div>
                            </div>
                            {(event.startTime || event.endTime) && (
                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {event.startTime}
                                            {event.endTime ? ` - ${event.endTime}` : ""}
                                        </p>
                                        <p className="text-xs text-gray-500">Time</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Location */}
                        {location && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{event.venue}</p>
                                    {fullAddress && (
                                        <p className="text-sm text-gray-500 mt-0.5">{fullAddress}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {event.description && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">About This Event</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-5">
                            {/* Price */}
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Price</p>
                                <p className="text-2xl font-extrabold text-gray-900 mt-1">
                                    {event.price ? `৳${event.price.toLocaleString()}` : "Free"}
                                </p>
                            </div>

                            {/* Seats */}
                            {seatsLeft != null && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users size={16} className="text-gray-400" />
                                    <span>
                                        <span className="font-semibold text-gray-900">{seatsLeft}</span>
                                        {event.totalSeats != null && ` / ${event.totalSeats}`} seats available
                                    </span>
                                </div>
                            )}

                            {/* CTA */}
                            <button className="w-full rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-orange-700 transition-all duration-200 hover:shadow-lg active:scale-[0.98]">
                                Get Tickets
                            </button>

                            {/* Share & Favorite */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <ShareButton eventId={event._id} />
                                </div>
                                <div className="flex-1">
                                    <FavoriteButton eventId={event._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
