'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { getSiteContent } from '@/lib/content';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const siteContent = getSiteContent();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showWhiteHeader = isScrolled || variant === 'solid';

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showWhiteHeader
            ? 'bg-white shadow-lg py-4'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - Different logos for transparent vs sticky */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                src={showWhiteHeader ? "/assets/img/logo/footer-logo-1.png" : "/assets/img/logo/logo-2.png"}
                alt={siteContent.siteName}
                width={160}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-8">
              {siteContent.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    showWhiteHeader 
                      ? 'text-[#083d59] hover:text-[#a3b18a]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Contact Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden md:inline-flex bg-[#a3b18a] hover:bg-[#8a9a73] text-white px-6 py-2.5 transition-colors duration-200 text-[13px] font-medium"
              >
                Contact Us
              </Link>

              {/* Mobile Menu Button */}
              {mounted && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 transition-colors ${
                    showWhiteHeader 
                      ? 'text-[#083d59]' 
                      : 'text-white'
                  }`}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      {mounted && mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-xl lg:hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/assets/img/logo/footer-logo-1.png"
                  alt={siteContent.siteName}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#083d59] p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col">
                {siteContent.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#083d59] text-base font-medium hover:text-[#a3b18a] transition-colors py-3 border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#083d59] text-base font-medium hover:text-[#a3b18a] transition-colors py-3 border-b border-gray-100"
                >
                  Contact Us
                </Link>
              </nav>
              <div className="mt-8">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[#a3b18a] hover:bg-[#8a9a73] text-white text-center px-6 py-3 transition-colors text-sm font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
