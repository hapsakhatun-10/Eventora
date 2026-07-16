"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "../../utils/auth";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            setToken(token);
            window.location.href = "/";
        } else {
            router.push("/login");
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-slate-900" />
        </div>
    );
}
