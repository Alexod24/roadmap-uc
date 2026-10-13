'use client';

import React, { useState } from 'react';
import { AcademicUnit, RoadmapNode } from '@/types/roadmap';
import { RoadmapNodeCard } from './RoadmapNodeCard';
import { Layers, Clock, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnitCardProps {
  unit: AcademicUnit;
  completedNodeIds: Set<string>;
  onToggleComplete: (nodeId: string) => void;
  filterImportance: string | null;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  completedNodeIds,
  onToggleComplete,
  filterImportance
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Apply importance filtering to nodes within this unit
  const filteredNodes = unit.nodes.filter((node: RoadmapNode) => {
    if (!filterImportance) return true;
    return node.importance === filterImportance;
  });

  const unitCompletedCount = unit.nodes.filter(n => completedNodeIds.has(n.id)).length;
  const isUnitFinished = unitCompletedCount === unit.nodes.length && unit.nodes.length > 0;

  if (filteredNodes.length === 0 && filterImportance) {
    return null;
  }

  return (
    <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 relative">
      {/* Unit Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 cursor-pointer select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
              <Layers className="w-3 h-3" /> Unidad {unit.unit_number}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" /> {unit.duration_hours} Horas académicas
            </span>
            <span className="text-xs text-amber-400/90 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <Target className="w-3 h-3 text-amber-400" /> {unit.exam_target}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-2">
            {unit.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400">Progreso Unidad</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {unitCompletedCount}/{unit.nodes.length} completados
            </div>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            aria-label={isCollapsed ? "Expandir unidad" : "Colapsar unidad"}
          >
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Vertical Timeline Tree Nodes */}
      {!isCollapsed && (
        <div className="mt-6 space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800/80 sm:before:left-5">
          {filteredNodes.map((node) => (
            <div key={node.id} className="relative sm:pl-9 pl-8">
              {/* Timeline Connector Dot */}
              <div
                className={cn(
                  "absolute left-2.5 sm:left-3.5 top-6 w-3 h-3 rounded-full -translate-x-1/2 border-2 transition-colors",
                  completedNodeIds.has(node.id)
                    ? "bg-emerald-500 border-slate-900 ring-2 ring-emerald-500/30"
                    : node.importance === 'Crítico'
                    ? "bg-rose-500 border-slate-900"
                    : "bg-slate-700 border-slate-900"
                )}
              />

              <RoadmapNodeCard
                node={node}
                isCompleted={completedNodeIds.has(node.id)}
                onToggleComplete={onToggleComplete}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
