"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Calendar,
    MapPin,
    ImagePlus,
    FileText,
    ToggleLeft,
    ToggleRight,
    Search,
    HelpCircle,
    Video,
    Info,
    Plus,
    Lightbulb,
    User,
    Loader2,
} from "lucide-react";
import AsideEvent from "../components/AsideEvent";
import { useAuth } from "../components/AuthContext";
import { useToast } from "../components/Toast";
import { compressImage } from "../utils/compressImage";
import { authFetch } from "../utils/auth";

export default function CreateEventPage() {
    const { user, authChecked } = useAuth();
    const router = useRouter();
    const { showToast } = useToast();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [venue, setVenue] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [onlineUrl, setOnlineUrl] = useState("");
    const [price, setPrice] = useState("");
    const [totalSeats, setTotalSeats] = useState("");
    const [eventType, setEventType] = useState<"single" | "recurring">("single");
    const [locationTab, setLocationTab] = useState<"venue" | "online" | "tba">(
        "venue"
    );
    const [reservedSeating, setReservedSeating] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [compressing, setCompressing] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (authChecked && !user) {
            router.push("/login");
        }
    }, [user, authChecked, router]);

    const scrollTo = (step: number, id: string) => {
        setActiveStep(step);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors([]);

        const newErrors: string[] = [];
        if (!title.trim()) newErrors.push("Event title is required");
        if (!category) newErrors.push("Please select a category");
        if (!date) newErrors.push("Date is required");
        if (!startTime) newErrors.push("Start time is required");
        if (!endTime) newErrors.push("End time is required");
        if (locationTab === "venue" && (!venue.trim() || !city.trim())) {
            newErrors.push("Venue and city are required for in-person events");
        }
        if (locationTab === "online" && !onlineUrl.trim()) {
            newErrors.push("Online event link is required");
        }
        if (!price) newErrors.push("Price is required");
        if (!totalSeats || Number(totalSeats) < 1) {
            newErrors.push("Total seats must be at least 1");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("category", category);
        formData.append("shortDescription", shortDescription);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("eventType", eventType);
        formData.append("locationTab", locationTab);
        formData.append("venue", venue);
        formData.append("city", city);
        formData.append("address", address);
        formData.append("onlineUrl", onlineUrl);
        formData.append("price", String(Number(price)));
        formData.append("totalSeats", String(Number(totalSeats)));
        formData.append("reservedSeating", String(reservedSeating));
        if (banner) formData.append("banner", banner);

        setSubmitting(true);
        try {
            const res = await authFetch("/events", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                showToast("Event created successfully!", "success");
                setTimeout(() => router.push("/dashboard/manage"), 800);
            } else {
                const data = await res.json();
                showToast(data.message || "Failed to create event", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Something went wrong!", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (!authChecked || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F9FA]">
            <AsideEvent
                title={title}
                category={category}
                date={date}
                startTime={startTime}
                endTime={endTime}
                venue={venue}
                city={city}
                banner={banner}
                activeStep={activeStep}
                onStepClick={scrollTo}
            />

            <div className="flex-1 min-w-0 border border-gray-200 bg-white shadow-sm overflow-hidden my-0 lg:my-6 mx-0 lg:mx-0 rounded-none lg:rounded-xl">
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="border-b border-gray-100 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="h-11 sm:h-14 w-11 sm:w-14 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                                    Event Overview
                                </h2>
                                <p className="text-gray-500 mt-0.5 sm:mt-1 text-xs sm:text-sm">
                                    Tell attendees what your event is about.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                        {/* Validation Errors */}
                        {errors.length > 0 && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                                <p className="text-sm font-bold text-red-700 mb-2">Please fix the following:</p>
                                <ul className="space-y-1">
                                    {errors.map((err, i) => (
                                        <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            {err}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Section 1: Basic Information */}
                        <div id="section-basic" className="space-y-8">
                            {/* Banner */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Event Banner
                                </label>
                                <label className="flex h-48 sm:h-60 md:h-72 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-blue-500 hover:bg-blue-50">
                                    {compressing ? (
                                        <div className="text-center px-4">
                                            <Loader2 className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-blue-500 animate-spin" />
                                            <p className="mt-3 text-sm font-semibold text-gray-600">Compressing image...</p>
                                            <p className="mt-1 text-xs text-gray-400">Optimizing for upload</p>
                                        </div>
                                    ) : banner ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={URL.createObjectURL(banner)}
                                                alt="Banner preview"
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.preventDefault(); setBanner(null); }}
                                                className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 text-white text-xs font-bold rounded-lg hover:bg-black/80 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center px-4">
                                            <ImagePlus className="mx-auto h-10 w-10 sm:h-14 sm:w-14 text-gray-400" />
                                            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-700">
                                                Upload Event Banner
                                            </h3>
                                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                                                PNG, JPG • Max 5MB
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/png,image/jpeg"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            setCompressing(true);
                                            try {
                                                const compressed = await compressImage(file);
                                                setBanner(compressed);
                                            } catch {
                                                setBanner(file);
                                            } finally {
                                                setCompressing(false);
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Event Title */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Event Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Summer Music Festival 2026"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="">Select a category</option>
                                    <option value="music">Music</option>
                                    <option value="sports">Sports</option>
                                    <option value="tech">Tech</option>
                                    <option value="business">Business</option>
                                    <option value="arts">Arts</option>
                                    <option value="food">Food</option>
                                    <option value="health">Health</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Summary */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Short Summary
                                    </label>
                                    <span className="text-sm text-gray-400">
                                        {shortDescription.length} / 150
                                    </span>
                                </div>
                                <textarea
                                    rows={3}
                                    maxLength={150}
                                    placeholder="Write a short summary..."
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    className="w-full resize-none rounded-xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Event Description
                                </label>
                                <textarea
                                    rows={10}
                                    placeholder="Describe your event in detail..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full resize-none rounded-xl border border-gray-300 px-5 py-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Section 2: Date & Time */}
                        <div id="section-datetime" className="space-y-8">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Date and location
                            </h2>

                            {/* Type of Event */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-700">
                                    Type of event
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setEventType("single")}
                                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${eventType === "single"
                                            ? "border-blue-600 bg-white"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Calendar
                                                className={`w-5 h-5 ${eventType === "single"
                                                    ? "text-blue-600"
                                                    : "text-gray-500"
                                                    }`}
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">
                                                    Single event
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    For events that happen once
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${eventType === "single"
                                                ? "border-blue-600 bg-blue-600"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {eventType === "single" && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEventType("recurring")}
                                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${eventType === "recurring"
                                            ? "border-blue-600 bg-white"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Calendar
                                                className={`w-5 h-5 ${eventType === "recurring"
                                                    ? "text-blue-600"
                                                    : "text-gray-500"
                                                    }`}
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-gray-900">
                                                        Recurring event
                                                    </p>
                                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border border-blue-100">
                                                        New
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    For timed entry and multiple days
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${eventType === "recurring"
                                                ? "border-blue-600 bg-blue-600"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {eventType === "recurring" && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Info Bar */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Date */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>

                                    {/* Start Time */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Start Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>

                                    {/* End Time */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            End Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <button
                                        type="button"
                                        className="text-xs font-bold text-blue-600 hover:underline"
                                    >
                                        More options
                                    </button>
                                    <p className="text-[11px] font-medium text-gray-500">
                                        GMT+6, Display start and end time, English (US)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Location */}
                        <div id="section-location" className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Location
                            </h2>

                            {/* Location Section */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-sm font-bold text-gray-700">Location</h3>

                                {/* Tab Switcher */}
                                <div className="inline-flex rounded-lg bg-gray-100/80 p-1 border border-gray-200/40">
                                    <button
                                        type="button"
                                        onClick={() => setLocationTab("venue")}
                                        className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-md transition-colors ${locationTab === "venue"
                                            ? "bg-blue-600 text-white shadow-xs"
                                            : "text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        <MapPin className="w-3.5 h-3.5" /> Venue
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setLocationTab("online")}
                                        className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-md transition-colors ${locationTab === "online"
                                            ? "bg-blue-600 text-white shadow-xs"
                                            : "text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        <Video className="w-3.5 h-3.5" /> Online event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setLocationTab("tba")}
                                        className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-md transition-colors ${locationTab === "tba"
                                            ? "bg-blue-600 text-white shadow-xs"
                                            : "text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        <HelpCircle className="w-3.5 h-3.5" /> To be announced
                                    </button>
                                </div>

                                {/* Location Input */}
                                {locationTab === "venue" && (
                                    <div className="space-y-4 max-w-xl">
                                        <div className="space-y-1.5">
                                            <div className="relative">
                                                <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold bg-white z-10 text-gray-500">
                                                    Location <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex items-center rounded-lg px-3 py-3 border-2 border-gray-300 bg-transparent transition-colors focus-within:border-blue-600">
                                                    <Search className="w-4 h-4 shrink-0 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search for a venue or address"
                                                        value={venue}
                                                        onChange={(e) => setVenue(e.target.value)}
                                                        className="w-full pl-2.5 border-none outline-none text-xs font-medium bg-transparent placeholder-gray-400 text-gray-900"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Dhaka"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>

                                        {/* Address */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 123 Main St, Suite 100"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>
                                    </div>
                                )}

                                {locationTab === "online" && (
                                    <div className="space-y-1.5 max-w-xl">
                                        <div className="relative">
                                            <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold bg-white z-10 text-gray-500">
                                                Online Link <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex items-center rounded-lg px-3 py-3 border-2 border-gray-300 bg-transparent transition-colors focus-within:border-blue-600">
                                                <Video className="w-4 h-4 shrink-0 text-gray-400" />
                                                <input
                                                    type="url"
                                                    placeholder="https://meet.google.com/..."
                                                    value={onlineUrl}
                                                    onChange={(e) => setOnlineUrl(e.target.value)}
                                                    className="w-full pl-2.5 border-none outline-none text-xs font-medium bg-transparent placeholder-gray-400 text-gray-900"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {locationTab === "tba" && (
                                    <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 p-3 rounded-lg text-xs font-medium text-gray-700 max-w-md">
                                        <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                                        <p>
                                            Location will be announced later. Attendees will be
                                            notified.
                                        </p>
                                    </div>
                                )}

                                {/* Add details link */}
                                <button
                                    type="button"
                                    className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-blue-600 pt-1"
                                >
                                    <span className="text-base leading-none font-medium text-gray-500">
                                        +
                                    </span>{" "}
                                    Add location details
                                </button>

                                {/* Map View */}
                                {locationTab === "venue" && (
                                    <div className="w-full h-40 sm:h-48 bg-[#BFDFE0] rounded-xl overflow-hidden relative border border-cyan-200 shadow-inner">
                                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-linear(#086b72_1px,transparent_1px)] [background-size:16px_16px]" />
                                        <span className="hidden sm:block absolute top-4 left-10 text-[9px] font-black uppercase tracking-wider text-[#3D696C]/60">
                                            Pacific Heights
                                        </span>
                                        <span className="hidden sm:block absolute top-4 left-44 text-[9px] font-black uppercase tracking-wider text-[#3D696C]/60">
                                            Chinatown
                                        </span>
                                        <span className="absolute top-4 sm:top-14 left-6 sm:left-36 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#2D5053]">
                                            Union Square
                                        </span>
                                        <span className="hidden sm:block absolute bottom-16 left-28 text-[9px] font-black uppercase tracking-wider text-[#3D696C]/60">
                                            Civic Center
                                        </span>
                                        <span className="absolute bottom-8 right-4 sm:right-20 text-[9px] font-black uppercase tracking-wider text-[#3D696C]/60">
                                            Mission Bay
                                        </span>
                                        <div className="absolute bottom-2 left-3 bg-white/60 px-1 py-0.5 rounded-sm text-[10px] font-bold tracking-tighter text-gray-700 select-none">
                                            Google
                                        </div>
                                        <div className="absolute bottom-2 right-3 text-[9px] font-medium text-gray-600 select-none">
                                            Map data ©2026 Google
                                        </div>
                                    </div>
                                )}

                                {/* Reserved Seating */}
                                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white max-w-full">
                                    <div className="space-y-0.5 max-w-2xl">
                                        <p className="text-xs font-bold text-gray-700">
                                            Reserved seating
                                        </p>
                                        <p className="text-[11px] text-gray-400 leading-normal">
                                            Use your venue map to set price tiers for each section
                                            and choose whether attendees can pick their seat.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setReservedSeating(!reservedSeating)}
                                        className={`transition-colors ${reservedSeating ? "text-blue-600" : "text-gray-300"
                                            }`}
                                    >
                                        {reservedSeating ? (
                                            <ToggleRight className="w-8 h-8 stroke-[1.25]" />
                                        ) : (
                                            <ToggleLeft className="w-8 h-8 stroke-[1.25]" />
                                        )}
                                    </button>
                                </div>

                                {/* Price and Seats */}
                                <div id="section-tickets" className="space-y-4 pt-4 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-700">Tickets</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Price */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Price (BDT) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="0 for free events"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>

                                        {/* Total Seats */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Total Seats <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Maximum capacity"
                                                value={totalSeats}
                                                onChange={(e) => setTotalSeats(e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 1. OVERVIEW SECTION CARD */}
                        <section id="section-publish" className="bg-white rounded-xl border border-gray-200 shadow-xs p-4 sm:p-6 flex justify-between items-start gap-3">
                            <div className="space-y-2 min-w-0">
                                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Overview</h2>
                                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                                    Use this section to provide more details about your event. You can include things to know, venue information, accessibility options—anything that will help people know what to expect.
                                </p>
                            </div>
                            <button type="button" className="bg-[#F8F9FA] hover:bg-gray-100 text-blue-600 p-2 rounded-full transition shadow-2xs">
                                <Plus className="w-4 h-4 stroke-[3]" />
                            </button>
                        </section>

                        {/* 2. GOOD TO KNOW CARD */}
                        <section className="bg-white rounded-xl border-2 border-blue-500 p-4 sm:p-6 flex justify-between items-start shadow-xs gap-3">
                            <div className="space-y-4 sm:space-y-6 w-full min-w-0">
                                <div className="space-y-1">
                                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Good to know</h2>
                                </div>

                                {/* Highlights Sub-section */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-gray-800">Highlights</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <button type="button" className="flex items-center gap-1.5 border border-gray-700 text-gray-800 rounded-full px-3 py-1 text-xs font-bold hover:bg-gray-50 transition">
                                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Add Age info
                                        </button>
                                        <button type="button" className="flex items-center gap-1.5 border border-gray-700 text-gray-800 rounded-full px-3 py-1 text-xs font-bold hover:bg-gray-50 transition">
                                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Add Parking info
                                        </button>
                                    </div>
                                </div>

                                {/* FAQ Sub-section */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-gray-800">Frequently asked questions</h3>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                                        <Lightbulb className="w-4 h-4 text-slate-600 fill-slate-400 shrink-0" />
                                        <span>Events with FAQs have 8% more organic traffic</span>
                                    </div>
                                    <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition">
                                        + Add question
                                    </button>
                                </div>
                            </div>
                            <button type="button" className="bg-[#F8F9FA] hover:bg-gray-100 text-blue-600 p-2 rounded-full transition shadow-2xs">
                                <Plus className="w-4 h-4 stroke-[3]" />
                            </button>
                        </section>

                        {/* 3. DYNAMIC ADD EXTRA SECTIONS */}
                        <section className="bg-white rounded-xl border border-dashed border-gray-300 p-4 sm:p-6 space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                    Add more sections to your event page
                                </h2>
                                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                                    Make your event stand out even more. These sections help attendees find information and answer their questions - which means more ticket sales and less time answering messages.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 border border-gray-100 shadow-2xs shrink-0">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">Lineup</span>
                                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-sm border border-blue-100">
                                            New
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4 ml-12 sm:ml-0">
                                    <button type="button" className="text-xs font-bold text-blue-600 hover:underline">
                                        See examples
                                    </button>
                                    <button type="button" className="border border-gray-300 bg-white rounded-md px-4 py-1.5 text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Submit */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Save & Continue"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
