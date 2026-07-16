"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-16 sm:py-20 text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-white/60">Get in Touch</span>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3 mb-3">
                    Contact Us
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
                    Have a question, suggestion, or need help? We&apos;d love to hear from you.
                </p>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
                <div className="grid md:grid-cols-5 gap-10">
                    {/* Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h2>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Reach out to us through any of the channels below, or fill out the form and we&apos;ll get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Email</p>
                                    <p className="text-sm text-slate-500">support@eventora.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Phone</p>
                                    <p className="text-sm text-slate-500">+880 1234 567890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Office</p>
                                    <p className="text-sm text-slate-500">Gulshan-2, Dhaka 1212, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Office Hours</p>
                            <p className="text-sm text-slate-700">Sunday – Thursday: 9:00 AM – 6:00 PM</p>
                            <p className="text-sm text-slate-700">Friday – Saturday: Closed</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                            {sent ? (
                                <div className="text-center py-12">
                                    <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-sm text-slate-500">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}
                                        className="mt-6 text-sm font-semibold text-slate-900 hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                required
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                required
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                                        <input
                                            type="text"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            placeholder="What's this about?"
                                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tell us more..."
                                            required
                                            rows={5}
                                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
