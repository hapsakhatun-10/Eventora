"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    authChecked: boolean;
    login: (email: string, password: string) => Promise<string | null>;
    register: (name: string, email: string, password: string) => Promise<string | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    const checkAuth = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
            setAuthChecked(true);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial auth check syncs external auth state
        checkAuth();
    }, [checkAuth]);

    const login = async (email: string, password: string): Promise<string | null> => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) return data.message;
            setUser(data.user);
            return null;
        } catch {
            return "Something went wrong";
        }
    };

    const register = async (name: string, email: string, password: string): Promise<string | null> => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) return data.message;
            setUser(data.user);
            return null;
        } catch {
            return "Something went wrong";
        }
    };

    const logout = () => {
        setUser(null);
        fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, loading, authChecked, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
