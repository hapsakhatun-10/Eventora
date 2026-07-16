import Link from "next/link";
import { Search, MapPin, Ticket } from "lucide-react";

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Discover Events",
        description: "Browse thousands of events near you. Filter by category, date, or location to find exactly what you're looking for.",
    },
    {
        icon: Ticket,
        step: "02",
        title: "Book Your Spot",
        description: "Reserve your tickets instantly with secure checkout. Get your digital ticket with QR code right away.",
    },
    {
        icon: MapPin,
        step: "03",
        title: "Show Up & Enjoy",
        description: "Head to the venue, scan your QR code at check-in, and enjoy the event. It's that simple.",
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center mb-12">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Simple Process</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                    How Eventora Works
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-lg mx-auto">
                    From discovering events to checking in — three easy steps to your next experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((item) => (
                    <div key={item.step} className="relative group text-center px-6 py-8 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                        <span className="absolute top-4 right-5 text-5xl font-black text-slate-100 select-none">{item.step}</span>
                        <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                            <item.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/find-events"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900 transition-all duration-200 hover:shadow-lg"
                >
                    Find Events Now
                </Link>
            </div>
        </section>
    );
}
