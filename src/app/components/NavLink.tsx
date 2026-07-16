"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    matchPaths?: string[];
}

export default function NavLink({ href, children, className = "", matchPaths }: NavLinkProps) {
    const pathname = usePathname();

    const isActive =
        pathname === href ||
        (matchPaths?.some((p) => pathname.startsWith(p)) ?? false);

    return (
        <Link
            href={href}
            className={`nav-link ${isActive ? "nav-link--active" : ""} ${className}`}
        >
            {children}
        </Link>
    );
}
