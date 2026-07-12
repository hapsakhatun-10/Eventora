"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
    eventId: string;
}

export default function FavoriteButton({ eventId }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite((prev) => !prev);
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500 "
                }`}
            title={isFavorite ? "Unlike" : "Like"}
        >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
    );
}
