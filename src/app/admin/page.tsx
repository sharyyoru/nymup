'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  FileText,
  Briefcase,
  Settings,
  Image as ImageIcon,
  Mail,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getInvestmentsContent } from '@/lib/content';

const quickLinks = [
  {
    href: '/admin/site',
    label: 'Site Settings',
    description: 'Manage logo, navigation, and footer',
    icon: Settings,
    color: 'bg-blue-500',
  },
  {
    href: '/admin/home',
    label: 'Home Page',
    description: 'Edit hero slider and about section',
    icon: Home,
    color: 'bg-green-500',
  },
  {
    href: '/admin/investments',
    label: 'Investments',
    description: 'Manage portfolio items',
    icon: Briefcase,
    color: 'bg-purple-500',
  },
  {
    href: '/admin/about',
    label: 'About Page',
    description: 'Edit company information',
    icon: FileText,
    color: 'bg-orange-500',
  },
  {
    href: '/admin/pages',
    label: 'Legal Pages',
    description: 'Privacy & Cookies policies',
    icon: Shield,
    color: 'bg-red-500',
  },
  {
    href: '/admin/media',
    label: 'Media Library',
    description: 'Upload and manage images',
    icon: ImageIcon,
    color: 'bg-pink-500',
  },
];

export default function AdminDashboard() {
  const investmentsContent = getInvestmentsContent();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Niyamo Capital CMS</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Investments</CardDescription>
            <CardTitle className="text-4xl">{investmentsContent.items.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pages</CardDescription>
            <CardTitle className="text-4xl">6</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hero Slides</CardDescription>
            <CardTitle className="text-4xl">2</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Navigation Items</CardDescription>
            <CardTitle className="text-4xl">3</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Links */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`${link.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{link.label}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="text-[#c9a96e] flex items-center gap-1 text-sm">
                    Manage <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
