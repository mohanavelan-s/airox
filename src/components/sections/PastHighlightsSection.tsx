/**
 * AIROX 2026 - AIROX 2024 Highlights & Gallery Section
 * Retrospective metrics on dark matte canvas, warm ember accents, and architectural gallery frames.
 */

import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Container } from '../ui/Container';
import { BlurImage } from '../ui/BlurImage';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Users, Award, Trophy, Image, Sparkles } from 'lucide-react';

export const PastHighlightsSection: React.FC = () => {
  const stats = [
    { label: 'Participants Registered', value: '500+', icon: <Users className="w-5 h-5 text-[#f09650]" /> },
    { label: 'Institutions Represented', value: '20+', icon: <Trophy className="w-5 h-5 text-[#f09650]" /> },
    { label: 'Technical & Non-Tech Events', value: '9', icon: <Sparkles className="w-5 h-5 text-gray-300" /> },
    { label: 'Verified Certificates', value: '100%', icon: <Award className="w-5 h-5 text-gray-300" /> },
  ];

  const galleryItems = [
    { id: '1', title: "Paper Presentation Sessions", tag: 'Technical', img: 'https://drive.google.com/thumbnail?id=1v_AVegfO9TNmmxUiz1ldMhAgtDHZMH69&sz=w1000' },
    { id: '2', title: 'FinalHire Recruitment Drive', tag: 'Technical', img: 'https://drive.google.com/thumbnail?id=1sKS60kYePvXov2AAzO6Tf8vBDUQnFyNN&sz=w1000' },
    { id: '3', title: 'Zero Hour Speed Coding', tag: 'Technical', img: 'https://drive.google.com/thumbnail?id=1WRxCgumHAoMvedO_iCHvJFWH4RTud94P&sz=w1000' },
    { id: '5', title: 'Ad Battle Marketing Stage', tag: 'Non-Technical', img: 'https://drive.google.com/thumbnail?id=1B6XzdJvHDgLV33_Kk23orHecfYrU9uHF&sz=w1000' },
    { id: '6', title: 'Goated or Ghosted Talent Arena', tag: 'Non-Technical', img: 'https://drive.google.com/thumbnail?id=1l4fXBuhFOIDsnGYo3koBwJwOLsrUiOem&sz=w1000' },
    { id: '7', title: 'Mind Mesh Challenge', tag: 'Technical', img: 'https://drive.google.com/thumbnail?id=1611dwZLxfJ5ORE-G_kSec3ruv6ivaJ_w&sz=w1000' },
    { id: '8', title: 'Box Cricket Championship', tag: 'Non-Technical', img: 'https://drive.google.com/thumbnail?id=1uPeYfy0JJXoCcaqblQIp7jrQ5qqz0li7&sz=w1000' },
    { id: '9', title: 'Esports (Free Fire MAX & Stumble Guys)', tag: 'Non-Technical', img: 'https://drive.google.com/thumbnail?id=1WW9XLtytYgHAjH_Vyjjvs-zqx03YwBbT&sz=w1000' },
  ];

  return (
    <section id="highlights" className="py-24 bg-transparent text-gray-200 relative border-t border-white/10 bg-blueprint-grid">
      <Container>
        <div className="space-y-12">
          
          {/* Header */}
          <SectionHeader
            badgeText="History"
            title="AIROX 2024 Retrospective"
            ghostWatermark="RETRO"
            description="Reflecting on the milestone impact of AIROX 2024, which brought together over 500+ participants across 20+ engineering colleges."
          />

          {/* Past Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono uppercase">
            {stats.map((s) => (
              <Card key={s.label} variant="matte" padding="md" className="bg-[#151821] border-white/10 space-y-3 text-center rounded-xl shadow-lg">
                <div className="p-3 bg-[#090a0d] border border-white/10 rounded-xl w-fit mx-auto">
                  {s.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-white font-display block tracking-wide">
                  {s.value}
                </span>
                <span className="text-xs text-gray-400 block font-mono">
                  {s.label}
                </span>
              </Card>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="space-y-4 font-mono uppercase">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-[#f09650]" />
                <h3 className="text-sm font-bold text-white tracking-wider">
                  Event Gallery Archives
                </h3>
              </div>
              <Badge variant="onyx" size="sm">Archives</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="group relative border border-white/10 bg-[#151821] rounded-xl overflow-hidden hover:border-white/30 hover:scale-[1.02] transition-all duration-300 shadow-md">
                  <BlurImage
                    src={item.img}
                    alt={`AIROX 2024 Highlight ${item.id}`}
                    aspectRatio="video"
                    fallbackText={`AIROX 2024 Photo ${item.id}`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};


