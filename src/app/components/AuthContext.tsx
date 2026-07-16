"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getToken, setToken, removeToken, authFetch } from "../utils/auth";

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
        if (!getToken()) {
            setUser(null);
            setLoading(false);
            setAuthChecked(true);
            return;
        }
        try {
            const res = await authFetch("/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                removeToken();
                setUser(null);
            }
        } catch {
            removeToken();
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) return data.message;
            setToken(data.token);
            setUser(data.user);
            return null;
        } catch {
            return "Something went wrong";
        }
    };

    const register = async (name: string, email: string, password: string): Promise<string | null> => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) return data.message;
            setToken(data.token);
            setUser(data.user);
            return null;
        } catch {
            return "Something went wrong";
        }
    };

    const logout = () => {
        removeToken();
        setUser(null);
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
