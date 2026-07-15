"use client";

import React from "react";
import {
    Briefcase,
    Utensils,
    HeartPulse,
    Music,
    Palette,
    Laptop,
    Trophy,
    MoreHorizontal,
} from "lucide-react";

interface SidebarProps {
    className?: string;
    selectedCategories?: string[];
    onCategoryChange?: (categories: string[]) => void;
}

const categories = [
    { id: "business", name: "Business", icon: Briefcase, color: "text-slate-700 bg-slate-100" },
    { id: "food", name: "Food & Drink", icon: Utensils, color: "text-slate-700 bg-slate-100" },
    { id: "health", name: "Health", icon: HeartPulse, color: "text-slate-700 bg-slate-100" },
    { id: "music", name: "Music", icon: Music, color: "text-slate-700 bg-slate-100" },
    { id: "arts", name: "Arts", icon: Palette, color: "text-slate-700 bg-slate-100" },
    { id: "tech", name: "Tech", icon: Laptop, color: "text-slate-700 bg-slate-100" },
    { id: "sports", name: "Sports", icon: Trophy, color: "text-slate-700 bg-slate-100" },
    { id: "other", name: "Other", icon: MoreHorizontal, color: "text-slate-700 bg-slate-100" },
];

export default function Sidebar({ className = "", selectedCategories = [], onCategoryChange }: SidebarProps) {
    const isDrawerMode = className.includes("!block");

    const toggleCategory = (id: string) => {
        if (!onCategoryChange) return;
        if (selectedCategories.includes(id)) {
            onCategoryChange(selectedCategories.filter((c) => c !== id));
        } else {
            onCategoryChange([...selectedCategories, id]);
        }
    };

    const content = (
        <div className="bg-slate-50 rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                {selectedCategories.length > 0 && (
                    <button
                        onClick={() => onCategoryChange?.([])}
                        className="text-xs font-semibold text-slate-900 hover:underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Category */}
            <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Category
                </h3>
                <ul className="space-y-1 text-sm font-medium">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategories.includes(cat.id);
                        return (
                            <li
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${isActive ? "bg-slate-100 border border-slate-200" : "hover:bg-gray-500 border border-transparent"}`}
                            >
                                <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${cat.color}`}>
                                    <Icon size={16} />
                                </span>
                                <span className={isActive ? "text-slate-900 font-semibold" : "text-slate-700"}>
                                    {cat.name}
                                </span>
                                {isActive && (
                                    <span className="ml-auto w-2 h-2 rounded-full bg-slate-900" />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );

    if (isDrawerMode) {
        return content;
    }

    return (
        <aside
            className={`hidden lg:block sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-2 ${className}`}
        >
            {content}
        </aside>
    );
}
