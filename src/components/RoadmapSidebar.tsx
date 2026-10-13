'use client';

import React from 'react';
import { Filter, Zap } from 'lucide-react';

interface RoadmapSidebarProps {
  importanceFilter: string | null;
  onSelectImportance: (level: string | null) => void;
}

export const RoadmapSidebar: React.FC<RoadmapSidebarProps> = ({
  importanceFilter,
  onSelectImportance,
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Legend Card (Exactly like roadmap.sh side legend) */}
      <div className="bg-white border-2 border-zinc-900 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
          Leyenda de Nodos
        </h4>
        <div className="space-y-2.5 text-xs font-semibold text-zinc-700">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 border border-zinc-900 shrink-0" />
            <span>Crítico (Pregunta Fija de Examen)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-zinc-900 shrink-0" />
            <span>Alto (Requisito Frecuente)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-300 border border-zinc-900 shrink-0" />
            <span>Medio (Fundamento Teórico)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-zinc-200">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-zinc-900 shrink-0" />
            <span>Reto Práctico Dominado</span>
          </div>
        </div>
      </div>

      {/* Filter by Urgency */}
      <div className="bg-white border-2 border-zinc-900 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          Filtrar por Urgencia
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onSelectImportance(null)}
            className={`text-left text-xs px-3 py-2 rounded-lg font-bold transition-all border ${
              importanceFilter === null
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            Todos los Temas
          </button>
          {(['Crítico', 'Alto', 'Medio'] as const).map((level) => {
            const isSelected = importanceFilter === level;
            return (
              <button
                key={level}
                onClick={() => onSelectImportance(isSelected ? null : level)}
                className={`text-left text-xs px-3 py-2 rounded-lg font-bold transition-all border ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                Solo {level}s
              </button>
            );
          })}
        </div>
      </div>

      {/* University Context Box */}
      <div className="bg-[#fff9db] border-2 border-zinc-900 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs text-zinc-800">
        <h5 className="font-bold text-zinc-900 mb-1">
          💡 Enfoque 80/20 UC
        </h5>
        <p className="leading-relaxed">
          Haz clic en cualquier nodo para ver los <strong>Primeros Principios</strong>, la <strong>Trampa Típica</strong> que resta puntos y el <strong>Reto Práctico</strong>.
        </p>
      </div>
    </aside>
  );
};
