'use client';

import React from 'react';
import Link from 'next/link';

interface PageTitleProps {
  title: string;
  breadcrumb: string;
  backgroundImage?: string;
}

export default function PageTitle({
  title,
  breadcrumb,
  backgroundImage = '/assets/img/page-title/page-title-bg1.jpg',
}: PageTitleProps) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-36 md:py-44"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-[#083d59]/80"></div>
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="pt-12">
          <ul className="flex items-center gap-3 text-white/70 mb-6 text-sm uppercase tracking-wider">
            <li>
              <Link href="/" className="hover:text-[#a3b18a] transition-colors font-medium">
                Home
              </Link>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-[#a3b18a] font-medium">{breadcrumb}</li>
          </ul>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
