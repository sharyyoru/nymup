'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Briefcase } from 'lucide-react';
import { getInvestmentsContent } from '@/lib/content';

interface PortfolioSectionProps {
  showTitle?: boolean;
}

export default function PortfolioSection({ showTitle = true }: PortfolioSectionProps) {
  const investmentsContent = getInvestmentsContent();
  const items = investmentsContent.items;

  return (
    <section className="py-20 md:py-28 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-12">
            <h6 className="text-[#c9a96e] text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {investmentsContent.portfolioSection.semiTitle}
            </h6>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
              {investmentsContent.portfolioSection.title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-80">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#c9a96e] text-sm mb-2">{item.location}</p>
                <h4 className="text-xl font-bold text-white mb-4">{item.name}</h4>
              </div>
              <Link
                href={`/investments/${item.slug}`}
                className="absolute bottom-6 right-6 w-12 h-12 bg-[#c9a96e] hover:bg-[#b8986d] rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
