"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, ArrowLeft, AlertCircle, Ticket } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [eventId, setEventId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const confirmedRef = useRef(false);

    useEffect(() => {
        if (!sessionId || confirmedRef.current) return;
        confirmedRef.current = true;

        fetch(`${API_URL}/payments/session/${sessionId}`)
            .then((res) => res.json())
            .then(async (data) => {
                if (data.payment_status !== "paid" || !data.metadata?.eventId) {
                    setStatus("error");
                    setErrorMsg(data.payment_status !== "paid" ? "Payment was not completed." : "Session metadata missing.");
                    return;
                }

                setEventId(data.metadata.eventId);

                const confirmRes = await fetch(`${API_URL}/payments/confirm`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId }),
                });
                const confirmData = await confirmRes.json();

                if (confirmRes.ok) {
                    setStatus("success");
                } else {
                    setStatus("error");
                    setErrorMsg(confirmData.message || "Failed to confirm ticket.");
                }
            })
            .catch(() => {
                setStatus("error");
                setErrorMsg("Something went wrong. Please contact support.");
            });
    }, [sessionId]);

    if (!sessionId) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-slate-900">Payment could not be verified</h2>
                <p className="mt-2 text-slate-500">If you believe this is an error, please contact support.</p>
                <Link href="/find-events" className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition">
                    Browse Events
                </Link>
            </div>
        );
    }

    if (status === "loading") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 size={32} className="animate-spin text-slate-400" />
                <p className="text-slate-500 text-sm">Confirming your reservation...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={40} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Something went wrong</h2>
                <p className="mt-2 text-slate-500 max-w-md">{errorMsg || "Payment could not be verified. Please contact support."}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link href="/tickets" className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition inline-flex items-center gap-2">
                        <Ticket size={16} /> View My Tickets
                    </Link>
                    <Link href="/find-events" className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-2">
                        <ArrowLeft size={16} /> Browse More Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Reservation Confirmed!</h1>
            <p className="mt-3 text-slate-500 text-lg max-w-md">
                Your spot has been reserved successfully. You can view your ticket anytime.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                    href="/tickets"
                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition inline-flex items-center gap-2"
                >
                    <Ticket size={16} /> My Tickets
                </Link>
                {eventId && (
                    <Link
                        href={`/event/${eventId}`}
                        className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-2"
                    >
                        View Event
                    </Link>
                )}
                <Link
                    href="/find-events"
                    className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-2"
                >
                    <ArrowLeft size={16} /> Browse More Events
                </Link>
            </div>
        </div>
    );
}
