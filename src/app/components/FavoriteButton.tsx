"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
    eventId: string;
}

function getInitialFavorite(eventId: string): boolean {
    if (typeof window === "undefined") return false;
    try {
        const stored = localStorage.getItem("evento_favorites");
        if (stored) return JSON.parse(stored).includes(eventId);
    } catch {}
    return false;
}

export default function FavoriteButton({ eventId }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(() => getInitialFavorite(eventId));

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        const next = !isFavorite;
        setIsFavorite(next);

        try {
            const stored = localStorage.getItem("evento_favorites");
            const favorites: string[] = stored ? JSON.parse(stored) : [];
            if (next) {
                if (!favorites.includes(eventId)) favorites.push(eventId);
            } else {
                const idx = favorites.indexOf(eventId);
                if (idx !== -1) favorites.splice(idx, 1);
            }
            localStorage.setItem("evento_favorites", JSON.stringify(favorites));
        } catch {}
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
            title={isFavorite ? "Unlike" : "Like"}
        >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
    );
}
