"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Users, Ticket, Building } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Stats {
    events: number;
    users: number;
    tickets: number;
    organizers: number;
}

function AnimatedNumber({ target }: { target: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (target === 0) return;
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target]);

    return <span>{count.toLocaleString()}+</span>;
}

export default function Statistics() {
    const [stats, setStats] = useState<Stats>({ events: 0, users: 0, tickets: 0, organizers: 0 });

    useEffect(() => {
        fetch(`${API_URL}/events?limit=1`)
            .then((res) => res.json())
            .then((data) => setStats((prev) => ({ ...prev, events: data.total || 0 })))
            .catch(() => {});
    }, []);

    const items = [
        { icon: CalendarDays, label: "Events Created", value: stats.events },
        { icon: Users, label: "Active Users", value: stats.users || 1200 },
        { icon: Ticket, label: "Tickets Sold", value: stats.tickets || 8500 },
        { icon: Building, label: "Organizers", value: stats.organizers || 340 },
    ];

    return (
        <section className="w-full bg-slate-900">
            <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Our Impact</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2">
                        Eventora by the Numbers
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.label} className="text-center px-4 py-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white mb-4">
                                <item.icon size={22} />
                            </div>
                            <p className="text-2xl sm:text-3xl font-black text-white">
                                <AnimatedNumber target={item.value} />
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
