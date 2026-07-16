"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        q: "How do I create an event on Eventora?",
        a: "Sign up for a free account, click 'Create Event', fill in the details (title, date, venue, pricing), upload a banner, and publish. Your event goes live immediately.",
    },
    {
        q: "Is Eventora free to use?",
        a: "Yes! Browsing and attending events is completely free. Event organizers pay a small fee only when tickets are sold through the platform.",
    },
    {
        q: "How does the QR code check-in work?",
        a: "When you book a ticket, you receive a unique QR code. Simply show it at the venue entrance and the organizer scans it for instant check-in.",
    },
    {
        q: "Can I get a refund on my ticket?",
        a: "Refund policies depend on the event organizer. Most events offer refunds up to 48 hours before the event. Check the specific event page for details.",
    },
    {
        q: "How do I contact an event organizer?",
        a: "Each event page has the organizer's profile. You can follow them and reach out through their listed contact information or support email.",
    },
    {
        q: "Can I host virtual events on Eventora?",
        a: "Yes! Eventora supports both in-person and virtual events. You can add a virtual event link when creating your event, and attendees will receive it upon booking.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="w-full max-w-3xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Got Questions?</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-slate-300"
                    >
                        <button
                            onClick={() => setOpen(open === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-5 text-left"
                        >
                            <span className="text-sm sm:text-base font-semibold text-slate-900 pr-4">{faq.q}</span>
                            {open === i ? (
                                <ChevronUp size={18} className="shrink-0 text-slate-400" />
                            ) : (
                                <ChevronDown size={18} className="shrink-0 text-slate-400" />
                            )}
                        </button>
                        {open === i && (
                            <div className="px-6 pb-5">
                                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
