/**
 * AIROX 2026 - Optional Content Placeholders Section
 * Innovation Hub theme: Modular expansion placeholders with dark matte cards,
 * monospaced metadata, warm ember accents, and subtle dashed borders.
 */

import React from 'react';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Clock } from 'lucide-react';
import { OPTIONAL_SECTION_PLACEHOLDERS } from '../../data/initialData';

export const OptionalPlaceholdersSection: React.FC = () => {
  return (
    <section id="placeholders" className="py-16 bg-transparent text-gray-200 relative border-t border-white/10 bg-blueprint-grid">
      <Container>
        <div className="space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono uppercase">
            <div>
              <span className="text-[11px] text-[#f09650] font-semibold block">
                Future Integration Modules
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-1 tracking-wide">
                Institutional Portals & Downloads
              </h3>
            </div>
            <Badge variant="onyx" size="sm">
              Modular Expansion Ready
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono uppercase">
            {OPTIONAL_SECTION_PLACEHOLDERS.map((placeholder) => (
              <Card
                key={placeholder.id}
                variant="matte"
                padding="sm"
                className="bg-[#151821] space-y-2 border-dashed border-white/15 rounded-xl shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    {placeholder.category}
                  </span>
                  <span className="text-[10px] text-[#f09650] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Awaited
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">
                  {placeholder.title}
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-sans normal-case">
                  {placeholder.description}
                </p>
              </Card>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};


