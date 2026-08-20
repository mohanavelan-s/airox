/**
 * AIROX 2026 - Department Overview Section
 * Innovation Hub theme: Dark matte cards, monospaced metadata,
 * warm ember accents, and architectural layout.
 */

import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { CheckCircle } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/initialData';

export const DepartmentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission'>('vision');

  return (
    <section id="department" className="py-24 bg-transparent text-gray-200 relative border-t border-white/10">
      <Container>
        <div className="space-y-12">
          
          {/* Header */}
          <SectionHeader
            badgeText="Academic Foundation"
            title="Dept of Artificial Intelligence & Data Science"
            ghostWatermark="ACADEMICS"
            description={`Established in ${COLLEGE_INFO.department.establishedYear} at ${COLLEGE_INFO.name} (${COLLEGE_INFO.autonomyStatus}), Trichy.`}
          />

          {/* Core Info Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono uppercase">
            <Card variant="matte" padding="sm" className="space-y-1 text-center border-white/10 bg-[#151821] rounded-xl shadow-md">
              <span className="text-[10px] text-gray-400 block">Programme Offered</span>
              <span className="text-sm font-bold text-white block">{COLLEGE_INFO.department.programme}</span>
            </Card>

            <Card variant="matte" padding="sm" className="space-y-1 text-center border-white/10 bg-[#151821] rounded-xl shadow-md">
              <span className="text-[10px] text-gray-400 block">Faculty Strength</span>
              <span className="text-sm font-bold text-[#f09650] block">{COLLEGE_INFO.department.facultyCount}</span>
            </Card>

            <Card variant="matte" padding="sm" className="space-y-1 text-center border-white/10 bg-[#151821] rounded-xl shadow-md">
              <span className="text-[10px] text-gray-400 block">Established</span>
              <span className="text-sm font-bold text-white block">{COLLEGE_INFO.department.establishedYear}</span>
            </Card>

            <Card variant="matte" padding="sm" className="space-y-1 text-center border-white/10 bg-[#151821] rounded-xl shadow-md">
              <span className="text-[10px] text-gray-400 block">Institution Group</span>
              <span className="text-sm font-bold text-white/90 block">Sowdambikaa Group</span>
            </Card>
          </div>

          {/* Department Overview & Interactive Vision/Mission Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Overview Text */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Engineering Intelligent Solutions for Tomorrow
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {COLLEGE_INFO.department.overview}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                The department places strong emphasis on practical computational learning, algorithmic design, machine learning pipelines, deep learning frameworks, and ethics in AI deployment.
              </p>

              {/* Highlights List */}
              <div className="pt-2 space-y-2 font-mono uppercase">
                <span className="text-xs font-semibold text-[#f09650] tracking-wider block">
                  Department Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {COLLEGE_INFO.department.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-[#151821] border border-white/10 rounded-xl p-3 shadow-md">
                      <CheckCircle className="w-4 h-4 text-[#f09650] shrink-0" />
                      <span className="text-gray-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Vision / Mission Selector */}
            <div className="lg:col-span-5 bg-[#151821] border border-white/10 rounded-2xl p-6 space-y-4 font-mono uppercase shadow-xl">
              
              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'vision'
                      ? 'bg-[#e07a38] text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Vision
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'mission'
                      ? 'bg-[#e07a38] text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Mission
                </button>
              </div>

              {/* Tab Content */}
              <div className="pt-2">
                {activeTab === 'vision' && (
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#f09650] font-bold block">Department Vision</span>
                    <p className="text-xs text-gray-200 leading-relaxed font-sans italic border-l-2 border-[#e07a38] pl-3 py-1 normal-case">
                      "{COLLEGE_INFO.department.vision}"
                    </p>
                  </div>
                )}

                {activeTab === 'mission' && (
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#f09650] font-bold block">Department Mission</span>
                    <ul className="space-y-2 text-xs text-gray-200 font-sans normal-case">
                      {COLLEGE_INFO.department.mission.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#f09650] font-mono font-bold">{idx + 1}.</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

