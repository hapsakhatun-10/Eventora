"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [eventName, setEventName] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/payments/session/${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.payment_status === "paid") {
                    setStatus("success");
                    setEventName(data.metadata?.eventId || "");
                } else {
                    setStatus("error");
                }
            })
            .catch(() => setStatus("error"));
    }, [sessionId]);

    if (!sessionId) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900">Payment could not be verified</h2>
                <p className="mt-2 text-gray-500">If you believe this is an error, please contact support.</p>
                <Link href="/find-events" className="mt-6 rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition">
                    Browse Events
                </Link>
            </div>
        );
    }

    if (status === "loading") {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-green-500" />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900">Payment could not be verified</h2>
                <p className="mt-2 text-gray-500">If you believe this is an error, please contact support.</p>
                <Link href="/find-events" className="mt-6 rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition">
                    Browse Events
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Payment Successful!</h1>
            <p className="mt-3 text-gray-500 text-lg max-w-md">
                Your reservation is confirmed. You&apos;ll receive a confirmation email shortly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {eventName && (
                    <Link
                        href={`/event/${eventName}`}
                        className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition inline-flex items-center gap-2"
                    >
                        View Event
                    </Link>
                )}
                <Link
                    href="/find-events"
                    className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition inline-flex items-center gap-2"
                >
                    <ArrowLeft size={16} /> Browse More Events
                </Link>
            </div>
        </div>
    );
}
