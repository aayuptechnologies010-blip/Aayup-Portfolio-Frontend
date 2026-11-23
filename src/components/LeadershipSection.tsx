"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, Loader2, Users, Sparkles } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  badge?: string;
  avatar: string;
  type?: string;
}

export default function LeadershipSection() {
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch(`${API_BASE_URL}/team`);
        if (res.ok) {
          const json = await res.json();
          const data: TeamMember[] = json?.data || [];
          if (Array.isArray(data)) {
            setTeamList(data);
          }
        }
      } catch (err) {
        console.error("Error loading team from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  if (loading) {
    return (
      <section id="team" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-[#1769AA] mx-auto mb-3" />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Loading Team...</p>
        </div>
      </section>
    );
  }

  if (teamList.length === 0) {
    return (
      <section id="team" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <Users className="w-12 h-12 text-[#1769AA]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0B1220]">No team members added yet</h3>
          <p className="text-slate-500 text-xs mt-1">Add team members via Admin Panel to display them here live.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            <span>EXECUTIVE LEADERSHIP &amp; ENGINEERING MINDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight text-left">
            Meet The Minds Shaping <span className="text-[#1769AA]">Innovation</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg text-left">
            Dedicated leaders and engineering talent delivering high-impact digital solutions and scalable software systems.
          </p>
        </div>

        {/* Big Zig-Zag Cards for Team Members */}
        <div className="space-y-16 sm:space-y-20">
          {teamList.map((member, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={member._id || index}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F8FBFE] p-8 sm:p-12 lg:p-14 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow text-left ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo Column - Big Card Image */}
                <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 group">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-50">
                        <Users className="w-16 h-16 opacity-30" />
                        <span className="text-sm font-semibold">No Picture</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Column - Big Clean Typography: Badge, Role, Name */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-center text-left ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Badge */}
                  {member.badge ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1769AA] text-white text-xs sm:text-sm font-bold uppercase tracking-wider w-fit shadow-sm mb-5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{member.badge}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E3EEF8] text-[#1769AA] text-xs sm:text-sm font-bold uppercase tracking-wider w-fit mb-5">
                      <span>Team Member</span>
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight text-left">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-lg sm:text-2xl font-bold text-[#1769AA] mt-3 text-left">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
