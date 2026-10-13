'use client';

import React from 'react';
import { EvaluationMilestone } from '@/types/roadmap';
import { Download, Share2, Bookmark } from 'lucide-react';

interface RoadmapTopNavProps {
  milestones: EvaluationMilestone[];
  selectedMilestone: string | null;
  onSelectMilestone: (code: string | null) => void;
  onOpenMilestoneDrawer?: (milestone: EvaluationMilestone) => void;
  completedCount: number;
  totalCount: number;
}

export const RoadmapTopNav: React.FC<RoadmapTopNavProps> = ({
  milestones,
  selectedMilestone,
  onSelectMilestone,
  onOpenMilestoneDrawer,
  completedCount,
  totalCount,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full bg-white border-b border-zinc-200">
      {/* Top action bar (like roadmap.sh top bar) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <a
          href="#"
          className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1.5"
        >
          ← Todos los Roadmaps
        </a>

        <div className="flex items-center gap-2">
          <button
            title="Guardar Roadmap"
            className="p-2 text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-[#ffe500] hover:bg-[#fed700] text-zinc-900 font-bold px-3 py-1.5 rounded-lg border border-zinc-800 text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Guía</span>
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Enlace copiado al portapapeles');
              }
            }}
            className="p-2 bg-[#ffe500] hover:bg-[#fed700] text-zinc-900 border border-zinc-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
          Matemática Discreta 2
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base mt-2 font-medium">
          Guía paso a paso y de supervivencia para dominar las evaluaciones de la Universidad Continental (2026).
        </p>

        {/* Tabs: Roadmap | Formula UC | Métricas */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-zinc-200">
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="pb-2 border-b-2 border-zinc-900 text-zinc-900 flex items-center gap-1.5">
              🗺️ Roadmap Visual
            </span>
            <span className="pb-2 text-zinc-500 font-mono text-xs hidden sm:inline-block">
              PF = C1(20%) + EP(25%) + C2(20%) + EF(35%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-zinc-600 font-medium">
              Progreso: <strong className="text-zinc-900 font-bold">{completedCount}/{totalCount}</strong> ({percent}%)
            </div>
            <div className="w-24 bg-zinc-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Fast Filter & Resource Drawer Trigger Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-zinc-100">
          <span className="text-xs text-zinc-500 font-semibold mr-1">
            Hitos de Examen (Haz clic para filtrar o abrir recursos):
          </span>
          {milestones.map((m) => {
            const isSelected = selectedMilestone === m.code;
            return (
              <div key={m.code} className="inline-flex rounded-full shadow-xs">
                <button
                  onClick={() => onSelectMilestone(isSelected ? null : m.code)}
                  className={`text-xs px-3 py-1 rounded-l-full font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
                  }`}
                  title={`Filtrar árbol por hito ${m.code}`}
                >
                  {m.code} ({m.weight_percentage}%)
                </button>
                <button
                  onClick={() => onOpenMilestoneDrawer && onOpenMilestoneDrawer(m)}
                  className="text-xs px-2.5 py-1 rounded-r-full font-bold border-y border-r border-zinc-300 bg-amber-100 text-amber-900 hover:bg-amber-200 cursor-pointer flex items-center gap-1 transition-colors"
                  title={`Abrir recursos y banco de preguntas de ${m.name}`}
                >
                  <span>Recursos</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
