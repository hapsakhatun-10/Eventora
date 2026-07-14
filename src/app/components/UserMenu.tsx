import {
  Calendar,
  FolderKanban,
  CircleHelp,
  Ticket,
  Heart,
  UserPlus,
  Compass,
  Settings,
  LogOut,
} from "lucide-react";

const menuSections = [
  [
    {
      label: "Browse events",
      icon: <Calendar size={18} />,
    },
    {
      label: "Manage my events",
      icon: <FolderKanban size={18} />,
    },
    {
      label: "Get Help",
      icon: <CircleHelp size={18} />,
    },
  ],
  [
    {
      label: "Tickets",
      icon: <Ticket size={18} />,
    },
    {
      label: "Liked",
      icon: <Heart size={18} />,
    },
    {
      label: "Following",
      icon: <UserPlus size={18} />,
    },
    {
      label: "Interests",
      icon: <Compass size={18} />,
    },
  ],
  [
    {
      label: "Account settings",
      icon: <Settings size={18} />,
    },
    {
      label: "Log out",
      icon: <LogOut size={18} />,
      danger: true,
    },
  ],
];

export default function UserMenu() {
  return (
    <aside className="w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {menuSections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className={sectionIndex !== 0 ? "border-t border-gray-200" : ""}
        >
          {section.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors
              ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>

              <span className="text-[15px] font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}
