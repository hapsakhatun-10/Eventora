import React from 'react';

export default function MusicBanner() {
    return (
        <div
            className="relative w-full max-w-6xl mx-auto h-[380px] rounded-2xl overflow-hidden bg-cover bg-center flex items-center px-8 md:px-16"
            style={{ backgroundImage: "url('/musicbanner.webp')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start max-w-xl text-white font-sans">
                <span className="bg-[#E996BA] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 mb-3 rounded-sm">
                    Get Into It
                </span>

                <h1 className="flex flex-col gap-1.5 items-start font-black text-3xl md:text-5xl uppercase tracking-tight leading-none mb-6">
                    <span className="bg-[#506DF2] text-white px-4 py-1.5 -rotate-1">
                        From Pop Ballads
                    </span>

                    <span className="bg-[#E996BA] text-[#11132B] px-4 py-1.5 md:ml-12 rotate-1">
                        To Emo Encores
                    </span>
                </h1>

                <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-orange-300 transition">
                    Get Into Live Music
                </button>
            </div>
        </div>
    );
}