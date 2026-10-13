'use client';

import React from 'react';
import { Filter, Zap, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  importanceFilter: string | null;
  onSelectImportance: (importance: string | null) => void;
  selectedMilestone: string | null;
  onSelectMilestone: (milestone: string | null) => void;
  totalVisibleNodes: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  importanceFilter,
  onSelectImportance,
  selectedMilestone,
  onSelectMilestone,
  totalVisibleNodes
}) => {
  const hasActiveFilters = Boolean(importanceFilter || selectedMilestone);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4 mb-6 shadow-md backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Filtros Tácticos
          </span>
          <span className="text-xs text-slate-500 font-mono ml-2">
            ({totalVisibleNodes} temas visibles)
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => {
              onSelectImportance(null);
              onSelectMilestone(null);
            }}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20"
          >
            <RotateCcw className="w-3 h-3" /> Limpiar Filtros
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800">
        <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Urgencia:
        </span>
        {(['Crítico', 'Alto', 'Medio'] as const).map((level) => {
          const isSelected = importanceFilter === level;
          return (
            <button
              key={level}
              onClick={() => onSelectImportance(isSelected ? null : level)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer border",
                isSelected
                  ? level === 'Crítico'
                    ? "bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-500/50"
                    : level === 'Alto'
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/50"
                    : "bg-blue-500/20 border-blue-500 text-blue-300 ring-1 ring-blue-500/50"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              )}
            >
              {level}
            </button>
          );
        })}

        {selectedMilestone && (
          <div className="ml-auto text-xs bg-blue-900/40 text-blue-300 border border-blue-700/40 px-2.5 py-1 rounded-md font-mono">
            Filtrando por hito: <strong className="text-white">{selectedMilestone}</strong>
          </div>
        )}
      </div>
    </div>
  );
};
