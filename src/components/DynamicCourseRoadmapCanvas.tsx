'use client';

import React from 'react';
import { AcademicUnit, RoadmapNode } from '@/types/roadmap';
import { Check, Sparkles, HelpCircle, Layers, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface DynamicCourseRoadmapCanvasProps {
  units: AcademicUnit[];
  completedNodeIds: Set<string>;
  onToggleComplete: (id: string) => void;
  onSelectNode: (node: RoadmapNode) => void;
  onOpenExercises?: () => void;
  onOpenTutor?: () => void;
  filterImportance: string | null;
  courseName: string;
  courseCode: string;
  cycleName: string;
  credits: number;
}

export const DynamicCourseRoadmapCanvas: React.FC<DynamicCourseRoadmapCanvasProps> = ({
  units,
  completedNodeIds,
  onToggleComplete,
  onSelectNode,
  onOpenExercises,
  onOpenTutor,
  filterImportance,
  courseName,
  courseCode,
  cycleName,
  credits,
}) => {
  return (
    <div className="relative w-full py-8 px-4 sm:px-8 bg-[#12151a] text-zinc-100 flex flex-col gap-10">
      {/* Course Banner Info */}
      <div className="bg-[#181b22] border border-zinc-700/80 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {cycleName}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
              {courseCode}
            </span>
            <span className="text-[11px] text-zinc-400 font-semibold">
              {credits} Créditos Oficiales
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {courseName}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Ruta paso a paso: Haz clic en cada nodo temático para abrir el temario profundo, preguntas clave de examen y recursos.
          </p>
        </div>

        <button
          onClick={() => onOpenTutor && onOpenTutor()}
          className="shrink-0 flex items-center gap-2 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-zinc-950" />
          <span>Consultar Tutor IA</span>
        </button>
      </div>

      {/* Sequential Unit Stages */}
      <div className="flex flex-col gap-10 max-w-4xl mx-auto w-full relative">
        {units.map((unit, uIdx) => {
          // Filter nodes if filterImportance is active
          const visibleNodes = unit.nodes.filter((node) => {
            if (!filterImportance) return true;
            return node.importance === filterImportance;
          });

          if (visibleNodes.length === 0 && filterImportance) return null;

          return (
            <div key={unit.id} className="relative flex flex-col gap-4">
              {/* Connector line between units */}
              {uIdx > 0 && (
                <div className="flex justify-center -mt-6 -mb-2">
                  <div className="w-0.5 h-8 bg-blue-600 border-dashed border-l border-blue-500"></div>
                </div>
              )}

              {/* Stage Container */}
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start">
                {/* Stage Header Box (Yellow roadmap.sh style) */}
                <div className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-black px-4 py-3.5 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm sm:text-base transition-transform hover:-translate-y-0.5 cursor-default">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-800 font-extrabold mb-0.5">
                    Hito {unit.unit_number}
                  </div>
                  <div className="leading-snug">{unit.title}</div>
                </div>

                {/* Subtopic Cards Stack */}
                <div className="flex flex-col gap-3">
                  {visibleNodes.map((node) => {
                    const isDone = completedNodeIds.has(node.id);
                    const isOptional = node.isOptional;

                    return (
                      <div
                        key={node.id}
                        onClick={() => onSelectNode(node)}
                        className="relative group cursor-pointer transition-all duration-150 select-none"
                      >
                        {/* Optional badge */}
                        {isOptional && (
                          <span className="absolute -top-2.5 right-2 z-20 bg-[#16a34a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black/20 shadow-xs pointer-events-none">
                            Opcional
                          </span>
                        )}

                        {/* Critical Exam Badge */}
                        {node.importance === 'Crítico' && (
                          <span className="absolute -top-2.5 left-2 z-20 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-black/20 shadow-xs pointer-events-none">
                            Fijo en Exámenes
                          </span>
                        )}

                        {/* Card Body */}
                        <div
                          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 ${
                            isDone
                              ? 'bg-[#dcfce7] border-emerald-900'
                              : 'bg-[#fef08a] hover:bg-[#fde047]'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span
                              className={`text-xs sm:text-[13px] font-bold text-zinc-950 leading-snug ${
                                isDone ? 'line-through text-zinc-600' : ''
                              }`}
                            >
                              {node.title}
                            </span>
                            <span className="text-[10px] text-zinc-700 font-medium line-clamp-1 mt-0.5">
                              {node.first_principles}
                            </span>
                          </div>

                          {/* Interactive Checkmark Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleComplete(node.id);
                            }}
                            title={isDone ? 'Marcar incompleto' : 'Marcar completado'}
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-zinc-950 transition-colors ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : node.checkColor === 'green'
                                ? 'bg-[#16a34a] text-white'
                                : 'bg-[#7c3aed] text-white'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Practice Exercises Callout */}
        <div className="w-full bg-[#181b22] border border-zinc-700/80 rounded-xl p-5 text-center shadow-md mt-4">
          <p className="text-xs font-semibold text-zinc-300 leading-snug mb-3">
            ¡Has cubierto los temas de {courseName}! Pon a prueba tus habilidades resolviendo problemas tipo examen con el Tutor IA.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenExercises && onOpenExercises()}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs py-2 px-4 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              Ver Banco de Ejercicios
            </button>
            <button
              type="button"
              onClick={() => onOpenTutor && onOpenTutor()}
              className="bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Preguntar al Tutor IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
