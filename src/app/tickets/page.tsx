"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Ticket,
    Calendar,
    MapPin,
    Loader2,
    Search,
    CreditCard,
} from "lucide-react";
import UserMenu from "../components/UserMenu";
import { authFetch } from "../utils/auth";

interface EventData {
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
}

interface TicketItem {
    _id: string;
    eventId: string;
    sessionId: string;
    ticketCode: string;
    quantity: number;
    totalPaid: number;
    status: string;
    createdAt: string;
    event: EventData | null;
}

function isUpcoming(dateStr: string): boolean {
    if (!dateStr) return true;
    try {
        return new Date(dateStr) >= new Date();
    } catch {
        return true;
    }
}

export default function TicketsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [user, setUser] = useState<{ id: string; name: string } | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [tickets, setTickets] = useState<TicketItem[]>([]);
    const [ticketsLoading, setTicketsLoading] = useState(true);
    const confirmedSessionRef = useRef(false);

    const fetchTickets = useCallback(() => {
        authFetch("/payments/my-tickets")
            .then((res) => res.json())
            .then((data) => setTickets(data.tickets || []))
            .catch(() => setTickets([]))
            .finally(() => setTicketsLoading(false));
    }, []);

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
        const sessionId = searchParams.get("session_id");
        if (!sessionId || confirmedSessionRef.current) return;
        confirmedSessionRef.current = true;

        window.history.replaceState({}, "", "/tickets");

        authFetch("/payments/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
        }).then(() => {
            setTicketsLoading(true);
            fetchTickets();
        }).catch(() => {});
    }, [searchParams, fetchTickets]);

    useEffect(() => {
        if (!user) return;
        fetchTickets();
    }, [user, fetchTickets]);

    if (loadingAuth || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-slate-900" />
            </div>
        );
    }

    const pending = tickets.filter((t) => t.status === "pending");
    const confirmed = tickets.filter((t) => t.status === "confirmed");
    const upcomingConfirmed = confirmed.filter((t) => isUpcoming(t.event?.date || ""));
    const past = confirmed.filter((t) => !isUpcoming(t.event?.date || ""));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-4 sm:px-6 py-8 sm:py-12 flex gap-6">
                <UserMenu />
                <div className="flex-1 min-w-0">
                    {/* Header with profile */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 text-white text-lg font-bold shadow-lg shrink-0">
                            {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Tickets</h1>
                            <p className="text-sm text-gray-500 mt-0.5">{user.name}</p>
                        </div>
                    </div>

                    {ticketsLoading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-gray-400" />
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-white text-center py-16">
                            <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium text-lg">No tickets yet</p>
                            <p className="text-gray-400 text-sm mt-1">When you book an event, your tickets will appear here</p>
                            <Link
                                href="/find-events"
                                className="inline-flex items-center gap-2 mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all"
                            >
                                <Search size={16} />
                                Browse Events
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {pending.length > 0 && (
                                <section>
                                    <h2 className="text-lg font-bold text-amber-600 mb-4">Pending Payment</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {pending.map((ticket) => (
                                            <TicketCard key={ticket._id} ticket={ticket} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {upcomingConfirmed.length > 0 && (
                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {upcomingConfirmed.map((ticket) => (
                                            <TicketCard key={ticket._id} ticket={ticket} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {past.length > 0 && (
                                <section>
                                    <h2 className="text-lg font-bold text-gray-400 mb-4">Past Events</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-60">
                                        {past.map((ticket) => (
                                            <TicketCard key={ticket._id} ticket={ticket} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TicketCard({ ticket }: { ticket: TicketItem }) {
    const [paying, setPaying] = useState(false);
    const event = ticket.event;
    const title = event?.title || "Event";
    const date = event?.date || "";
    const time = event?.startTime || "";
    const venue = event?.venue || "";
    const city = event?.city || "";
    const banner = event?.banner || "";
    const category = event?.category || "";
    const location = [venue, city].filter(Boolean).join(", ");
    const isPending = ticket.status === "pending";

    const handlePayNow = async () => {
        setPaying(true);
        try {
            const res = await authFetch("/payments/pay-pending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketId: ticket._id }),
            });
            const data = await res.json();
            if (res.ok && data.url) {
                window.location.href = data.url;
            } else {
                alert(data.message || "Failed to start payment");
            }
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setPaying(false);
        }
    };

    return (
        <div className={`rounded-2xl border bg-white overflow-hidden hover:shadow-lg transition-shadow group ${isPending ? "border-amber-200" : "border-gray-200"}`}>
            <Link href={`/event/${ticket.eventId}`} className="block relative h-40 overflow-hidden">
                {banner ? (
                    <Image
                        src={banner}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, 384px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center text-white font-bold text-sm">
                        {category || "Event"}
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    {isPending ? (
                        <span className="inline-block rounded-lg bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wide">
                            Pending Payment
                        </span>
                    ) : (
                        <span className="inline-block rounded-lg bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wide">
                            Confirmed
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-4 space-y-3">
                <Link href={`/event/${ticket.eventId}`}>
                    <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-slate-900 transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{date}{time ? ` · ${time}` : ""}</span>
                </div>

                {location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {isPending ? (
                        <span className="text-xs text-amber-600 font-medium">Awaiting payment</span>
                    ) : (
                        <span className="font-mono text-xs tracking-wider text-gray-600">
                            {ticket.ticketCode}
                        </span>
                    )}
                    <p className="text-sm font-bold text-slate-900">
                        {ticket.event?.price ? `$${ticket.event.price.toLocaleString()}` : "Free"}
                    </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"}</span>
                    <span>·</span>
                    <span>#{String(ticket._id).slice(-6).toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
                    <span>Event ID:</span>
                    <span className="text-gray-500">{ticket.eventId}</span>
                </div>

                {isPending && (
                    <button
                        onClick={handlePayNow}
                        disabled={paying}
                        className="w-full mt-2 bg-amber-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center text-sm shadow-lg shadow-amber-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {paying ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Redirecting to payment...
                            </>
                        ) : (
                            <>
                                <CreditCard size={16} />
                                Pay Now
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
