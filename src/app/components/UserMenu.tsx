"use client";

import Link from "next/link";
import {
  Calendar,
  FolderKanban,
  CircleHelp,
  Ticket,
  Heart,
  UserPlus,
  Compass,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

const sora = { fontFamily: "var(--font-sora)" };

const menuSections = [
  [
    {
      label: "Browse Events",
      icon: Calendar,
      href: "/find-events",
    },
    {
      label: "Manage My Events",
      icon: FolderKanban,
      href: "/dashboard/manage",
    },
    {
      label: "Get Help",
      icon: CircleHelp,
      href: "/help",
    },
  ],
  [
    {
      label: "Tickets",
      icon: Ticket,
      href: "/tickets",
    },
    {
      label: "Liked Events",
      icon: Heart,
      href: "/dashboard/liked",
    },
    {
      label: "Following",
      icon: UserPlus,
      href: "/following",
    },
    {
      label: "Interests",
      icon: Compass,
      href: "/interests",
    },
  ],
];

export default function UserMenu() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-[340px] rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      {/* Header */}
      <Link href="/" className="block px-7 py-6 border-b bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
        <span className="text-[28px] font-black lowercase text-white leading-none" style={sora}>e</span>
        <span className="text-[18px] font-bold tracking-tight lowercase text-white leading-none" style={sora}>vento</span>
      </Link>

      <div className="py-3">
        {menuSections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`px-3 ${sectionIndex !== 0 ? "mt-4 pt-4 border-t border-slate-100" : ""
              }`}
          >
            {section.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/find-events" && item.href !== "/help" && item.href !== "/tickets" && item.href !== "/following" && item.href !== "/interests" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300
                    ${active
                      ? "bg-slate-100 text-slate-900 shadow-sm"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
                    }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all
                      ${active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900"
                      }`}
                  >
                    <Icon size={18} />
                  </div>

                  <span className="font-medium text-[15px] flex-1">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-3">
        <button
          onClick={logout}
          className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-500 transition-all duration-300 hover:bg-red-50 hover:translate-x-1"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 transition-all group-hover:bg-red-500 group-hover:text-white">
            <LogOut size={18} />
          </div>

          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
