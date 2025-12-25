'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
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
            ? 'bg-white shadow-xl py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <Image
                src="/assets/img/logo/footer-logo-1.png"
                alt={siteContent.siteName}
                width={200}
                height={70}
                className={`transition-all duration-300 ${showWhiteHeader ? 'h-12' : 'h-14'} w-auto`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {siteContent.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-bold uppercase tracking-wider transition-all duration-300 hover:text-[#a3b18a] ${
                    showWhiteHeader ? 'text-[#083d59]' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Contact Button & Mobile Menu */}
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 bg-[#a3b18a] hover:bg-[#8a9a73] text-white px-7 py-3.5 transition-all duration-300 text-[14px] font-bold uppercase tracking-wider group"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            className="fixed inset-0 bg-[#083d59]/90 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed top-0 right-0 h-full w-[320px] bg-white z-50 shadow-2xl lg:hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-12">
                <Image
                  src="/assets/img/logo/footer-logo-1.png"
                  alt={siteContent.siteName}
                  width={140}
                  height={45}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#083d59] p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {siteContent.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#083d59] text-xl font-bold uppercase tracking-wider hover:text-[#a3b18a] transition-all py-4 border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#083d59] text-xl font-bold uppercase tracking-wider hover:text-[#a3b18a] transition-all py-4 border-b border-gray-100"
                >
                  Contact
                </Link>
              </nav>
              <div className="mt-12">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#a3b18a] hover:bg-[#8a9a73] text-white text-center px-6 py-4 transition-all duration-300 font-bold uppercase tracking-wider"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
