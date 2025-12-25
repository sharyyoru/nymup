'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

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
          <div className="flex justify-center gap-8 mb-10">
            {mounted && slides[currentSlide]?.tags.map((tag, i) => (
              <span
                key={i}
                className="text-white/80 text-[18px] tracking-[3px] relative"
              >
                {tag}
                {i < slides[currentSlide].tags.length - 1 && (
                  <span className="absolute -right-5 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full"></span>
                )}
              </span>
            ))}
          </div>

          {/* Title - 3x bigger */}
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl xl:text-[140px] font-bold text-white leading-[1.05] max-w-6xl mx-auto"
            style={{ fontFamily: "'GT Walsheim Pro', sans-serif" }}
          >
            {mounted ? slides[currentSlide]?.title : slides[0]?.title}
          </h1>
        </div>
      </div>

      {/* Slide Indicators */}
      {mounted && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white w-10'
                  : 'bg-white/40 w-3 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Animated Go Down Button */}
      {mounted && (
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white hover:text-white/80 transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-sm uppercase tracking-[3px] font-medium mb-1">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-[subtle-bounce_2s_ease-in-out_infinite]" />
        </button>
      )}

      <style jsx>{`
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
