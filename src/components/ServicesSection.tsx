"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  Palette,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Layers
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  Bot,
  Palette,
  Cloud,
};

export interface Service {
  _id?: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  highlight?: string;
  deliverables?: string[];
  techTags?: string[];
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        if (res.ok) {
          const json = await res.json();
          const data: Service[] = json?.data || [];
          if (Array.isArray(data)) {
            setServices(data);
          }
        }
      } catch (err) {
        console.error("Error loading services from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#1769AA] mx-auto mb-3" />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Loading Services...</p>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
          <Layers className="w-12 h-12 text-[#1769AA]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0B1220]">No services added yet</h3>
          <p className="text-slate-500 text-xs mt-1">Add capabilities and services in the Admin Panel to display them here live.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-[#F3F7FA] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header Left-Aligned with Logo */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1769AA]">
            Capabilities &amp; Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2 text-left">
            Our Software Development Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 text-left">
            We deliver end-to-end digital engineering services that empower modern enterprises to scale, automate, and lead in their markets.
          </p>
        </div>

        {/* Dynamic Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Globe;

            return (
              <div
                key={service._id || idx}
                className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group text-left"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#E3EEF8] flex items-center justify-center text-[#1769AA] mb-6 group-hover:bg-[#1769AA] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1220] mb-2 text-left">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-left">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-left">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 text-left">
                          <CheckCircle2 className="w-4 h-4 text-[#1769AA] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Tags & Highlights Footer */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-left">
                  {service.techTags && service.techTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3 text-left">
                      {service.techTags.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-[#F3F7FA] text-slate-700 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {service.highlight && (
                    <div className="text-xs font-bold text-[#1769AA] flex items-center gap-1.5 text-left">
                      <span className="w-2 h-2 rounded-full bg-[#1769AA]" />
                      <span>{service.highlight}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
