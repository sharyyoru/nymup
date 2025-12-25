'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
    <section className="relative h-screen overflow-hidden">
      {mounted && (
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                  >
                    <div className="absolute inset-0 bg-[#1a1a2e]/50"></div>
                  </div>
                  <Image
                    src="/assets/img/shape/leaf-h2.png"
                    alt="Shape"
                    width={300}
                    height={300}
                    className="absolute left-0 top-1/4 opacity-10"
                  />
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="ml-auto w-full lg:w-7/12 text-right">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        <ul className="flex gap-3 mb-5 justify-end">
                          {slide.tags.map((tag, i) => (
                            <li key={i}>
                              <span className="text-[#c9a96e] text-xs uppercase tracking-[2px] border border-[#c9a96e]/40 px-4 py-1.5 inline-block">
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-none mb-8 italic font-serif">
                          {slide.title}
                        </h1>
                        {slide.buttonText && (
                          <Link
                            href={slide.buttonLink}
                            className="inline-block bg-[#c9a96e] hover:bg-[#b8986d] text-white px-8 py-3.5 text-sm transition-colors font-medium"
                          >
                            {slide.buttonText}
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      )}

      {/* Static fallback for SSR */}
      {!mounted && slides[0] && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[0].backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-[#1a1a2e]/50"></div>
          </div>
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="ml-auto w-full lg:w-7/12 text-right">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-none mb-8 italic font-serif">
                {slides[0].title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-[#c9a96e] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
