'use client';

import React from 'react';
import { AcademicUnit, RoadmapNode } from '@/types/roadmap';
import { Check } from 'lucide-react';

interface RoadmapVisualCanvasProps {
  units: AcademicUnit[];
  completedNodeIds: Set<string>;
  onToggleComplete: (id: string) => void;
  onSelectNode: (node: RoadmapNode) => void;
  onSelectUnit?: (unit: AcademicUnit) => void;
  filterImportance: string | null;
}

export const RoadmapVisualCanvas: React.FC<RoadmapVisualCanvasProps> = ({
  units,
  completedNodeIds,
  onToggleComplete,
  onSelectNode,
  onSelectUnit,
  filterImportance,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-4">
      {/* Top Title */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-8 border-l-2 border-dashed border-blue-500" />
        <div className="font-extrabold text-xl sm:text-2xl text-zinc-900 tracking-tight my-2">
          Matemática Discreta 2
        </div>
        <div className="w-0.5 h-8 border-l-2 border-dashed border-blue-500" />
      </div>

      {/* Units Flow */}
      <div className="space-y-6">
        {units.map((unit, unitIdx) => {
          const filteredNodes = unit.nodes.filter(
            (node) => !filterImportance || node.importance === filterImportance
          );

          const leftNodes = filteredNodes.filter((_, idx) => idx % 2 === 0);
          const rightNodes = filteredNodes.filter((_, idx) => idx % 2 !== 0);

          return (
            <div key={unit.id} className="relative flex flex-col items-center">
              {/* Central Spine Line continuing behind */}
              <div className="relative w-full flex flex-col items-center">
                {/* Main Yellow Unit Box */}
                <div
                  onClick={() => onSelectUnit && onSelectUnit(unit)}
                  className="z-20 w-full max-w-md cursor-pointer transition-transform hover:-translate-y-0.5"
                >
                  <div className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-900 border-2 border-zinc-900 font-bold px-6 py-3.5 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center">
                    <div className="text-[11px] uppercase tracking-wider font-extrabold text-zinc-800">
                      Unidad {unit.unit_number} • {unit.exam_target}
                    </div>
                    <div className="font-extrabold text-base sm:text-lg mt-0.5">
                      {unit.title}
                    </div>
                  </div>
                </div>

                {/* Subtopics Branching Canvas (Left & Right Branching with Real Dotted Lines) */}
                {filteredNodes.length > 0 && (
                  <div className="w-full relative mt-4">
                    {/* Vertical Center Trunk */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-blue-500 -translate-x-1/2 z-0 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-16 w-full relative z-10">
                      {/* Left Column Nodes */}
                      <div className="flex flex-col gap-4 items-end">
                        {leftNodes.map((node) => {
                          const isDone = completedNodeIds.has(node.id);
                          const isCritical = node.importance === 'Crítico';
                          const isHigh = node.importance === 'Alto';

                          return (
                            <div
                              key={node.id}
                              className="w-full max-w-sm relative flex items-center group"
                            >
                              {/* Horizontal connector line from center trunk to left box */}
                              <div className="hidden md:block absolute -right-8 w-8 h-0.5 border-t-2 border-dashed border-blue-500 z-0" />
                              {/* Connecting circle dot */}
                              <div className="hidden md:block absolute -right-9 w-2 h-2 rounded-full bg-blue-500 -translate-y-1/2 top-1/2 z-10" />

                              {/* Node Box */}
                              <div
                                onClick={() => onSelectNode(node)}
                                className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-lg border-2 border-zinc-900 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all relative z-10 ${
                                  isDone
                                    ? 'bg-emerald-50 border-emerald-900 opacity-90'
                                    : isCritical
                                    ? 'bg-[#ffeaa7] hover:bg-[#ffdf88]'
                                    : isHigh
                                    ? 'bg-[#fff3c4] hover:bg-[#ffeaa7]'
                                    : 'bg-[#fffbe6] hover:bg-[#fff3c4]'
                                }`}
                              >
                                <div className="flex-1 min-w-0 pr-2">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span
                                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-zinc-900 ${
                                        isCritical
                                          ? 'bg-rose-500 text-white'
                                          : isHigh
                                          ? 'bg-amber-400 text-zinc-900'
                                          : 'bg-blue-300 text-zinc-900'
                                      }`}
                                    >
                                      {node.importance}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 font-mono">
                                      80/20
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs sm:text-sm font-bold text-zinc-900 leading-snug ${
                                      isDone ? 'line-through text-zinc-500' : ''
                                    }`}
                                  >
                                    {node.title}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleComplete(node.id);
                                  }}
                                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center border border-zinc-900 transition-colors ${
                                    isDone
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-white hover:bg-zinc-200 text-transparent'
                                  }`}
                                  aria-label={isDone ? 'Incompleto' : 'Completo'}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Column Nodes */}
                      <div className="flex flex-col gap-4 items-start">
                        {rightNodes.map((node) => {
                          const isDone = completedNodeIds.has(node.id);
                          const isCritical = node.importance === 'Crítico';
                          const isHigh = node.importance === 'Alto';

                          return (
                            <div
                              key={node.id}
                              className="w-full max-w-sm relative flex items-center group"
                            >
                              {/* Horizontal connector line from center trunk to right box */}
                              <div className="hidden md:block absolute -left-8 w-8 h-0.5 border-t-2 border-dashed border-blue-500 z-0" />
                              {/* Connecting circle dot */}
                              <div className="hidden md:block absolute -left-9 w-2 h-2 rounded-full bg-blue-500 -translate-y-1/2 top-1/2 z-10" />

                              {/* Node Box */}
                              <div
                                onClick={() => onSelectNode(node)}
                                className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-lg border-2 border-zinc-900 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all relative z-10 ${
                                  isDone
                                    ? 'bg-emerald-50 border-emerald-900 opacity-90'
                                    : isCritical
                                    ? 'bg-[#ffeaa7] hover:bg-[#ffdf88]'
                                    : isHigh
                                    ? 'bg-[#fff3c4] hover:bg-[#ffeaa7]'
                                    : 'bg-[#fffbe6] hover:bg-[#fff3c4]'
                                }`}
                              >
                                <div className="flex-1 min-w-0 pr-2">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span
                                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-zinc-900 ${
                                        isCritical
                                          ? 'bg-rose-500 text-white'
                                          : isHigh
                                          ? 'bg-amber-400 text-zinc-900'
                                          : 'bg-blue-300 text-zinc-900'
                                      }`}
                                    >
                                      {node.importance}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 font-mono">
                                      80/20
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs sm:text-sm font-bold text-zinc-900 leading-snug ${
                                      isDone ? 'line-through text-zinc-500' : ''
                                    }`}
                                  >
                                    {node.title}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleComplete(node.id);
                                  }}
                                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center border border-zinc-900 transition-colors ${
                                    isDone
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-white hover:bg-zinc-200 text-transparent'
                                  }`}
                                  aria-label={isDone ? 'Incompleto' : 'Completo'}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Trunk line connecting to next unit */}
              {unitIdx < units.length - 1 && (
                <div className="w-0.5 h-10 border-l-2 border-dashed border-blue-500 my-2" />
              )}
            </div>
          );
        })}
      </div>

      {/* Target Goal Milestone */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-0.5 h-8 border-l-2 border-dashed border-blue-500" />
        <div className="bg-[#2563eb] text-white font-extrabold px-6 py-3 rounded-lg border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center text-xs sm:text-sm">
          🎯 Meta Académica: Aprobación y Dominio del Curso (PF ≥ 14)
        </div>
      </div>
    </div>
  );
};
