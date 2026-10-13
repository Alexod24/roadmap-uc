'use client';

import React from 'react';
import { EvaluationMilestone } from '@/types/roadmap';
import { Award, Calendar, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MilestoneTimelineProps {
  milestones: EvaluationMilestone[];
  selectedMilestone: string | null;
  onSelectMilestone: (code: string | null) => void;
  completedNodesCount: number;
  totalNodesCount: number;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  selectedMilestone,
  onSelectMilestone,
  completedNodesCount,
  totalNodesCount
}) => {
  const progressPercent = totalNodesCount > 0 ? Math.round((completedNodesCount / totalNodesCount) * 100) : 0;

  return (
    <section className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Formula and status */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1.5 bg-blue-600/20 text-blue-400 rounded-md border border-blue-500/30 text-xs font-semibold">
                UC Ingeniería
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                Fórmula de Aprobación
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-100 mt-1 font-mono tracking-wide">
              PF = C1(20%) + EP(25%) + C2(20%) + EF(35%)
            </p>
          </div>

          {/* Overall Action Progress */}
          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700/60 shadow-inner">
            <div className="text-right">
              <div className="text-xs text-slate-400">Progreso de Retos</div>
              <div className="text-sm font-bold text-emerald-400">
                {completedNodesCount} / {totalNodesCount} Dominados ({progressPercent}%)
              </div>
            </div>
            <div className="w-24 bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80">
          {milestones.map((m) => {
            const isSelected = selectedMilestone === m.code;
            return (
              <button
                key={m.code}
                onClick={() => onSelectMilestone(isSelected ? null : m.code)}
                className={cn(
                  "flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer relative group",
                  isSelected
                    ? "bg-blue-950/60 border-blue-500 shadow-md shadow-blue-900/30 ring-1 ring-blue-500"
                    : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded",
                    m.code === 'EF' ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                    m.code === 'EP' ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" :
                    "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  )}>
                    {m.code}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-500" /> Sem {m.week}
                  </span>
                </div>
                <div className="mt-1 font-medium text-slate-200 text-xs sm:text-sm truncate">
                  {m.name}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-0.5 text-emerald-400 font-semibold font-mono">
                    <Percent className="w-3 h-3" /> {m.weight_percentage}%
                  </span>
                  <span className="text-[11px] text-slate-500 group-hover:text-blue-400 transition-colors">
                    {isSelected ? 'Filtro Activo ✓' : 'Filtrar'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
