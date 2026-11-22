"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Clock, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  FolderGit2, 
  Sparkles,
  ArrowRight,
  Loader2
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export interface Project {
  _id: string;
  id?: string;
  title: string;
  tagline: string;
  category: "Web Platforms" | "Mobile Apps" | "CRM / ERP" | "AI & Automation" | string;
  image: string;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  metrics: string;
  duration: string;
}

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

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

  const categories = ["All", "Web Platforms", "Mobile Apps", "CRM / ERP", "AI & Automation"];

  const filtered =
    activeCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEF8] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>ENGINEERED WORKS &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Featured Client Case Studies
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              In-depth view of enterprise platforms, mobile architectures, and automated pipelines designed and deployed by our team.
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
            <span className="text-xs font-bold uppercase tracking-wider">Loading Live Projects...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center bg-[#F8FBFE] rounded-2xl border border-dashed border-[#E2E8F0]">
            <FolderGit2 className="w-12 h-12 text-[#1769AA]/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B1220]">No projects found</h3>
            <p className="text-slate-500 text-xs mt-1">Add case studies from the Admin Panel to display them here live.</p>
          </div>
        ) : (
          /* Portfolio Cards Grid */
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((project, idx) => (
              <div
                key={project._id || project.id || idx}
                className="bg-[#F8FBFE] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] bg-slate-100 border-b border-[#E2E8F0] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      No Preview Available
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#1769AA] text-white shadow">
                      {project.category}
                    </span>
                    {project.duration && (
                      <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-slate-800 shadow flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#1769AA]" />
                        {project.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1769AA]">
                        Case Study 0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Shipped
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#0B1220] mt-3 group-hover:text-[#1769AA] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#1769AA] text-sm font-semibold mt-1">
                      {project.tagline}
                    </p>
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics Banner */}
                    {project.metrics && (
                      <div className="mt-4 p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center gap-2 text-xs font-bold text-slate-900 shadow-sm">
                        <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Impact: {project.metrics}</span>
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded bg-[#E3EEF8] text-[#1769AA] text-xs font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA] hover:text-[#0D4F85] transition-colors cursor-pointer group/btn"
                    >
                      <span>Explore Technical Deep-Dive</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Deep-Dive */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA] bg-[#E3EEF8] px-2.5 py-1 rounded">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-2xl font-black text-[#0B1220] mt-2">
                    {activeModalProject.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#1769AA]">
                    {activeModalProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {activeModalProject.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                  <Image
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-sm text-slate-700">
                {activeModalProject.problem && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                    <h4 className="font-bold text-rose-950 mb-1">Challenge &amp; Bottleneck</h4>
                    <p className="text-rose-900 leading-relaxed text-xs sm:text-sm">
                      {activeModalProject.problem}
                    </p>
                  </div>
                )}

                {activeModalProject.solution && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <h4 className="font-bold text-emerald-950 mb-1">Architecture Solution</h4>
                    <p className="text-emerald-900 leading-relaxed text-xs sm:text-sm">
                      {activeModalProject.solution}
                    </p>
                  </div>
                )}

                {activeModalProject.keyFeatures && activeModalProject.keyFeatures.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[#0B1220] mb-2">Key Engineering Features</h4>
                    <ul className="space-y-2">
                      {activeModalProject.keyFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
