'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getSiteContent } from '@/lib/content';

export default function Footer() {
  const siteContent = getSiteContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#083d59]">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/img/logo/logo-light.png"
                alt={siteContent.siteName}
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 leading-[1.9] text-[15px]">
              {siteContent.description}
            </p>
          </div>

          <div>
            <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Our Investments
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.investments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#a3b18a] transition-all duration-300 flex items-center gap-2 group text-[15px]"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Corporate
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.corporate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#a3b18a] transition-all duration-300 flex items-center gap-2 group text-[15px]"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Legal
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#a3b18a] transition-all duration-300 flex items-center gap-2 group text-[15px]"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Niyamo Capital. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Designed by <span className="text-[#a3b18a] font-semibold">@W</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
