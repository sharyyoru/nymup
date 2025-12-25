'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getPagesContent } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-200 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={contact.image}
                alt="Contact"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="mb-8">
                <h6 className="text-[#c9a96e] text-sm uppercase tracking-wider mb-3">
                  {contact.semiTitle}
                </h6>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
                  {contact.title}
                </h2>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Thank you for your message!
                  </h3>
                  <p className="text-green-600">
                    We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="h-14 border-gray-300 focus:border-[#c9a96e] focus:ring-[#c9a96e]"
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-14 border-gray-300 focus:border-[#c9a96e] focus:ring-[#c9a96e]"
                    />
                  </div>
                  <Textarea
                    placeholder="Enter message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="border-gray-300 focus:border-[#c9a96e] focus:ring-[#c9a96e]"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white px-8 py-6 text-lg"
                  >
                    {isSubmitting ? 'Sending...' : contact.form.submitText}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
