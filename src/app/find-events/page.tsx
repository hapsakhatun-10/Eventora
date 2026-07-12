"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    MapPin,
    Loader2,
    Clock,
} from "lucide-react";
import MapSection from "../components/MapSection";
import Sidebar from "../components/Sidebar";
import ShareButton from "../components/ShareButton";
import FavoriteButton from "../components/FavoriteButton";

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

export default function EventDiscoveryPage() {
    const [events, setEvents] = useState<RawEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; label: string } | null>(null);
    const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "error">("idle");

    useEffect(() => {
        fetch(`${API_URL}/events`)
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const fetchLocation = useCallback(() => {
        if (!navigator.geolocation) return setLocationStatus("error");
        setLocationStatus("loading");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude: lat, longitude: lng } = pos.coords;
                let label = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`
                    );
                    const data = await res.json();
                    if (data.address) {
                        const parts = [data.address.suburb, data.address.city, data.address.country].filter(Boolean);
                        if (parts.length > 0) label = parts.join(", ");
                    }
                } catch { }
                setUserLocation({ lat, lng, label });
                setLocationStatus("idle");
            },
            () => setLocationStatus("error"),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    }, []);

    useEffect(() => { fetchLocation(); }, [fetchLocation]);

    return (
        <div className="w-full  bg-white flex flex-col font-sans">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 w-full items-start">
                <Sidebar />

                <main className="lg:col-span-5 space-y-6">
                    <header className="border-b border-gray-100 pb-4">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Events and Things to do in Dhaka, Bangladesh
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Search for something you love or check out popular events in your area.
                        </p>
                    </header>
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 size={24} className="animate-spin text-gray-400" />
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg font-medium">No events found</p>
                        </div>
                    ) : (
                        events.map((event) => {
                            const location = [event.venue, event.city].filter(Boolean).join(", ");
                            const bannerUrl = event.banner ? `${API_URL}/uploads/${event.banner}` : null;
                            return (
                                <div
                                    key={event._id}
                                    className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6 group cursor-pointer"
                                >
                                    <div className="w-full sm:w-48 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                        {bannerUrl ? (
                                            <img
                                                src={bannerUrl}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                                                {event.category || "Event"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 text-base md:text-lg leading-snug group-hover:text-blue-600 transition-colors">
                                                    {event.title}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 font-medium">
                                                {event.date}{event.startTime ? ` · ${event.startTime}` : ""}
                                            </p>
                                            {location && (
                                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                                    <MapPin size={11} />
                                                    {location}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {event.price ? `৳${event.price.toLocaleString()}` : "Free"}
                                                </p>
                                                {/* Sales End Soon Badge */}
                                                <div className="flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-semibold px-2 py-1 rounded-full">
                                                    <Clock size={12} />
                                                    <span>Sales end soon</span>
                                                </div>
                                                <div className="text-yellow-600 text-[11px] font-bold px-2 py-1 rounded-full">
                                                    Promoted
                                                </div>
                                            </div>
                                            {/* Action Icons */}
                                            <div className="flex items-center gap-2">
                                                <ShareButton eventId={event._id} />
                                                <FavoriteButton eventId={event._id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </main>

                <MapSection
                    userLocation={userLocation}
                    locationStatus={locationStatus}
                    eventCount={events.length}
                    onFetchLocation={fetchLocation}
                />
            </div>
        </div >
    );
}
