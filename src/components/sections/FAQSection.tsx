/**
 * AIROX 2026 - FAQ Section
 * Innovation Hub theme: Accordion-based FAQ with dark matte cards,
 * monospaced indicators, warm amber focus details, and refined typography.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/initialData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-transparent text-gray-200 relative border-t border-white/10 bg-blueprint-grid">
      <Container>
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Header */}
          <SectionHeader
            badgeText="Questions"
            title="Frequently Asked Questions"
            ghostWatermark="FAQ"
            description="Find instant answers regarding event logistics, registration fees, eligibility, and participation certificates."
            align="center"
          />

          {/* Accordion List */}
          <div className="space-y-3 font-mono">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <Card
                  key={faq.id}
                  variant="matte"
                  padding="none"
                  className="bg-[#151821] border-white/10 overflow-hidden rounded-xl shadow-md transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a38]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-[#f09650] shrink-0" />
                      <span className="text-sm font-semibold text-white font-sans">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#f09650]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans border-t border-white/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
};


