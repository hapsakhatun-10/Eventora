"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Event Organizer",
        text: "Eventora made it incredibly easy to manage my music festivals. Ticket sales went up 40% after I started using the platform. The QR check-in is a game changer.",
    },
    {
        name: "Rafiq Hassan",
        role: "Attendee",
        text: "I discovered so many amazing events in Dhaka that I never knew about. The search and filter features make finding exactly what I want effortless.",
    },
    {
        name: "Nadia Karim",
        role: "Workshop Host",
        text: "As a cooking workshop organizer, I love how simple it is to create events and track bookings. The analytics dashboard gives me great insights into my audience.",
    },
    {
        name: "Tanvir Islam",
        role: "Frequent Attendee",
        text: "The favorites feature and personalized recommendations keep me coming back. I've attended over 30 events through Eventora this year alone.",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-400">What People Say</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                    Loved by Thousands
                </h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
                    <Quote size={32} className="text-slate-200 mb-4" />
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-8">
                        &ldquo;{testimonials[current].text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900">{testimonials[current].name}</p>
                            <p className="text-sm text-slate-500">{testimonials[current].role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prev}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={next}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-slate-900 w-6" : "bg-slate-300"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
