"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Ticket,
    CreditCard,
    Calendar,
    User,
    Shield,
    ChevronDown,
    Mail,
    MessageCircle,
    ExternalLink,
} from "lucide-react";

const faqData = [
    {
        category: "Getting Started",
        items: [
            {
                q: "How do I create an account?",
                a: "Click the 'Sign In' button in the top right corner, then select 'Create Account'. You can register using your email address or connect through Google.",
            },
            {
                q: "How do I find events near me?",
                a: "Visit the Find Events page to browse all upcoming events. You can filter by category, date, and location. Allow location access to see events near you on the map.",
            },
            {
                q: "Is Eventora free to use?",
                a: "Yes! Browsing events and creating a free account is completely free. Event organizers set their own ticket prices, and Eventora charges a small service fee on paid tickets.",
            },
        ],
    },
    {
        category: "Tickets & Payments",
        items: [
            {
                q: "How do I purchase a ticket?",
                a: "Find an event you'd like to attend, select your ticket type, and click 'Get Tickets'. You'll be guided through the secure checkout process.",
            },
            {
                q: "Can I get a refund?",
                a: "Refund policies are set by event organizers. Check the event details page for the organizer's refund policy. If you need help, contact our support team.",
            },
            {
                q: "What payment methods are accepted?",
                a: "We accept all major credit/debit cards, bKash, Nagad, and other local payment methods depending on your region.",
            },
            {
                q: "Where can I see my tickets?",
                a: "All your purchased tickets are available in the Tickets section of your dashboard. You can view, download, or present your QR code directly from your phone.",
            },
        ],
    },
    {
        category: "For Organizers",
        items: [
            {
                q: "How do I create an event?",
                a: "Click 'Create Event' in the navigation bar. Fill in your event details including title, date, venue, pricing, and description. You can preview before publishing.",
            },
            {
                q: "How do I manage my events?",
                a: "Go to your Dashboard and click 'Manage Events' to view, edit, or delete your events. You can also track ticket sales and attendee numbers.",
            },
            {
                q: "How do I receive payments?",
                a: "Payments are processed securely and transferred to your linked bank account or mobile wallet. Check your organizer dashboard for payment schedules and reports.",
            },
        ],
    },
    {
        category: "Account & Security",
        items: [
            {
                q: "How do I reset my password?",
                a: "Click 'Forgot Password' on the login page and enter your email. You'll receive a link to create a new password within minutes.",
            },
            {
                q: "How do I update my profile?",
                a: "Navigate to your Dashboard and click on your profile settings to update your name, email, profile picture, and notification preferences.",
            },
            {
                q: "Is my personal information safe?",
                a: "Yes. We use industry-standard encryption and never share your personal data with third parties without your consent. Read our Privacy Policy for full details.",
            },
        ],
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
                <span className="text-sm font-semibold text-gray-900">{q}</span>
                <ChevronDown
                    size={16}
                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <p className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
            )}
        </div>
    );
}

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const topics = [
        { icon: Ticket, label: "Tickets", description: "Purchase, access, and manage your event tickets", href: "/tickets" },
        { icon: CreditCard, label: "Payments & Refunds", description: "Payment methods, billing, and refund policies", href: "#faq" },
        { icon: Calendar, label: "Finding Events", description: "Browse, search, and discover events near you", href: "/find-events" },
        { icon: User, label: "Your Account", description: "Profile settings, password, and preferences", href: "/dashboard" },
        { icon: Shield, label: "Safety & Privacy", description: "How we protect your data and ensure safety", href: "#faq" },
    ];

    const filteredFaq = faqData
        .map((cat) => ({
            ...cat,
            items: cat.items.filter(
                (item) =>
                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((cat) => cat.items.length > 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-4 sm:px-6 py-8 sm:py-12">
                {/* Hero */}
                <div className="max-w-2xl mx-auto text-center mb-10">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Get Help</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Find answers to common questions or reach out to our support team.
                    </p>

                    {/* Search */}
                    <div className="relative mt-6 max-w-lg mx-auto">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                        />
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                    {topics.map((topic) => (
                        <Link
                            key={topic.label}
                            href={topic.href}
                            className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                        >
                            <topic.icon size={20} className="text-slate-900 mb-3" />
                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-slate-900">{topic.label}</h3>
                            <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
                        </Link>
                    ))}
                </div>

                {/* FAQ */}
                <div id="faq" className="max-w-3xl mx-auto mb-12">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    {filteredFaq.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-white text-center py-12">
                            <p className="text-gray-500 font-medium">No results found for &ldquo;{searchQuery}&rdquo;</p>
                            <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaq.map((cat) => (
                                <div key={cat.category} className="rounded-2xl border border-gray-200 bg-white px-5">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-4 pb-1">
                                        {cat.category}
                                    </h3>
                                    {cat.items.map((item) => (
                                        <FaqItem key={item.q} q={item.q} a={item.a} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contact Support */}
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 text-center">
                        <h2 className="text-lg font-extrabold text-gray-900 mb-2">Still need help?</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Our support team is ready to assist you with any questions.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <a
                                href="mailto:support@evento.com"
                                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900 transition-all"
                            >
                                <Mail size={16} />
                                Email Support
                            </a>
                            <a
                                href="mailto:support@evento.com"
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-slate-50 transition-all"
                            >
                                <MessageCircle size={16} />
                                Live Chat
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}