"use client";

import React, { useState } from "react";
import { Share2, Copy, Mail, X } from "lucide-react";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface ShareButtonProps {
    eventId: string;
}

export default function ShareButton({ eventId }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        const url = `${window.location.origin}/event/${eventId}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/event/${eventId}`)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/event/${eventId}`)}`, '_blank');
    };

    const shareViaEmail = () => {
        window.location.href = `mailto:?subject=Check out this event&body=${encodeURIComponent(`${window.location.origin}/event/${eventId}`)}`;
    };

    const shareViaWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${window.location.origin}/event/${eventId}`)}`, '_blank');
    };

    return (
        <>
            <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-500"
                title="Share"
            >
                <Share2 size={16} />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Share Event</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={shareOnFacebook}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <FaFacebookF size={20} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-700">Facebook</span>
                            </button>
                            <button
                                onClick={shareOnTwitter}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                                    <FaTwitter size={20} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-700">Twitter</span>
                            </button>
                            <button
                                onClick={shareViaWhatsApp}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <FaWhatsapp size={20} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-700">WhatsApp</span>
                            </button>
                            <button
                                onClick={shareViaEmail}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                    <Mail size={20} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-700">Email</span>
                            </button>
                            <button
                                onClick={copyLink}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                    <Copy size={20} className="text-white" />
                                </div>
                                <span className="font-medium text-gray-700">
                                    {copied ? "Copied!" : "Copy Link"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
