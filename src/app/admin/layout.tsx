'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Briefcase,
  Settings,
  Image as ImageIcon,
  Mail,
  Shield,
  LayoutDashboard,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/site', label: 'Site Settings', icon: Settings },
  { href: '/admin/home', label: 'Home Page', icon: Home },
  { href: '/admin/about', label: 'About Page', icon: FileText },
  { href: '/admin/investments', label: 'Investments', icon: Briefcase },
  { href: '/admin/pages', label: 'Legal Pages', icon: Shield },
  { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { href: '/admin/contact', label: 'Contact Settings', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a2e] text-white fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-[#c9a96e]">Niyamo CMS</h1>
          <p className="text-sm text-white/60 mt-1">Content Management</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#c9a96e] text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            View Website →
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
