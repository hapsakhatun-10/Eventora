"use client";

import { useMemo, useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface AsideEventProps {
    title?: string;
    category?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    venue?: string;
    city?: string;
    banner?: File | null;
    activeStep?: number;
    onStepClick?: (step: number, id: string) => void;
}

const steps = [
    { title: "Basic Information", desc: "Title, category & description", id: "section-basic" },
    { title: "Date & Time", desc: "Schedule your event", id: "section-datetime" },
    { title: "Location", desc: "Venue or online meeting", id: "section-location" },
    { title: "Tickets", desc: "Capacity & pricing", id: "section-tickets" },
    { title: "Publish", desc: "Review & publish", id: "section-publish" },
];

const AsideEvent = ({
    title = "",
    category = "",
    date = "",
    startTime = "",
    endTime = "",
    venue = "",
    city = "",
    banner = null,
    activeStep = 1,
    onStepClick,
}: AsideEventProps) => {
    const [mobileExpanded, setMobileExpanded] = useState(false);

    const bannerUrl = useMemo(() => {
        if (banner) {
            const url = URL.createObjectURL(banner);
            return url;
        }
        return null;
    }, [banner]);

    useEffect(() => {
        return () => {
            if (bannerUrl) URL.revokeObjectURL(bannerUrl);
        };
    }, [bannerUrl]);

    const today = new Date();
    const todayFormatted = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    const displayTitle = title || "Untitled Event";
    const displayCategory = category || "No category";
    const displayDate = date
        ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : today.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    const displayTime =
        startTime && endTime
            ? `${startTime} - ${endTime}`
            : startTime
                ? `From ${startTime}`
                : "";
    const displayLocation =
        venue || city
            ? [venue, city].filter(Boolean).join(", ")
            : "No location";

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-80 shrink-0 sticky top-0 h-screen flex-col border-r border-gray-200 bg-white">
                <div className="flex h-full flex-col">
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                        {/* Event Preview */}
                        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="relative h-44 overflow-hidden">
                                {bannerUrl ? (
                                    <img
                                        src={bannerUrl}
                                        alt="Event banner preview"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-500 to-cyan-400" />
                                        <div className="absolute inset-0 opacity-20 bg-[radial-linear(#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />
                                        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                                        <div className="absolute top-16 -right-10 w-20 h-20 rounded-full bg-white/10" />
                                        <div className="absolute -bottom-8 left-8 w-24 h-24 rounded-full bg-white/10" />
                                    </>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-black/10 to-transparent" />
                                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                                    <Calendar className="w-3 h-3" />
                                    Today &bull; {todayFormatted}
                                </div>
                                {(venue || city) && (
                                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-white/15">
                                        <MapPin className="w-3 h-3 shrink-0" />
                                        <span className="truncate">{displayLocation}</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                    Draft
                                </span>
                                <p className="mt-2 text-xs font-semibold text-blue-500 uppercase tracking-wide">
                                    {displayCategory}
                                </p>
                                <h2 className="mt-1 text-xl font-bold text-gray-900">
                                    {displayTitle}
                                </h2>
                                <div className="mt-5 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        <div>
                                            <span>{displayDate}</span>
                                            {displayTime && (
                                                <span className="block text-xs text-gray-400 mt-0.5">
                                                    {displayTime}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        {displayLocation}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-900">Setup Progress</h3>
                                <span className="text-sm font-bold text-blue-500">{Math.round((activeStep / 5) * 100)}%</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
                                <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${(activeStep / 5) * 100}%` }} />
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-3">
                            {steps.map((step, index) => {
                                const num = index + 1;
                                const isActive = activeStep === num;
                                return (
                                    <button
                                        key={step.title}
                                        type="button"
                                        onClick={() => onStepClick?.(num, step.id)}
                                        className={`w-full flex items-center gap-4 rounded-2xl p-4 transition cursor-pointer ${isActive
                                                ? "border border-blue-200 bg-blue-50"
                                                : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${isActive
                                                    ? "bg-blue-500 text-white"
                                                    : "border-2 border-gray-300 text-gray-500"
                                                }`}
                                        >
                                            {num}
                                        </div>
                                        <div className="text-left">
                                            <h4 className={`font-semibold ${isActive ? "text-gray-900" : "text-gray-800"}`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">{step.desc}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Compact Header */}
            <div className="lg:hidden w-full bg-white border-b border-gray-200 sticky top-18 z-40">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-blue-500">
                                Step {activeStep}/5
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs font-semibold text-gray-700 truncate">
                                {steps[activeStep - 1]?.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-bold text-blue-500">
                                {Math.round((activeStep / 5) * 100)}%
                            </span>
                            <button
                                onClick={() => setMobileExpanded(!mobileExpanded)}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                {mobileExpanded ? (
                                    <ChevronUp size={18} className="text-gray-500" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${(activeStep / 5) * 100}%` }}
                        />
                    </div>

                    {/* Expanded Steps */}
                    {mobileExpanded && (
                        <div className="mt-3 space-y-1">
                            {steps.map((step, index) => {
                                const num = index + 1;
                                const isActive = activeStep === num;
                                return (
                                    <button
                                        key={step.title}
                                        type="button"
                                        onClick={() => {
                                            onStepClick?.(num, step.id);
                                            setMobileExpanded(false);
                                        }}
                                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isActive
                                                ? "bg-blue-50 border border-blue-200"
                                                : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <div
                                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${isActive
                                                    ? "bg-blue-500 text-white"
                                                    : "border-2 border-gray-300 text-gray-500"
                                                }`}
                                        >
                                            {num}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className={`text-xs font-semibold ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-[10px] text-gray-400">{step.desc}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AsideEvent;
