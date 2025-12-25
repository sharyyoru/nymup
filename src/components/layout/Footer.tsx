'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent } from '@/lib/content';

export default function Footer() {
  const siteContent = getSiteContent();

  return (
    <footer className="bg-[#083d59]">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 py-20">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/assets/img/logo/logo-2.png"
                alt={siteContent.siteName}
                width={280}
                height={90}
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-white leading-relaxed text-[18px]">
              {siteContent.description}
            </p>
          </div>

          {/* Our Investments */}
          <div>
            <h6 className="text-white font-bold text-[18px] uppercase tracking-[3px] mb-8">
              Our Investments
            </h6>
            <ul className="space-y-4">
              {siteContent.footerLinks.investments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-[#a3b18a] transition-colors text-[18px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h6 className="text-white font-bold text-[18px] uppercase tracking-[3px] mb-8">
              Corporate
            </h6>
            <ul className="space-y-4">
              {siteContent.footerLinks.corporate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-[#a3b18a] transition-colors text-[18px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="text-white font-bold text-[18px] uppercase tracking-[3px] mb-8">
              Legal
            </h6>
            <ul className="space-y-4">
              {siteContent.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-[#a3b18a] transition-colors text-[18px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
