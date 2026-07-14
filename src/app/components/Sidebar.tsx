"use client";

import React from "react";
import {
    Briefcase,
    Utensils,
    HeartPulse,
    Music,
} from "lucide-react";

interface SidebarProps {
    className?: string;
}

const categories = [
    { name: "Business", icon: Briefcase, color: "text-blue-600 bg-blue-100" },
    { name: "Food & Drink", icon: Utensils, color: "text-orange-600 bg-orange-100" },
    { name: "Health", icon: HeartPulse, color: "text-rose-600 bg-rose-100" },
    { name: "Music", icon: Music, color: "text-violet-600 bg-violet-100" },
];

const dates = ["Today", "Tomorrow", "This weekend"];
const neighborhoods = ["Ramna Maidan", "Azimpur", "Gulshan", "Banani"];

export default function Sidebar({ className = "" }: SidebarProps) {
    const isDrawerMode = className.includes("!block");

    const content = (
        <div className="bg-gray-50 rounded-2xl p-5 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>

            {/* Category */}
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Category
                </h3>
                <ul className="space-y-2 text-sm font-medium">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <li
                                key={cat.name}
                                className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-white transition-colors"
                            >
                                <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${cat.color}`}>
                                    <Icon size={16} />
                                </span>
                                <span className="text-gray-700">{cat.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <hr className="border-gray-200" />

            {/* Date */}
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Date
                </h3>
                <div className="space-y-2.5 text-sm">
                    {dates.map((label) => (
                        <label
                            key={label}
                            className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-white transition-colors"
                        >
                            <input
                                type="radio"
                                name="date"
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Neighborhood */}
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Neighborhood
                </h3>
                <div className="space-y-2.5 text-sm">
                    {neighborhoods.map((area) => (
                        <label
                            key={area}
                            className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-white transition-colors"
                        >
                            <input
                                type="checkbox"
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{area}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    if (isDrawerMode) {
        return content;
    }

    return (
        <aside
            className={`hidden lg:block lg:col-span-2 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-2 ${className}`}
        >
            {content}
        </aside>
    );
}
