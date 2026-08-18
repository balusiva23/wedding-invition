import React, { useState, useEffect } from 'react';
import { KolamDivider } from '../common/KolamDivider';
import { StoryMilestone } from '../../types/wedding';
import { Sparkles, Heart } from 'lucide-react';
import { languageService } from '../../services/languageService';

export const StoryTimelineSection: React.FC<{ milestones: StoryMilestone[] }> = ({
  milestones,
}) => {
  const [, setLangState] = useState(languageService.getLanguage());

  useEffect(() => {
    const unsub = languageService.subscribe((l) => setLangState(l));
    return () => unsub();
  }, []);

  const t = languageService.t();

  const activeMilestones = milestones
    .filter((m) => m.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="story" className="relative py-24 px-4 bg-[#180509] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-amber-400 mb-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] font-semibold">
              {t.story.title}
            </span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
            {t.story.title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/70 max-w-md mx-auto font-light leading-relaxed">
            {t.story.subtitle}
          </p>

          <KolamDivider className="my-6" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Center Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400/10 via-amber-400/60 to-amber-400/10 -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {activeMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#200408] border-2 border-amber-400 shadow-[0_0_12px_rgba(212,175,55,0.6)] z-10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  {/* Story Card */}
                  <div
                    className={`w-full pl-12 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pl-10' : 'md:pr-10'
                    }`}
                  >
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-maroon-900/40 via-maroon-950/70 to-black/80 border border-amber-500/30 shadow-2xl hover:border-amber-400/60 transition-all group">
                      {/* Milestone Image if available */}
                      {milestone.image && (
                        <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-5 border border-amber-500/20">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider shadow">
                            {milestone.year}
                          </span>
                        </div>
                      )}

                      {!milestone.image && (
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-serif text-xs uppercase tracking-wider mb-3">
                          {milestone.year}
                        </span>
                      )}

                      <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                        {milestone.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-amber-100/80 font-light leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

