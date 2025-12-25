'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent } from '@/lib/content';

export default function Footer() {
  const siteContent = getSiteContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-cover bg-center bg-no-repeat pt-20"
      style={{ backgroundImage: 'url(/assets/img/footer/footer-bg1.jpg)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/20 pb-10 mb-16">
          <Link href="/">
            <Image
              src={siteContent.logoLight}
              alt={siteContent.siteName}
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h6 className="text-white font-semibold text-lg mb-6 pb-4 border-b border-[#c9a96e]/30">
              About Niyamo
            </h6>
            <p className="text-white/70 leading-relaxed">
              {siteContent.description}
            </p>
          </div>

          <div>
            <h6 className="text-white font-semibold text-lg mb-6 pb-4 border-b border-[#c9a96e]/30">
              Our Investments
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.investments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#c9a96e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-white font-semibold text-lg mb-6 pb-4 border-b border-[#c9a96e]/30">
              Corporate
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.corporate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#c9a96e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-white font-semibold text-lg mb-6 pb-4 border-b border-[#c9a96e]/30">
              Legal
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#c9a96e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              Copyright & Design By <span className="text-[#c9a96e]">@W</span> - {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
