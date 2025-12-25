'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { getSiteContent } from '@/lib/content';

export default function Footer() {
  const siteContent = getSiteContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#083d59] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 border-b border-white/10">
          <Link href="/" className="mb-6 lg:mb-0">
            <Image
              src="/assets/img/logo/footer-logo-1.png"
              alt={siteContent.siteName}
              width={180}
              height={60}
              className="h-16 w-auto"
            />
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a 
              href={`mailto:${siteContent.contact.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-[#c9a96e] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">{siteContent.contact.email}</span>
            </a>
            <a 
              href={siteContent.contact.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-[#c9a96e] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm">{siteContent.contact.address}</span>
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div className="lg:col-span-1">
            <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a96e]"></span>
              About Niyamo
            </h6>
            <p className="text-white/60 leading-[1.8] text-[15px]">
              {siteContent.description}
            </p>
          </div>

          <div>
            <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a96e]"></span>
              Our Investments
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.investments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#c9a96e] transition-all duration-300 flex items-center gap-2 group text-[15px]"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a96e]"></span>
              Corporate
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.corporate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#c9a96e] transition-all duration-300 flex items-center gap-2 group text-[15px]"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c9a96e]"></span>
              Legal
            </h6>
            <ul className="space-y-3">
              {siteContent.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#c9a96e] transition-all duration-300 flex items-center gap-2 group text-[15px]"
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
      <div className="border-t border-white/10 bg-[#062d42]">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Niyamo Capital. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Designed with <span className="text-[#c9a96e]">♥</span> by <span className="text-[#c9a96e] font-semibold">@W</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
