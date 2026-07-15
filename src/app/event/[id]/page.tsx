"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Clock,
    MapPin,
    Car,
    Bus,
    Bike,
    Footprints,
    ExternalLink,
    Loader2,
    CalendarDays,
    Share2,
    Flag,
    Heart,
    Ticket,
    Tag,
    Users,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../components/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface EventData {
    _id: string;
    title: string;
    category: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
    banner: string;
    images: string[];
    createdBy: string;
    createdByName: string;
    createdAt: string;
    description?: string;
    shortDescription?: string;
    venue?: string;
    city?: string;
    address?: string;
    eventType?: string;
    locationTab?: string;
    onlineUrl?: string;
}

interface OrganizerData {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

const faqData = [
    { q: "Is there a refund policy?", a: "Refunds are available up to 48 hours before the event starts. Contact the organizer for special circumstances." },
    { q: "What should I bring?", a: "Your ticket (digital or printed), a valid ID, and any personal items you may need during the event." },
    { q: "Is the venue accessible?", a: "Yes, the venue provides wheelchair access and accessibility accommodations. Contact the organizer for specific requirements." },
];

export default function EventDetailPage() {
    const { user } = useAuth();
    const params = useParams();
    const id = params.id as string;
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [liked, setLiked] = useState(() => {
        if (typeof window === "undefined") return false;
        try {
            const stored = localStorage.getItem("evento_favorites");
            return stored ? JSON.parse(stored).includes(id) : false;
        } catch { return false; }
    });
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [organizer, setOrganizer] = useState<OrganizerData | null>(null);
    const [reserving, setReserving] = useState(false);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetch(`${API_URL}/events/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Event not found");
                return res.json();
            })
            .then((data) => setEvent(data))
            .catch((err) => setError(err.message || "Failed to load event"))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!event?.createdBy) return;
        fetch(`${API_URL}/auth/user/${event.createdBy}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load organizer");
                return res.json();
            })
            .then((data) => setOrganizer(data))
            .catch(() => {});
    }, [event?.createdBy]);

    useEffect(() => {
        if (!user || !event?.createdBy || user.id === event.createdBy) return;
        fetch(`${API_URL}/follows/check/${event.createdBy}`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setFollowing(data.following))
            .catch(() => {});
    }, [user, event?.createdBy]);

    const handleFollow = async () => {
        if (!user || !event?.createdBy) return;
        try {
            const res = await fetch(`${API_URL}/follows/toggle`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: event.createdBy }),
            });
            const data = await res.json();
            if (res.ok) {
                setFollowing(data.following);
            }
        } catch {}
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-slate-900" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
                <p className="mt-2 text-gray-500">{error || "This event may have been removed."}</p>
                <Link href="/find-events" className="mt-4 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition">
                    Browse Events
                </Link>
            </div>
        );
    }

    const location = [event.venue, event.city].filter(Boolean).join(", ");
    const bannerUrl = event.banner || null;

    const toggleLike = () => {
        const next = !liked;
        setLiked(next);
        try {
            const stored = localStorage.getItem("evento_favorites");
            const favorites: string[] = stored ? JSON.parse(stored) : [];
            if (next) {
                if (!favorites.includes(id)) favorites.push(id);
            } else {
                const idx = favorites.indexOf(id);
                if (idx !== -1) favorites.splice(idx, 1);
            }
            localStorage.setItem("evento_favorites", JSON.stringify(favorites));
        } catch {}
    };

    const handleReserve = async () => {
        setReserving(true);
        try {
            if (!event.price || event.price <= 0) {
                const res = await fetch(`${API_URL}/payments/reserve-free`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ eventId: id, quantity: 1 }),
                });
                const data = await res.json();
                if (res.ok) {
                    window.location.href = `/payment/success?reserved=true&event_id=${id}`;
                } else {
                    alert(data.message || "Failed to reserve spot");
                }
            } else {
                const res = await fetch(`${API_URL}/payments/checkout`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ eventId: id, quantity: 1 }),
                });
                const data = await res.json();
                if (res.ok && data.url) {
                    window.location.href = data.url;
                } else {
                    alert(data.message || "Failed to start checkout");
                }
            }
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setReserving(false);
        }
    };
    const categoryLabel = event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : "";

    return (
        <div className="w-full font-sans text-gray-900 bg-white">

            {/* Hero Banner - Full Width */}
            {bannerUrl && (
                <div className="w-full h-72 sm:h-96 md:h-[480px] overflow-hidden relative">
                    <img
                        src={bannerUrl}
                        alt={event.title || "Event Banner"}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Floating category badge */}
                    {categoryLabel && (
                        <div className="absolute top-6 left-6">
                            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                <Tag size={12} />
                                {categoryLabel}
                            </span>
                        </div>
                    )}

                    {/* Floating action buttons */}
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                        <button
                            onClick={toggleLike}
                            className={`p-2.5 rounded-full backdrop-blur-sm shadow-lg transition-all ${liked ? "bg-red-500 text-white" : "bg-white/90 text-gray-700 hover:bg-white"}`}
                        >
                            <Heart size={18} fill={liked ? "currentColor" : "none"} />
                        </button>
                        <button className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:bg-white transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>

                    {/* Title overlay on mobile */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:hidden">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
                            {event.title}
                        </h1>
                    </div>
                </div>
            )}

            {/* Content Area - Full Width */}
            <div className="w-full">
                <div className="flex flex-col lg:flex-row items-start">

                    {/* Left Main Content */}
                    <div className="w-full lg:w-2/3 px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-12">

                        {/* Title (desktop only) */}
                        <div className="hidden lg:block">
                            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                {event.title}
                            </h1>
                            {event.shortDescription && (
                                <p className="mt-3 text-lg text-gray-500 font-medium">{event.shortDescription}</p>
                            )}
                        </div>

                        {/* Quick Info Bar */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 py-2 px-4 rounded-xl text-blue-700">
                                <CalendarDays size={16} className="text-blue-600" />
                                <span className="text-sm font-semibold">{event.date}</span>
                            </div>
                            {event.startTime && (
                                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 py-2 px-4 rounded-xl text-blue-700">
                                    <Clock size={16} className="text-blue-600" />
                                    <span className="text-sm font-semibold">
                                        {event.startTime}{event.endTime ? ` - ${event.endTime}` : ""}
                                    </span>
                                </div>
                            )}
                            {location && (
                                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 py-2 px-4 rounded-xl text-blue-700">
                                    <MapPin size={16} className="text-blue-600" />
                                    <span className="text-sm font-semibold">{location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 py-2 px-4 rounded-xl text-gray-700">
                                <Ticket size={16} className="text-gray-600" />
                                <span className="text-sm font-semibold">
                                    {event.price ? `৳${event.price.toLocaleString()}` : "Free"}
                                </span>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Overview */}
                        <section id="overview" className="space-y-6">
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">About this event</h2>
                            <div className="text-gray-700 space-y-4 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                                {event.description || event.shortDescription || "No description provided for this event. Check back later for more details."}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Good to know */}
                        <section id="good-to-know" className="space-y-6">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Good to know</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {event.startTime && event.endTime && (
                                    <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 shrink-0">
                                            <Clock size={22} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</span>
                                            <p className="font-semibold text-gray-900 mt-0.5">{event.startTime} - {event.endTime}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 shrink-0">
                                        <MapPin size={22} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Format</span>
                                        <p className="font-semibold text-gray-900 mt-0.5">{event.locationTab === "online" ? "Online Event" : "In person"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 shrink-0">
                                        <Tag size={22} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</span>
                                        <p className="font-semibold text-gray-900 mt-0.5">{categoryLabel || "General"}</p>
                                    </div>
                                </div>
                                {event.totalSeats > 0 && (
                                    <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 shrink-0">
                                            <Users size={22} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Capacity</span>
                                            <p className="font-semibold text-gray-900 mt-0.5">{event.availableSeats} of {event.totalSeats} spots left</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Location */}
                        {location && (
                            <>
                                <hr className="border-gray-100" />
                                <section id="location" className="space-y-6">
                                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Location</h2>
                                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                                        <div className="space-y-2 flex-1">
                                            <h3 className="font-bold text-xl text-gray-900">{event.venue || event.city}</h3>
                                            {event.address && (
                                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.address}</p>
                                            )}
                                            <a href="#directions" className="inline-flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700 hover:underline pt-2 transition-colors">
                                                Open in Google Maps <ExternalLink size={16} />
                                            </a>
                                        </div>
                                        <div className="w-full md:w-80 h-52 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden group shadow-inner">
                                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px]" />
                                            <button className="z-10 bg-white/90 backdrop-blur-sm border border-gray-300 font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-white hover:scale-105 transition-all duration-200 text-gray-800">
                                                Show map
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        <h4 className="font-semibold text-gray-900">How do you want to get there?</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {[
                                                { icon: Car, label: "Driving" },
                                                { icon: Bus, label: "Transit" },
                                                { icon: Bike, label: "Biking" },
                                                { icon: Footprints, label: "Walking" },
                                            ].map(({ icon: Icon, label }) => (
                                                <button key={label} className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all text-gray-700 font-medium">
                                                    <Icon size={18} /> <span className="text-sm">{label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        <hr className="border-gray-100" />

                        {/* FAQ Section */}
                        <section id="faq" className="space-y-6">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Frequently Asked questions</h2>
                            <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                                {faqData.map((item, index) => (
                                    <div key={index} className="bg-white">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                                            {openFaq === index ? (
                                                <ChevronUp size={20} className="text-gray-400 shrink-0" />
                                            ) : (
                                                <ChevronDown size={20} className="text-gray-400 shrink-0" />
                                            )}
                                        </button>
                                        {openFaq === index && (
                                            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Organizer Section */}
                        <section id="organizer" className="space-y-6">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Organized by</h2>
                            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-slate-900/20">
                                        {(organizer?.name || event.createdByName || "O")
                                            .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {organizer?.name || event.createdByName || "Organizer"}
                                        </h3>
                                        {organizer && (
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                Member since {new Date(organizer.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    {user && user.id !== event.createdBy && (
                                        <button
                                            onClick={handleFollow}
                                            className={`flex-1 sm:flex-none font-semibold px-6 py-2.5 rounded-xl transition inline-flex items-center justify-center gap-2 text-sm ${
                                                following
                                                    ? "bg-slate-900 text-white hover:bg-slate-800"
                                                    : "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
                                            }`}
                                        >
                                            <Users size={16} /> {following ? "Following" : "Follow"}
                                        </button>
                                    )}
                                    <button className="flex-1 sm:flex-none bg-slate-900 font-semibold text-white px-6 py-2.5 rounded-xl hover:bg-blue-900 transition inline-flex items-center justify-center gap-2 text-sm shadow-lg shadow-slate-900/20">
                                        <ExternalLink size={16} /> Contact
                                    </button>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Report & Share */}
                        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
                                    <Share2 size={16} /> Share this event
                                </button>
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">
                                    <Flag size={16} /> Report event
                                </button>
                            </div>
                            <p className="text-xs text-gray-400">
                                Created {new Date(event.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </p>
                        </section>
                    </div>

                    {/* Right Sticky Sidebar */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-8 z-10 p-4 sm:p-8 lg:py-12 lg:pl-0">
                        <div className="border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 space-y-6 bg-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-900 to-blue-900" />

                            {/* Event Image */}
                            {bannerUrl && (
                                <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-2 overflow-hidden rounded-t-3xl h-48 sm:h-56">
                                    <img
                                        src={bannerUrl}
                                        alt={event.title || "Event Image"}
                                        loading="eager"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            )}

                            {/* Price */}
                            <div className="space-y-1">
                                <h3 className="text-3xl font-extrabold text-gray-900">
                                    {event.price ? `৳${event.price.toLocaleString()}` : "Free"}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium">per person</p>
                            </div>

                            {/* Date & Time */}
                            <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                    <CalendarDays size={16} className="text-gray-500 shrink-0" />
                                    <span className="font-medium text-gray-800">{event.date}</span>
                                </div>
                                {event.startTime && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Clock size={16} className="text-gray-500 shrink-0" />
                                        <span className="font-medium text-gray-800">
                                            {event.startTime}{event.endTime ? ` - ${event.endTime}` : ""}
                                        </span>
                                    </div>
                                )}
                                {location && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin size={16} className="text-gray-500 shrink-0" />
                                        <span className="font-medium text-gray-800">{location}</span>
                                    </div>
                                )}
                            </div>

                            {/* Reserve Button */}
                            {user && user.id === event.createdBy ? (
                                <div className="w-full bg-gray-100 text-gray-500 font-semibold py-4 px-4 rounded-xl text-center text-lg">
                                    You are the organizer of this event
                                </div>
                            ) : (
                                <button
                                    onClick={handleReserve}
                                    disabled={reserving}
                                    className="w-full bg-slate-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center text-lg shadow-lg shadow-slate-900/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {reserving ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Redirecting to payment...
                                        </>
                                    ) : (
                                        "Reserve a spot"
                                    )}
                                </button>
                            )}

                            {/* Availability */}
                            {event.totalSeats > 0 && (
                                <div className="space-y-2">
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${event.availableSeats < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${(1 - (event.availableSeats / event.totalSeats)) * 100}%` }}
                                        />
                                    </div>
                                    <p className={`text-sm font-medium text-center flex justify-center items-center gap-1.5 ${event.availableSeats < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                                        {event.availableSeats < 10 && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                            </span>
                                        )}
                                        {event.availableSeats} of {event.totalSeats} spots left
                                    </p>
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="pt-2 border-t border-gray-100 space-y-3">
                                <button
                                    onClick={toggleLike}
                                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${liked ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}
                                >
                                    <Heart size={16} fill={liked ? "currentColor" : "none"} />
                                    {liked ? "Saved" : "Save to favorites"}
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all">
                                    <Share2 size={16} />
                                    Share event
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
