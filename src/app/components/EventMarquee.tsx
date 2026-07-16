"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface MarqueeEvent {
    _id: string;
    title: string;
    category?: string;
    date: string;
    startTime?: string;
    price?: number;
    banner?: string;
    venue?: string;
    city?: string;
}

export default function EventMarquee() {
    const [events, setEvents] = useState<MarqueeEvent[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/events?limit=10`)
            .then((res) => res.json())
            .then((data) => setEvents(data.events || []))
            .catch(() => { });
    }, []);

    if (events.length === 0) return null;

    const duplicated = [...events, ...events];

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        Browse Events
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Discover what&apos;s happening near you
                    </p>
                </div>
                <Link
                    href="/find-events"
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-900 transition-colors"
                >
                    View all <ArrowRight size={14} />
                </Link>
            </div>

            <div className="relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
                    {duplicated.map((event, i) => {
                        const location = [event.venue, event.city].filter(Boolean).join(", ");
                        return (
                            <Link
                                key={`${event._id}-${i}`}
                                href={`/event/${event._id}`}
                                className="flex-shrink-0 w-64 sm:w-72 rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 group/card"
                            >
                                <div className="h-36 sm:h-40 bg-slate-100 overflow-hidden">
                                    {event.banner ? (
                                        <Image
                                            src={event.banner}
                                            alt={event.title}
                                            fill
                                            sizes="(max-width: 640px) 256px, 288px"
                                            className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center text-white text-sm font-bold">
                                            {event.category || "Event"}
                                        </div>
                                    )}
                                </div>
                                <div className="p-3.5">
                                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover/card:text-slate-900 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        <Clock size={11} className="shrink-0" />
                                        {event.date}{event.startTime ? ` · ${event.startTime}` : ""}
                                    </p>
                                    {location && (
                                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                            <MapPin size={11} className="shrink-0" />
                                            <span className="truncate">{location}</span>
                                        </p>
                                    )}
                                    <p className="text-sm font-semibold text-slate-800 mt-2">
                                        {event.price ? `$${event.price.toLocaleString()}` : "Free"}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
