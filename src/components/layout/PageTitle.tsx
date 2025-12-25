'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      className="relative bg-cover bg-center bg-no-repeat py-32 md:py-40"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-[#1a1a2e]/70"></div>
      <Image
        src="/assets/img/cta/dot-shape-1.png"
        alt="Dot Pattern"
        width={200}
        height={200}
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="pt-10">
          <ul className="flex items-center gap-2 text-white/80 mb-4">
            <li>
              <Link href="/" className="hover:text-[#c9a96e] transition-colors">
                Home /
              </Link>
            </li>
            <li className="text-[#c9a96e]">{breadcrumb}</li>
          </ul>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
