'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getHomeContent } from '@/lib/content';

export default function AboutSection() {
  const homeContent = getHomeContent();
  const about = homeContent.about;

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-5/12">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#a3b18a]" />
                <span className="text-[#a3b18a] text-xs uppercase tracking-[4px] font-bold">
                  {about.semiTitle}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#083d59] mb-6 leading-[1.2]">
                {about.title}
              </h2>
              <div
                className="text-gray-600 leading-[1.8] text-[16px] mb-8"
                dangerouslySetInnerHTML={{ __html: about.description }}
              />
            </div>

            <div className="flex gap-5 mb-8 items-start p-5 bg-[#f8f9fa] rounded-xl border-l-4 border-[#a3b18a]">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={about.image}
                  alt="About"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#083d59] mb-1 text-[15px]">
                  {about.highlight}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{about.highlightText}</p>
              </div>
            </div>

            <Link
              href={about.buttonLink}
              className="inline-flex items-center gap-3 bg-[#a3b18a] hover:bg-[#8a9a73] text-white px-8 py-4 text-sm transition-all duration-300 font-bold uppercase tracking-wider group"
            >
              {about.buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Feature Cards */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {about.features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-[#083d59] mb-2 text-lg">
                      {feature.title}
                    </h5>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{feature.subtitle}</p>
                    <Link
                      href={feature.link}
                      className="inline-flex items-center gap-2 text-[#a3b18a] hover:text-[#083d59] text-sm font-bold uppercase tracking-wider transition-colors group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
