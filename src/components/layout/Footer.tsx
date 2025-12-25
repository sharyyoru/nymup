'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent } from '@/lib/content';

export default function Footer() {
  const siteContent = getSiteContent();

  return (
    <footer className="bg-[#083d59]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 py-16">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/assets/img/logo/logo-2.png"
                alt={siteContent.siteName}
                width={140}
                height={45}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/50 leading-relaxed text-[14px]">
              {siteContent.description}
            </p>
          </div>

          {/* Our Investments */}
          <div>
            <h6 className="text-white font-bold text-[13px] uppercase tracking-[2px] mb-5">
              Our Investments
            </h6>
            <ul className="space-y-2.5">
              {siteContent.footerLinks.investments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-[14px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h6 className="text-white font-bold text-[13px] uppercase tracking-[2px] mb-5">
              Corporate
            </h6>
            <ul className="space-y-2.5">
              {siteContent.footerLinks.corporate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-[14px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="text-white font-bold text-[13px] uppercase tracking-[2px] mb-5">
              Legal
            </h6>
            <ul className="space-y-2.5">
              {siteContent.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-[14px]"
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
