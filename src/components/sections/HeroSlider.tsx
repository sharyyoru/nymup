'use client';

import React, { useState, useEffect } from 'react';
import { getHomeContent } from '@/lib/content';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const homeContent = getHomeContent();
  const slides = homeContent.hero.slides;

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#083d59]">
      {/* All Background Slides - Stacked with opacity transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ 
            opacity: mounted && currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-[#083d59]/40"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10">
        <div className="w-full text-center">
          {/* Tags */}
          <div className="flex justify-center gap-6 mb-8">
            {mounted && slides[currentSlide]?.tags.map((tag, i) => (
              <span
                key={i}
                className="text-white/70 text-[13px] tracking-[2px] relative"
              >
                {tag}
                {i < slides[currentSlide].tags.length - 1 && (
                  <span className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/30 rounded-full"></span>
                )}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] max-w-4xl mx-auto"
            style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}
          >
            {mounted ? slides[currentSlide]?.title : slides[0]?.title}
          </h1>
        </div>
      </div>

      {/* Slide Indicators */}
      {mounted && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
