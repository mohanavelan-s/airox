/**
 * AIROX 2026 - Organizing Committee Section (Final Section)
 * Structured strictly according to Reference Picture 1:
 * Clean 4-column grid of crisp portrait photo cards with bold centered names & designation subtitles.
 */

import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Mail, Phone, Code2, ShieldCheck, User, Linkedin, ArrowUpRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/initialData';

export const TeamSection: React.FC = () => {
  const facultyMembers = TEAM_MEMBERS.slice(0, 4);
  const studentMembers = TEAM_MEMBERS.slice(4);

  const renderCard = (member: typeof TEAM_MEMBERS[0]) => (
    <div
      key={member.id}
      className="group flex flex-col items-center text-center bg-black/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300 hover:-translate-y-1.5 border border-white/10 hover:border-cyan-500/40 h-full w-full"
    >
      {/* Crisp Square/Portrait Photo Frame with Dark Margin */}
      <div className="w-full aspect-[4/5] bg-black/40 rounded-xl overflow-hidden relative mb-4 border border-white/10 shadow-inner">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const currentSrc = target.src;
              if (currentSrc.includes('thumbnail')) {
                const idMatch = currentSrc.match(/id=([^&]+)/);
                if (idMatch && idMatch[1]) {
                  target.src = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
                }
              } else if (currentSrc.includes('lh3.googleusercontent.com')) {
                const parts = currentSrc.split('/d/');
                if (parts[1]) {
                  target.src = `https://drive.google.com/uc?export=view&id=${parts[1]}`;
                }
              }
            }}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white/5 to-white/0">
            <div className="w-20 h-20 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 shadow-md">
              {member.role.includes('Digital') || member.role.includes('Developer') ? (
                <Code2 className="w-10 h-10" />
              ) : member.role.includes('Convenor') ? (
                <ShieldCheck className="w-10 h-10 text-amber-400" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
              Portrait Slot
            </span>
          </div>
        )}
      </div>

      {/* Member Designation & Name */}
      <div className="space-y-1 px-2 pb-2">
        <h3 className="text-base sm:text-lg font-black text-white font-sans tracking-tight leading-snug">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-cyan-300 font-sans">
          {member.role}
        </p>
        {member.department && (
          <p className="text-[11px] text-gray-400 font-mono pt-0.5">
            {member.department}
          </p>
        )}
      </div>

      {/* Contact & Social Links */}
      {((member.contact && (member.contact.email || member.contact.phone)) || member.socials?.linkedin) && (
        <div className="pt-3 mt-auto border-t border-white/10 w-full flex flex-col items-center justify-center gap-1.5 text-xs text-gray-300 font-mono">
          {member.contact?.email && (
            <div className="flex items-center gap-1.5 max-w-full">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <a href={`mailto:${member.contact.email}`} className="hover:text-cyan-300 transition-colors truncate">
                {member.contact.email}
              </a>
            </div>
          )}
          {member.contact?.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <a href={`tel:${member.contact.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-300 transition-colors">
                {member.contact.phone}
              </a>
            </div>
          )}
          {member.socials?.linkedin && (
            <div className="pt-1 flex items-center justify-center">
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/li inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 hover:border-[#0A66C2] transition-all duration-300 shadow-[0_0_12px_rgba(10,102,194,0.2)] hover:shadow-[0_0_18px_rgba(10,102,194,0.4)] cursor-pointer"
              >
                <div className="w-4 h-4 rounded-sm bg-[#0A66C2] flex items-center justify-center text-white shrink-0 shadow-sm group-hover/li:scale-105 transition-transform">
                  <Linkedin className="w-3 h-3 fill-white text-[#0A66C2]" />
                </div>
                <span className="text-[11px] font-sans font-semibold text-cyan-200 group-hover/li:text-white transition-colors">
                  LinkedIn Profile
                </span>
                <ArrowUpRight className="w-3 h-3 text-cyan-400/70 group-hover/li:text-cyan-200 group-hover/li:translate-x-0.5 group-hover/li:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section id="team" className="py-24 sm:py-32 bg-transparent text-gray-100 relative overflow-hidden border-t border-white/10 font-sans">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div className="space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <SectionHeader
              badgeText="Leadership & Faculty Mentors"
              title="Organizing Committee"
              ghostWatermark="LEADERS"
              description="Dedicated faculty mentors, department leadership, and student coordinators steering AIROX 2026."
              align="center"
            />
          </div>

          {/* TOP ROW: 4 FACULTY MEMBERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4">
            {facultyMembers.map(renderCard)}
          </div>

          {/* BOTTOM ROW: 3 STUDENT LEADS CENTERED */}
          {studentMembers.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
              {studentMembers.map((member) => (
                <div key={member.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.875rem)] min-w-[260px] max-w-[320px]">
                  {renderCard(member)}
                </div>
              ))}
            </div>
          )}

        </div>
      </Container>
    </section>
  );
};
