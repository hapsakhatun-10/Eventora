"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Calendar,
    Heart,
    Ticket,
    UserCircle2,
    ChevronRight,
    Loader2,
    Briefcase,
    Utensils,
    HeartPulse,
    Music,
    Palette,
    Laptop,
    Trophy,
    MoreHorizontal,
    Check,
} from "lucide-react";

import { authFetch } from "../utils/auth";

const categories = [
    { id: "business", label: "Business", icon: Briefcase },
    { id: "food", label: "Food & Drink", icon: Utensils },
    { id: "health", label: "Health", icon: HeartPulse },
    { id: "music", label: "Music", icon: Music },
    { id: "arts", label: "Arts", icon: Palette },
    { id: "tech", label: "Tech", icon: Laptop },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "other", label: "Other", icon: MoreHorizontal },
];

function getStoredInterests(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem("evento_interests");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveInterests(interests: string[]) {
    localStorage.setItem("evento_interests", JSON.stringify(interests));
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [ticketCount, setTicketCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [selected, setSelected] = useState<string[]>(getStoredInterests);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        authFetch("/auth/me")
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
        authFetch("/events/my")
            .then((res) => res.json())
            .then((data) => setTicketCount(data.events?.length || 0))
            .catch(() => { });
        authFetch("/favorites/ids")
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => setLikeCount(data.ids?.length || 0))
            .catch(() => setLikeCount(0));
    }, [user]);

    const toggleInterest = (id: string) => {
        setSaved(false);
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const handleSave = () => {
        saveInterests(selected);
        setSaved(true);
    };

    if (loadingAuth || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-slate-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Cover */}
            <div className="h-40 bg-gradient-to-r from-slate-100 via-white to-slate-100" />

            {/* Profile Header */}
            <div className="max-w-6xl mx-auto px-6 -mt-12">
                <div className="flex items-center gap-5">
                    <div className="h-24 w-24 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserCircle2 size={56} className="text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                        <div className="flex gap-5 mt-2 text-sm text-gray-500">
                            <span><strong className="text-slate-900">{ticketCount}</strong> Orders</span>
                            <span><strong className="text-slate-900">{likeCount}</strong> Likes</span>
                            <span><strong className="text-slate-900">0</strong> Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-xl font-bold text-center text-slate-900 mb-6">Orders</h2>
                <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Ticket size={32} className="text-indigo-500" />
                    </div>
                    <p className="mt-4 font-semibold text-slate-900">No upcoming orders</p>
                    <Link href="/tickets" className="mt-2 text-blue-600 hover:underline text-sm font-medium">
                        See past orders
                    </Link>
                </div>
            </div>

            {/* Interests */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Heart size={18} className="text-pink-500" />
                        <h2 className="text-lg font-bold text-slate-900">Interests</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-blue-900 transition-all active:scale-[0.98]"
                        >
                            Save
                        </button>
                        {saved && (
                            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                                <Check size={14} /> Saved
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">Select categories to personalize your experience</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {categories.map((cat) => {
                        const active = selected.includes(cat.id);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => toggleInterest(cat.id)}
                                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${active
                                        ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                            >
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? "bg-slate-900 text-white" : "bg-gray-100 text-slate-900"
                                    }`}>
                                    <cat.icon size={16} />
                                </div>
                                <span className={`text-sm font-semibold ${active ? "text-slate-900" : "text-gray-700"}`}>
                                    {cat.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="max-w-6xl mx-auto px-6 py-5">
                <Link href="/find-events" className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-indigo-500" />
                        <span className="font-semibold text-slate-900">Upcoming Events</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition" />
                </Link>
            </div>

            {/* Support */}
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="rounded-xl bg-slate-50 p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-slate-900">Tickets missing?</h3>
                        <p className="text-gray-500 text-sm mt-0.5">Verify your email to access transfers and gifts.</p>
                    </div>
                    <Link href="/help" className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition shrink-0">
                        Get Help
                    </Link>
                </div>
            </div>
        </div>
    );
}