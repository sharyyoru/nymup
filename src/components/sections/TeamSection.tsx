'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin } from 'lucide-react';
import { getTeamContent } from '@/lib/content';

export default function TeamSection() {
  const teamContent = getTeamContent();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#a3b18a] text-sm font-bold uppercase tracking-[3px] mb-4 block">
            {teamContent.intro.semiTitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#083d59] mb-6 leading-tight">
            {teamContent.intro.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {teamContent.intro.description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamContent.members.map((member) => (
            <div
              key={member.id}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#083d59]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-[#a3b18a] flex items-center justify-center text-white transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-[#a3b18a] flex items-center justify-center text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#083d59] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#a3b18a] font-medium text-sm uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
