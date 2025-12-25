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
      setIsScrolled(window.scrollY > 100);
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
            ? 'bg-white shadow-md py-4'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Image
                src={showWhiteHeader ? siteContent.logo : siteContent.logo}
                alt={siteContent.siteName}
                width={150}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {siteContent.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors hover:text-[#c9a96e] ${
                    showWhiteHeader ? 'text-[#1a1a2e]' : 'text-white'
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
                className="hidden md:inline-flex bg-[#c9a96e] hover:bg-[#b8986d] text-white px-6 py-2.5 rounded-sm transition-colors text-[15px] font-medium"
              >
                Contact Us
              </Link>

              {/* Mobile Menu Button */}
              {mounted && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 ${showWhiteHeader ? 'text-[#1a1a2e]' : 'text-white'}`}
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
          <aside className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl lg:hidden transform transition-transform">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Image
                  src={siteContent.logo}
                  alt={siteContent.siteName}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1a1a2e] p-2"
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
                    className="text-[#1a1a2e] text-lg font-medium hover:text-[#c9a96e] transition-colors py-3 border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1a1a2e] text-lg font-medium hover:text-[#c9a96e] transition-colors py-3 border-b border-gray-100"
                >
                  Contact
                </Link>
              </nav>
              <div className="mt-8">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[#c9a96e] hover:bg-[#b8986d] text-white text-center px-6 py-3 rounded-sm transition-colors font-medium"
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
