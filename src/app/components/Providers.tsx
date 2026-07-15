"use client";

import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
    );
}
