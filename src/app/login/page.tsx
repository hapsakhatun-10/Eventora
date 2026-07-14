"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ticket, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../components/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        const err = await login(email.trim(), password);
        setLoading(false);

        if (err) {
            setError(err);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-md">
                            <Ticket className="h-5 w-5" />
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            <span className="text-slate-900">Even</span>
                            <span className="text-orange-600">to</span>
                        </h1>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your Eventora account</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-11 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
