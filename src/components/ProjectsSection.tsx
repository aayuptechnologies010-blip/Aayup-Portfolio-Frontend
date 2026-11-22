"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  FolderGit2, 
  ExternalLink,
  Loader2,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export interface Project {
  _id: string;
  title: string;
  category: "Web Platforms" | "Mobile Apps" | "CRM / ERP" | "AI & Automation" | "Our Products" | string;
  image: string; // Base64
  liveLink?: string;
  description?: string;
  isProduct?: boolean;
}

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE_URL}/projects?limit=50`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.data && Array.isArray(data.data)) {
            setProjectsList(data.data);
          }
        }
      } catch (err) {
        console.error("Error fetching projects from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const categories = ["All", "Our Products", "Web Platforms", "Mobile Apps", "CRM / ERP", "AI & Automation"];

  const filtered =
    activeCategory === "All"
      ? projectsList
      : activeCategory === "Our Products"
      ? projectsList.filter((p) => p.isProduct === true || p.category === "Our Products")
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header Left-Aligned with Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-left">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEF8] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>ENGINEERED WORKS &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight text-left">
              Featured Client Projects
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl text-left">
              Explore our web platforms, mobile architectures, enterprise CRMs, and intelligent automation systems.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1769AA] text-white shadow-sm"
                    : "bg-[#F3F7FA] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1769AA]" />
            <span className="text-xs font-bold uppercase tracking-wider">Loading Projects...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center bg-[#F8FBFE] rounded-2xl border border-dashed border-[#E2E8F0]">
            <FolderGit2 className="w-12 h-12 text-[#1769AA]/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B1220]">No projects found</h3>
            <p className="text-slate-500 text-xs mt-1">Add projects from the Admin Panel to display them here live.</p>
          </div>
        ) : (
          /* Projects Grid: Exactly Project Name, Category, Live Link, Thumbnail & Enquiry */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filtered.map((project, idx) => (
              <div
                key={project._id || idx}
                className="bg-[#F8FBFE] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group text-left"
              >
                {/* 1. Thumbnail (Base64) */}
                <div className="relative aspect-[16/10] bg-slate-100 border-b border-[#E2E8F0] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                      No Thumbnail
                    </div>
                  )}

                  {/* 2. Category Badge & Product Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#1769AA] text-white shadow">
                      {project.category}
                    </span>
                    {(project.isProduct || project.category === "Our Products") && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow flex items-center gap-1">
                        ★ Product
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Project Name */}
                    <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-[#1769AA] transition-colors text-left line-clamp-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Actions: Live Link + Enquiry */}
                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3 text-left">
                    {/* 3. Live Link */}
                    {project.liveLink ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] hover:underline"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Internal Work</span>
                    )}

                    {/* 4. Enquiry CTA */}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire Now</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
