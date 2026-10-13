'use client';

import React, { useState } from 'react';
import { RoadmapNode } from '@/types/roadmap';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Circle,
  Wrench,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapNodeCardProps {
  node: RoadmapNode;
  isCompleted: boolean;
  onToggleComplete: (nodeId: string) => void;
  defaultExpanded?: boolean;
}

export const RoadmapNodeCard: React.FC<RoadmapNodeCardProps> = ({
  node,
  isCompleted,
  onToggleComplete,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const importanceBadgeColor = {
    'Crítico': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    'Alto': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Medio': 'bg-blue-500/15 text-blue-400 border-blue-500/30'
  }[node.importance];

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200 overflow-hidden",
        isCompleted
          ? "bg-slate-900/60 border-emerald-900/50 shadow-sm"
          : "bg-slate-900/90 border-slate-800 shadow-md hover:border-slate-700"
      )}
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(node.id);
            }}
            aria-label={isCompleted ? "Marcar como pendiente" : "Marcar como completado"}
            className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
            ) : (
              <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={cn(
                  "text-[11px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                  importanceBadgeColor
                )}
              >
                {node.importance}
              </span>

              {node.prerequisites.length > 0 && (
                <span className="text-[11px] text-slate-400 truncate max-w-xs font-mono">
                  Previo: {node.prerequisites.join(', ')}
                </span>
              )}
            </div>

            <h4
              className={cn(
                "text-base sm:text-lg font-semibold transition-colors leading-snug",
                isCompleted ? "text-slate-400 line-through decoration-slate-600" : "text-slate-100"
              )}
            >
              {node.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            {isExpanded ? 'Ocultar detalles' : 'Ver dominio'}
          </span>
          <div className="p-1 rounded-md bg-slate-800 text-slate-300">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Actionable Content */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-4 text-sm">
          {/* Primeros Principios */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/70">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Primeros Principios
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {node.first_principles}
            </p>
          </div>

          {/* 80/20 del Examen */}
          <div className="bg-amber-950/20 p-3.5 rounded-lg border border-amber-500/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              El 80/20 del Examen
            </div>
            <p className="text-amber-200/90 text-xs sm:text-sm leading-relaxed">
              {node.exam_80_20}
            </p>
          </div>

          {/* Trampa Típica (Alerta Destructiva) */}
          <div className="bg-rose-950/30 p-3.5 rounded-lg border border-rose-600/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Trampa Típica (Puntos Perdidos Frecuentes)
            </div>
            <p className="text-rose-200/90 text-xs sm:text-sm leading-relaxed">
              {node.common_pitfall}
            </p>
          </div>

          {/* Herramientas Recomendadas */}
          {node.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Wrench className="w-3.5 h-3.5 text-slate-500" />
                Herramientas:
              </div>
              {node.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* Reto de Acción */}
          <div className="bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-500/30">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                Reto de Acción Inmediato
              </div>
              <button
                onClick={() => onToggleComplete(node.id)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded font-medium transition-colors cursor-pointer border",
                  isCompleted
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-white"
                )}
              >
                {isCompleted ? "✓ Completado" : "Marcar como hecho"}
              </button>
            </div>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              {node.action_challenge}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
