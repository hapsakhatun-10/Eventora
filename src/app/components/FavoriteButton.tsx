"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { authFetch } from "../utils/auth";

interface FavoriteButtonProps {
    eventId: string;
}

export default function FavoriteButton({ eventId }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authFetch(`/favorites/check/${eventId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not authenticated");
                return res.json();
            })
            .then((data) => setIsFavorite(data.favorited))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [eventId]);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (loading) return;

        const prev = isFavorite;
        setIsFavorite(!prev);

        try {
            const res = await authFetch("/favorites/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId }),
            });
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setIsFavorite(data.favorited);
        } catch {
            setIsFavorite(prev);
        }
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
