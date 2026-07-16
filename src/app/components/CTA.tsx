import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-8 sm:px-16 py-14 sm:py-20 text-center">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-white/10">
                        <Sparkles size={14} />
                        Start for Free
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                        Ready to Host<br />Your Next Event?
                    </h2>

                    <p className="text-base sm:text-lg text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
                        Create your first event in minutes. No setup fees, no hidden costs.
                        Just you, your audience, and an unforgettable experience.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Get Started Free
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/find-events"
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all duration-200"
                        >
                            Explore Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
