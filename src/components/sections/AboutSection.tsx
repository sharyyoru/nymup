'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getHomeContent } from '@/lib/content';

export default function AboutSection() {
  const homeContent = getHomeContent();
  const about = homeContent.about;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="lg:w-5/12">
            <div className="mb-6">
              <span className="text-[#7c8a7c] text-xs uppercase tracking-[3px] mb-2 block">
                {about.semiTitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-normal text-[#1a1a2e] mb-6 leading-tight">
                {about.title}
              </h2>
              <div
                className="text-gray-600 leading-relaxed text-[15px] mb-6"
                dangerouslySetInnerHTML={{ __html: about.description }}
              />
            </div>

            <div className="flex gap-4 mb-6 items-start">
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                <Image
                  src={about.image}
                  alt="About"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1a1a2e] mb-1 text-[15px]">
                  {about.highlight}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{about.highlightText}</p>
              </div>
            </div>

            <Link
              href={about.buttonLink}
              className="inline-block border border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white px-7 py-3 text-sm transition-colors font-medium"
            >
              {about.buttonText}
            </Link>
          </div>

          {/* Right Feature Cards */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-2 gap-5">
              {about.features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden mb-4">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="pr-4">
                    <h5 className="font-semibold text-[#1a1a2e] mb-1 text-base">
                      {feature.title}
                    </h5>
                    <p className="text-gray-500 text-sm mb-3">{feature.subtitle}</p>
                    <Link
                      href={feature.link}
                      className="inline-flex items-center justify-between w-full bg-gray-100 hover:bg-[#c9a96e] hover:text-white text-gray-600 text-sm py-3 px-4 transition-colors group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
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
