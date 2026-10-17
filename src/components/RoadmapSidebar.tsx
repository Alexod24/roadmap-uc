'use client';

import React, { useState } from 'react';
import { Check, ChevronRight, Layers, Sparkles, BookOpen } from 'lucide-react';
import { CoursePreview } from '@/data/careers';

interface RoadmapSidebarProps {
  importanceFilter: string | null;
  onSelectImportance: (level: string | null) => void;
  onOpenExercises?: () => void;
  onSelectDocentes?: () => void;
  onSelectExamenes?: () => void;
  // Cycle selector additions
  allCycles?: string[];
  selectedCycle?: string;
  onSelectCycle?: (cycle: string) => void;
  coursesForSelectedCycle?: CoursePreview[];
  activeCourseId?: string;
  onSelectCourse?: (courseId: string) => void;
}

export const RoadmapSidebar: React.FC<RoadmapSidebarProps> = ({
  importanceFilter,
  onSelectImportance,
  onOpenExercises,
  onSelectDocentes,
  onSelectExamenes,
  allCycles = [
    'Ciclo I',
    'Ciclo II',
    'Ciclo III',
    'Ciclo IV',
    'Ciclo V',
    'Ciclo VI',
    'Ciclo VII',
    'Ciclo VIII',
    'Ciclo IX',
    'Ciclo X',
  ],
  selectedCycle = 'Ciclo IV',
  onSelectCycle,
  coursesForSelectedCycle = [],
  activeCourseId = 'matematica-discreta-2',
  onSelectCourse,
}) => {
  const [isCyclesCollapsed, setIsCyclesCollapsed] = useState(false);

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-4 text-xs font-sans">
      {/* 1. ACADEMIC CYCLE SELECTOR (Ciclo I - Ciclo X) */}
      <div className="bg-[#181b22] border border-zinc-700/80 rounded-xl p-3.5 shadow-sm text-zinc-200">
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-1.5 font-extrabold text-white text-xs sm:text-sm">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Malla Curricular</span>
          </div>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold px-1.5 py-0.5 rounded">
            10 Ciclos
          </span>
        </div>

        {/* Cycle Pills / Grid */}
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {allCycles.map((cycle) => {
            const isSelected = selectedCycle === cycle;
            return (
              <button
                key={cycle}
                onClick={() => onSelectCycle && onSelectCycle(cycle)}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-left flex items-center justify-between cursor-pointer border ${isSelected
                    ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] shadow-sm font-black'
                    : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                  }`}
              >
                <span>{cycle}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
              </button>
            );
          })}
        </div>

        {/* Courses in Selected Cycle */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold mb-2">
            <span>Cursos de {selectedCycle}:</span>
            <span className="text-zinc-500 text-[10px]">
              {coursesForSelectedCycle.length} materias
            </span>
          </div>

          <div className="space-y-1.5">
            {coursesForSelectedCycle.map((course) => {
              const isCurrent = course.id === activeCourseId;
              return (
                <button
                  key={course.id}
                  onClick={() => onSelectCourse && onSelectCourse(course.id)}
                  className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer flex flex-col gap-0.5 ${isCurrent
                      ? 'bg-amber-400/10 border-amber-400/50 text-white shadow-xs'
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-850 hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-[11px] line-clamp-1">{course.name}</span>
                    {course.hasActiveRoadmap ? (
                      <span className="shrink-0 text-[9px] bg-amber-400 text-zinc-950 font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                        Roadmap
                      </span>
                    ) : (
                      <span className="shrink-0 text-[9px] text-zinc-500 font-medium">
                        {course.credits} cr
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span className="font-mono text-zinc-500">{course.code}</span>
                    {isCurrent && (
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" /> Activo
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Cátedra de Docentes & Exámenes Pasados Quick Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onSelectDocentes && onSelectDocentes()}
          className="w-full flex items-center justify-center gap-2 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black py-2.5 px-3 rounded-lg text-xs shadow-sm transition-colors cursor-pointer text-center"
        >
          <span className="text-zinc-950 font-black">👨‍🏫</span>
          <span>Ver Cátedra y Docentes</span>
        </button>

        <button
          onClick={() => onSelectExamenes && onSelectExamenes()}
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-400/40 font-bold py-2.5 px-3 rounded-lg text-xs shadow-sm transition-colors cursor-pointer text-center"
        >
          <span>📸</span>
          <span>Galería de Exámenes Pasados</span>
        </button>
      </div>

      {/* 3. Legend Box matching roadmap.sh screenshot */}
      <div className="bg-[#181b22] border border-zinc-700/80 rounded-xl p-3.5 shadow-sm text-zinc-200">
        <div className="text-[11px] font-bold text-zinc-400 mb-2.5 uppercase tracking-wider">
          Leyenda del Roadmap
        </div>
        <ul className="space-y-2.5 font-medium">
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>Recursos recomendados</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>Opciones de estudio</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-zinc-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-zinc-400">Order not strict on roadmap</span>
          </li>
        </ul>
      </div>

      {/* 4. Filter by importance pill buttons */}
      <div className="bg-[#181b22] border border-zinc-700/80 rounded-xl p-3.5 shadow-sm">
        <div className="text-[10px] uppercase font-bold text-zinc-400 mb-2 tracking-wider">
          Filtrar Temas por Prioridad
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectImportance(null)}
            className={`text-[11px] px-2.5 py-1 rounded font-semibold transition-all border cursor-pointer ${importanceFilter === null
                ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
          >
            Todos
          </button>
          <button
            onClick={() => onSelectImportance(importanceFilter === 'Crítico' ? null : 'Crítico')}
            className={`text-[11px] px-2.5 py-1 rounded font-semibold transition-all border cursor-pointer ${importanceFilter === 'Crítico'
                ? 'bg-rose-600 text-white border-rose-600 font-bold'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
          >
            Críticos (Exámenes)
          </button>
        </div>
      </div>

      {/* 5. Practice Callout Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 text-zinc-300">
        <p className="font-semibold text-xs leading-relaxed text-zinc-200 mb-3">
          ¡La práctica hace al maestro! Resuelve problemas para consolidar los temas.
        </p>
        <button
          onClick={() => onOpenExercises && onOpenExercises()}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer text-center border border-zinc-700"
        >
          Ejercicios Prácticos
        </button>
      </div>
    </aside>
  );
};
