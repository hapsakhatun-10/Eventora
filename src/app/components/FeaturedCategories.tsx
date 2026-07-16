import Link from "next/link";
import { Music, Sparkles, Theater, Calendar, Heart, Gamepad2, Presentation, Utensils, ArrowRight } from "lucide-react";

const categories = [
    { name: "Music", icon: Music, slug: "music", color: "from-violet-500 to-purple-600" },
    { name: "Nightlife", icon: Sparkles, slug: "nightlife", color: "from-pink-500 to-rose-600" },
    { name: "Arts", icon: Theater, slug: "arts", color: "from-amber-500 to-orange-600" },
    { name: "Holidays", icon: Calendar, slug: "holidays", color: "from-emerald-500 to-green-600" },
    { name: "Dating", icon: Heart, slug: "dating", color: "from-red-500 to-pink-600" },
    { name: "Hobbies", icon: Gamepad2, slug: "hobbies", color: "from-cyan-500 to-blue-600" },
    { name: "Business", icon: Presentation, slug: "business", color: "from-slate-600 to-slate-800" },
    { name: "Food & Drink", icon: Utensils, slug: "food", color: "from-orange-500 to-red-600" },
];

export default function FeaturedCategories() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Browse by Interest</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                        Explore Categories
                    </h2>
                </div>
                <Link
                    href="/find-events"
                    className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-900 transition-colors"
                >
                    View all <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.slug}
                        href={`/find-events?categories=${cat.slug}`}
                        className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                    >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <cat.icon size={22} />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
