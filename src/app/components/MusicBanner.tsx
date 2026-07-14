import React from 'react';

export default function MusicBanner() {
    return (
        <div
            className="relative w-full max-w-6xl mt-4 sm:mt-6 mx-auto h-[240px] sm:h-[320px] md:h-[380px] rounded-2xl overflow-hidden bg-cover bg-center flex items-center px-6 sm:px-8 md:px-16"
            style={{ backgroundImage: "url('/musicbanner.webp')" }}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col items-start max-w-xl text-white font-sans">
                <span className="bg-[#E996BA] text-black font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 mb-2 sm:mb-3 rounded-sm">
                    Get Into It
                </span>

                <h1 className="flex flex-col gap-1 sm:gap-1.5 items-start font-black text-xl sm:text-3xl md:text-5xl uppercase tracking-tight leading-none mb-4 sm:mb-6">
                    <span className="bg-[#506DF2] text-white px-3 sm:px-4 py-1 sm:py-1.5 -rotate-1">
                        From Pop Ballads
                    </span>

                    <span className="bg-[#E996BA] text-[#11132B] px-3 sm:px-4 py-1 sm:py-1.5 md:ml-12 rotate-1">
                        To Emo Encores
                    </span>
                </h1>

                <button className="bg-white text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base hover:bg-orange-300 transition">
                    Get Into Live Music
                </button>
            </div>
        </div>
    );
}