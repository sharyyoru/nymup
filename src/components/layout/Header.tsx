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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showWhiteHeader
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                src="/assets/img/logo/footer-logo-1.png"
                alt={siteContent.siteName}
                width={180}
                height={60}
                className={`transition-all duration-300 ${showWhiteHeader ? 'h-14' : 'h-16'} w-auto`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {siteContent.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-semibold tracking-wide transition-all duration-300 hover:text-[#c9a96e] relative group ${
                    showWhiteHeader ? 'text-[#083d59]' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c9a96e] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact Button & Mobile Menu */}
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="hidden md:inline-flex bg-[#c9a96e] hover:bg-[#b8986d] hover:scale-105 text-white px-8 py-3 rounded-full transition-all duration-300 text-[14px] font-semibold tracking-wide shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>

              {/* Mobile Menu Button */}
              {mounted && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 rounded-lg transition-colors ${
                    showWhiteHeader 
                      ? 'text-[#083d59] hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 right-0 h-full w-[320px] bg-white z-50 shadow-2xl lg:hidden transform transition-transform">
            <div className="p-8">
              <div className="flex items-center justify-between mb-10">
                <Image
                  src="/assets/img/logo/footer-logo-1.png"
                  alt={siteContent.siteName}
                  width={140}
                  height={45}
                  className="h-12 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#083d59] p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {siteContent.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#083d59] text-lg font-semibold hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all py-4 px-4 rounded-lg border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#083d59] text-lg font-semibold hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 transition-all py-4 px-4 rounded-lg border-b border-gray-100"
                >
                  Contact
                </Link>
              </nav>
              <div className="mt-10">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[#c9a96e] hover:bg-[#b8986d] text-white text-center px-6 py-4 rounded-full transition-all duration-300 font-semibold shadow-lg"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
