"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export interface Testimonial {
  _id?: string;
  clientName: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  projectDelivered: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials`);
        if (res.ok) {
          const json = await res.json();
          const data: Testimonial[] = json?.data || [];
          if (Array.isArray(data)) {
            setTestimonials(data);
          }
        }
      } catch (err) {
        console.error("Error loading testimonials from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="clients" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#1769AA] mx-auto mb-3" />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Loading Testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="clients" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <MessageSquare className="w-12 h-12 text-[#1769AA]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0B1220]">No testimonials yet</h3>
          <p className="text-slate-500 text-xs mt-1">Add client feedback in the Admin Panel to display it here live.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header Left-Aligned with Logo */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1769AA]">
            Social Proof &amp; Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2 text-left">
            Client Experience &amp; Testimonials
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 text-left">
            What founders, CTOs, and product directors say about working directly with Aayup Technologies.
          </p>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={t._id || idx}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between relative text-left"
            >
              <Quote className="w-8 h-8 text-[#1769AA]/15 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-500">{t.rating || 5}.0 / 5.0 Rating</span>
                </div>

                <p className="text-slate-700 text-base italic leading-relaxed pr-4 text-left">
                  &quot;{t.feedback}&quot;
                </p>

                {t.projectDelivered && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EEF8] text-xs font-semibold text-[#1769AA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
                    Delivered: {t.projectDelivered}
                  </div>
                )}
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 text-left">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-200 shrink-0">
                  {t.avatar ? (
                    <Image src={t.avatar} alt={t.clientName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                      {t.clientName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold text-[#0B1220] text-left">{t.clientName}</h4>
                  <p className="text-xs font-semibold text-[#1769AA] text-left">{t.role}</p>
                  <p className="text-xs text-slate-500 text-left">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
