'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getHomeContent } from '@/lib/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const homeContent = getHomeContent();
  const slides = homeContent.hero.slides;

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {mounted && (
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#083d59]/80 via-[#083d59]/50 to-transparent"></div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      )}

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#083d59]/30 to-transparent pointer-events-none"></div>
      <Image
        src="/assets/img/shape/leaf-h2.png"
        alt=""
        width={400}
        height={400}
        className="absolute left-0 top-1/4 opacity-5 pointer-events-none"
      />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-5/12 mb-8 lg:mb-0">
            {mounted && slides[currentSlide] && (
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="flex gap-3 mb-6 flex-wrap">
                  {slides[currentSlide].tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[#c9a96e] text-xs uppercase tracking-[3px] border border-[#c9a96e]/50 px-5 py-2 inline-block backdrop-blur-sm bg-white/5 hover:bg-[#c9a96e] hover:text-white transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Content - Title */}
          <div className="lg:w-7/12 text-right">
            {mounted && slides[currentSlide] && (
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light text-white leading-[0.95] mb-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {slides[currentSlide].title}
                </h1>
                {slides[currentSlide].buttonText && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <Link
                      href={slides[currentSlide].buttonLink}
                      className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-white hover:text-[#083d59] text-white px-10 py-4 text-sm font-semibold tracking-wider transition-all duration-500 shadow-xl hover:shadow-2xl rounded-full group"
                    >
                      {slides[currentSlide].buttonText}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Static fallback for SSR */}
      {!mounted && slides[0] && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[0].backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#083d59]/80 via-[#083d59]/50 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="ml-auto w-full lg:w-7/12 text-right">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light text-white leading-[0.95] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {slides[0].title}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      {mounted && (
        <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-20">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300 pointer-events-auto group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300 pointer-events-auto group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentSlide === index
                ? 'bg-[#c9a96e] w-12'
                : 'bg-white/40 w-8 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-white/60 z-20">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center mb-8">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
