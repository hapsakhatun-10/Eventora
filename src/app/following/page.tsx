"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Loader2, Search } from "lucide-react";
import UserMenu from "../components/UserMenu";
import { authFetch } from "../utils/auth";

interface FollowingUser {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

interface FollowingEntry {
    followId: string;
    createdAt: string;
    user: FollowingUser | null;
}

export default function FollowingPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; name: string } | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [following, setFollowing] = useState<FollowingEntry[]>([]);
    const [followingLoading, setFollowingLoading] = useState(true);
    const [unfollowing, setUnfollowing] = useState<string | null>(null);

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
        authFetch("/follows/list")
            .then((res) => res.json())
            .then((data) => setFollowing(data.following || []))
            .catch(() => setFollowing([]))
            .finally(() => setFollowingLoading(false));
    }, [user]);

    const handleUnfollow = async (userId: string) => {
        setUnfollowing(userId);
        try {
            const res = await authFetch("/follows/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            const data = await res.json();
            if (res.ok && !data.following) {
                setFollowing((prev) => prev.filter((f) => f.user?._id !== userId));
            }
        } catch {} finally {
            setUnfollowing(null);
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
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Following</h1>
                        <p className="text-sm text-gray-500 mt-1">Organizers you follow</p>
                    </div>

                    {followingLoading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-gray-400" />
                        </div>
                    ) : following.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-white text-center py-16">
                            <UserPlus size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium text-lg">Not following anyone yet</p>
                            <p className="text-gray-400 text-sm mt-1">Discover event organizers and follow them to stay updated</p>
                            <Link
                                href="/find-events"
                                className="inline-flex items-center gap-2 mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all"
                            >
                                <Search size={16} />
                                Browse Events
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                            {following.map((entry) => {
                                const u = entry.user;
                                if (!u) return null;
                                const initials = u.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2);
                                return (
                                    <div
                                        key={entry.followId}
                                        className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-slate-900/20 mb-3">
                                            {initials}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-sm truncate w-full">{u.name}</h3>
                                        <button
                                            onClick={() => handleUnfollow(u._id)}
                                            disabled={unfollowing === u._id}
                                            className="mt-3 w-full border border-gray-300 font-semibold text-gray-700 bg-white px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-xs disabled:opacity-50"
                                        >
                                            {unfollowing === u._id ? (
                                                <Loader2 size={12} className="animate-spin mx-auto" />
                                            ) : (
                                                "Unfollow"
                                            )}
                                        </button>
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
