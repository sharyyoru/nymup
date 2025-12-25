'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { getPagesContent } from '@/lib/content';

export default function ContactForm() {
  const pagesContent = getPagesContent();
  const contact = pagesContent.contact;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch {
      setError('Failed to send message. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-[450px] lg:h-[600px] overflow-hidden">
            <Image
              src={contact.image}
              alt="Contact"
              fill
              className="object-cover"
            />
          </div>

          {/* Form */}
          <div>
            <div className="mb-10">
              <span className="text-[#a3b18a] text-sm font-bold uppercase tracking-[3px] mb-4 block">
                {contact.semiTitle}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#083d59] leading-tight">
                {contact.title}
              </h2>
            </div>

            {submitted ? (
              <div className="bg-[#a3b18a]/10 border-2 border-[#a3b18a] p-10 text-center">
                <CheckCircle className="w-16 h-16 text-[#a3b18a] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#083d59] mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-4 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="w-full h-14 pl-12 pr-4 border border-gray-200 bg-white text-[#083d59] placeholder-gray-400 focus:border-[#a3b18a] focus:ring-2 focus:ring-[#a3b18a]/20 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full h-14 pl-12 pr-4 border border-gray-200 bg-white text-[#083d59] placeholder-gray-400 focus:border-[#a3b18a] focus:ring-2 focus:ring-[#a3b18a]/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    placeholder="Enter message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-white text-[#083d59] placeholder-gray-400 focus:border-[#a3b18a] focus:ring-2 focus:ring-[#a3b18a]/20 outline-none transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 bg-[#a3b18a] hover:bg-[#8a9a73] disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 group"
                >
                  {isSubmitting ? 'Sending...' : 'Send us a Message'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
