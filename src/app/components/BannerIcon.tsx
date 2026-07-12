import React from "react";

import {
    Music,
    Sparkles,
    Theater,
    Calendar,
    Heart,
    Gamepad2,
    Presentation,
    Pizza,
} from "lucide-react";

export default function BannerIcon() {
    const categories = [
        { name: "Music", icon: Music },
        { name: "Nightlife", icon: Sparkles },
        { name: "Performing & Visual Arts", icon: Theater },
        { name: "Holidays", icon: Calendar },
        { name: "Dating", icon: Heart },
        { name: "Hobbies", icon: Gamepad2 },
        { name: "Business", icon: Presentation },
        { name: "Food & Drink", icon: Pizza },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12">
            {/* Banner */}


            {/* Categories */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-y-8 gap-x-4 justify-items-center">
                {categories.map((cat, index) => {
                    const Icon = cat.icon;

                    return (
                        <div
                            key={index}
                            className="group flex flex-col items-center gap-3 cursor-pointer"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-50">
                                <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-700 transition-colors duration-300 group-hover:text-orange-500" />
                            </div>

                            <span className="text-xs font-semibold text-center text-gray-900 transition-colors duration-300 group-hover:text-orange-500">
                                {cat.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}