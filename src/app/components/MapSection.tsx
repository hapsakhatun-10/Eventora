"use client";

import React from "react";
import {
    Plus,
    Minus,
    Layers,
    Navigation,
    MapPinned,
    Crosshair,
    Loader2,
} from "lucide-react";

interface MapSectionProps {
    userLocation: { lat: number; lng: number; label: string } | null;
    locationStatus: "idle" | "loading" | "error";
    eventCount: number;
    onFetchLocation: () => void;
    className?: string;
}

export default function MapSection({
    userLocation,
    locationStatus,
    eventCount,
    onFetchLocation,
    className = "",
}: MapSectionProps) {
    return (
        <section
            className={`hidden lg:block lg:col-span-4 h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm relative ${className}`}
        >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                            {locationStatus === "loading" ? (
                                <Loader2 size={15} className="text-blue-600 animate-spin" />
                            ) : (
                                <MapPinned size={15} className="text-blue-600" />
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900 leading-tight">
                                {userLocation ? userLocation.label : "Dhaka, Bangladesh"}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium">
                                {userLocation
                                    ? `${eventCount} events nearby`
                                    : locationStatus === "error"
                                        ? "Location access denied"
                                        : "Detecting location..."}
                            </p>
                        </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                        <Layers size={14} />
                    </button>
                </div>
            </div>

            {/* Map Canvas */}
            <div className="w-full h-full relative bg-[#E8EDF2] pt-14">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                            backgroundImage:
                            "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute top-[30%] left-0 right-0 h-[3px] bg-white/70 shadow-sm" />
                <div className="absolute top-[55%] left-0 right-0 h-[3px] bg-white/70 shadow-sm" />
                <div className="absolute left-[25%] top-0 bottom-0 w-[3px] bg-white/70 shadow-sm" />
                <div className="absolute left-[55%] top-0 bottom-0 w-[3px] bg-white/70 shadow-sm" />

                <div className="absolute top-[18%] left-[12%] text-[9px] font-bold text-slate-500/60 uppercase tracking-widest">
                    Mirpur
                </div>
                <div className="absolute top-[20%] right-[15%] text-[9px] font-bold text-slate-500/60 uppercase tracking-widest">
                    Banani
                </div>
                <div className="absolute top-[42%] right-[10%] text-[9px] font-bold text-slate-500/60 uppercase tracking-widest">
                    Gulshan
                </div>
                <div className="absolute bottom-[15%] right-[20%] text-[9px] font-bold text-slate-500/60 uppercase tracking-widest">
                    Ramna
                </div>

                {/* Zoom Controls */}
                <div className="absolute top-16 right-3 flex flex-col z-20">
                    <button className="w-8 h-8 bg-white rounded-t-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
                        <Plus size={14} />
                    </button>
                    <div className="w-8 h-px bg-gray-200" />
                    <button className="w-8 h-8 bg-white rounded-b-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
                        <Minus size={14} />
                    </button>
                </div>

                {/* My Location Button */}
                <div className="absolute top-28 right-3 z-20">
                    <button
                        onClick={onFetchLocation}
                        disabled={locationStatus === "loading"}
                        className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 shadow-sm disabled:opacity-50"
                    >
                        {locationStatus === "loading" ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Navigation size={14} />
                        )}
                    </button>
                </div>

                {/* User Location Marker */}
                {userLocation && (
                    <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group/user"
                        style={{ top: "50%", left: "50%" }}
                    >
                        <span className="absolute inset-0 -m-4 rounded-full bg-blue-500 opacity-15 animate-ping" />
                        <span className="absolute inset-0 -m-2 rounded-full bg-blue-400 opacity-25 animate-ping [animation-delay:0.5s]" />
                        <div className="relative w-4 h-4 bg-blue-600 rounded-full border-[3px] border-white shadow-lg z-10" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-gray-900 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover/user:opacity-100 transition-opacity pointer-events-none shadow-lg border border-gray-200">
                            You are here
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                        </div>
                    </div>
                )}

                {/* Location Permission Prompt */}
                {locationStatus === "error" && !userLocation && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 max-w-[200px] text-center">
                        <Crosshair size={18} className="mx-auto text-gray-400 mb-1.5" />
                        <p className="text-[10px] font-semibold text-gray-700">
                            Enable location to see events near you
                        </p>
                        <button
                            onClick={onFetchLocation}
                            className="mt-2 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[11px] font-semibold text-gray-700">Live</span>
                        </div>
                        <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            View full map →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
