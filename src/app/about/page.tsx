import { Target, Users, Heart, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "To connect people with unforgettable experiences by making event discovery and management simple, accessible, and enjoyable for everyone.",
    },
    {
        icon: Users,
        title: "Community First",
        description: "We believe in the power of live events to bring people together. Every feature we build is designed to strengthen communities.",
    },
    {
        icon: Heart,
        title: "Passion Driven",
        description: "We're passionate about events and the memories they create. Our team works tirelessly to ensure every interaction on Eventora is seamless.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "From local meetups to international conferences, Eventora supports events of all sizes across the globe.",
    },
];

const team = [
    { name: "Anika Rahman", role: "CEO & Co-Founder", initials: "AR" },
    { name: "Samiul Haq", role: "CTO & Co-Founder", initials: "SH" },
    { name: "Fatima Khan", role: "Head of Design", initials: "FK" },
    { name: "Rakib Hasan", role: "Lead Engineer", initials: "RH" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-20 sm:py-28 text-center">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="text-xs font-bold tracking-widest uppercase text-white/60">About Eventora</span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-3 mb-4">
                        We Make Events Happen
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
                        Eventora is the all-in-one platform for discovering, creating, and managing events.
                        We started with a simple idea: make it easy for anyone to bring people together.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Our Story</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
                            Born from a Frustration
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                            In 2024, we realized that finding and organizing events was unnecessarily complicated.
                            Tickets were scattered across platforms, event pages lacked essential information,
                            and organizers had no simple tool to manage everything in one place.
                        </p>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            So we built Eventora — a platform where discovering events is as enjoyable as attending them,
                            and creating one takes minutes, not hours.
                        </p>
                    </div>
                    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900 p-8 sm:p-10 text-white">
                        <p className="text-3xl sm:text-4xl font-black mb-2">2024</p>
                        <p className="text-sm text-slate-300 mb-6">Year Founded</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-2xl font-bold">50+</p>
                                <p className="text-xs text-slate-400">Team Members</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-xs text-slate-400">Countries</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">10K+</p>
                                <p className="text-xs text-slate-400">Events Hosted</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">98%</p>
                                <p className="text-xs text-slate-400">Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-slate-50 px-4 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">What We Stand For</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                            Our Values
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {values.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-4">
                                    <item.icon size={22} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-400">The People Behind Eventora</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                        Meet Our Team
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map((member) => (
                        <div key={member.name} className="text-center group">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center text-white text-lg font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                                {member.initials}
                            </div>
                            <p className="text-sm font-bold text-slate-900">{member.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-4 pb-16 sm:pb-20">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                        Ready to Get Started?
                    </h2>
                    <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                        Join thousands of organizers and attendees who trust Eventora for their events.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all duration-200 hover:shadow-lg"
                        >
                            Create Account <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="/find-events"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200"
                        >
                            Browse Events
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
