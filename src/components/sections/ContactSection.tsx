/**
 * AIROX 2026 - Contact & Venue Location Section
 * Innovation Hub theme: Dark matte panels, warm ember accents, and architectural venue map.
 */

import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { MapPin, Mail, Phone, ExternalLink, Bus, ShieldCheck } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/initialData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-transparent text-gray-200 relative border-t border-white/10">
      <Container>
        <div className="space-y-12">
          
          {/* Header */}
          <SectionHeader
            badgeText="Contact & Venue"
            title="Reach the AIROX Desk"
            ghostWatermark="LOCATION"
            description="Get in touch with our department coordinators or find venue directions to JJ College of Engineering and Technology, Trichy."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono uppercase">
            
            {/* Contact Cards Grid */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Venue Address */}
              <Card variant="matte" padding="md" className="space-y-2 border-white/10 bg-[#151821] rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-[#f09650] text-xs font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Symposium Venue</span>
                </div>
                <h4 className="text-base font-bold text-white font-sans normal-case">
                  Main Auditorium
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans normal-case">
                  {COLLEGE_INFO.name} ({COLLEGE_INFO.autonomyStatus})
                  <br />
                  Ammapettai, Poolangulathupatti (PO)
                  <br />
                  Trichy - 620 009, Tamil Nadu, India
                </p>
              </Card>

              {/* Department Contact Options */}
              <Card variant="matte" padding="md" className="space-y-3 border-white/10 bg-[#151821] rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-[#f09650] text-xs font-semibold">
                  <Mail className="w-4 h-4" />
                  <span>Email Inquiries</span>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <a href="mailto:airoxteam.jjcet@gmail.com" className="hover:text-[#f09650] transition-colors block">
                    airoxteam.jjcet@gmail.com
                  </a>
                </div>
              </Card>

              {/* Helpline Numbers */}
              <Card variant="matte" padding="md" className="space-y-3 border-white/10 bg-[#151821] rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-[#f09650] text-xs font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>Student Helplines</span>
                </div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex items-center justify-between border-b border-white/5 py-2">
                    <span className="text-gray-400 font-mono">Student Desk 1:</span>
                    <a href="tel:+916369461227" className="font-mono font-semibold text-white hover:text-[#f09650] transition-colors">
                      +91 63694 61227
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400 font-mono">Student Desk 2:</span>
                    <a href="tel:+919150313122" className="font-mono font-semibold text-white hover:text-[#f09650] transition-colors">
                      +91 91503 13122
                    </a>
                  </div>
                </div>
              </Card>

              {/* Bus Routes Info */}
              <Card variant="matte" padding="md" className="space-y-2 bg-[#151821] border-white/10 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <Bus className="w-4 h-4 text-[#f09650]" />
                  <span>Transportation Note</span>
                </div>
                <p className="text-xs text-gray-400 font-sans normal-case leading-relaxed">
                  College buses operate on 22 August 2026 morning from Central Bus Stand, Chathiram Bus Stand, and Junction.
                </p>
              </Card>

            </div>

            {/* Interactive Location Map Box */}
            <div className="lg:col-span-7 bg-[#151821] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs text-white">
                  <ShieldCheck className="w-4 h-4 text-[#f09650]" />
                  <span>JJ College of Engineering & Tech, Trichy</span>
                </div>
                <a
                  href="https://maps.google.com/?q=J.J.+College+of+Engineering+and+Technology,+Ammapettai,+Poolangulathupatti,+Tiruchirappalli,+Tamil+Nadu+620009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#f09650] hover:underline flex items-center gap-1 transition-colors font-bold"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Google Maps Visual Embed Frame */}
              <div className="w-full h-80 border border-white/10 rounded-xl overflow-hidden relative bg-[#090a0d]">
                <iframe
                  title="JJ College Location Map"
                  src="https://maps.google.com/maps?q=J.J.+College+of+Engineering+and+Technology,+Ammapettai,+Poolangulathupatti,+Tiruchirappalli,+Tamil+Nadu+620009&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

