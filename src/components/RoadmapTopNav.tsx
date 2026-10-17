'use client';

import React, { useState } from 'react';
import { EvaluationMilestone } from '@/types/roadmap';
import {
  FileText,
  CheckSquare,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowUpRight,
  UserCheck,
  Users,
  Image as ImageIcon
} from 'lucide-react';

interface RoadmapTopNavProps {
  careerName?: string;
  courseName?: string;
  cycleName?: string;
  milestones: EvaluationMilestone[];
  selectedMilestone: string | null;
  onSelectMilestone: (code: string | null) => void;
  onOpenMilestoneDrawer?: (milestone: EvaluationMilestone) => void;
  onOpenTutor?: () => void;
  onOpenExercises?: () => void;
  completedCount: number;
  totalCount: number;
  activeTab?: 'temario' | 'ejercicios' | 'tutor' | 'docentes' | 'examenes';
  onSelectTab?: (tab: 'temario' | 'ejercicios' | 'tutor' | 'docentes' | 'examenes') => void;
}

export const RoadmapTopNav: React.FC<RoadmapTopNavProps> = ({
  careerName,
  courseName,
  cycleName,
  milestones,
  selectedMilestone,
  onSelectMilestone,
  onOpenMilestoneDrawer,
  onOpenTutor,
  onOpenExercises,
  completedCount,
  totalCount,
  activeTab = 'temario',
  onSelectTab,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="w-full bg-[#12151a] border-b border-zinc-800 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        {/* Main Title Header matching roadmap.sh */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {careerName && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                {careerName}
              </span>
            )}
            {cycleName && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {cycleName}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {courseName || 'Matemática Discreta II'}
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-medium">
            Guía paso a paso y ruta académica oficial para {courseName || 'Matemática Discreta II'} en 2026
          </p>
        </div>

        {/* Action Row: [📋 Temario] [☑️ Ejercicios] [🎓 Tutor IA] [👨‍🏫 Docentes] ... [↑ Personalize] */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onSelectTab && onSelectTab('temario')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activeTab === 'temario'
                  ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black shadow-xs'
                  : 'text-zinc-300 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Temario</span>
            </button>

            <button
              onClick={() => {
                if (onSelectTab) onSelectTab('ejercicios');
                if (onOpenExercises) onOpenExercises();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activeTab === 'ejercicios'
                  ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black shadow-xs'
                  : 'text-zinc-300 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Ejercicios</span>
            </button>

            <button
              onClick={() => {
                if (onSelectTab) onSelectTab('tutor');
                if (onOpenTutor) onOpenTutor();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activeTab === 'tutor'
                  ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black shadow-xs'
                  : 'text-zinc-300 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Tutor IA</span>
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('docentes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activeTab === 'docentes'
                  ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black shadow-xs'
                  : 'text-zinc-300 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Docentes</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                Cátedra
              </span>
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('examenes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activeTab === 'examenes'
                  ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black shadow-xs'
                  : 'text-zinc-300 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Exámenes Pasados</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                Galería
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <span>Progreso: <strong className="text-white">{completedCount}/{totalCount}</strong> ({percent}%)</span>
              <div className="w-16 bg-zinc-800 h-2 rounded-full overflow-hidden border border-zinc-700">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                alert('Modo personalizado activado: puedes filtrar hitos de evaluación específicos.');
              }}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white font-medium cursor-pointer"
            >
              <span>↑ Personalize</span>
            </button>
          </div>
        </div>

        {/* Dark Cream / Yellow Notification Banner */}
        <div className="bg-[#181b22] border border-amber-500/40 rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-zinc-200 shadow-sm mb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Join <strong className="text-white">148.164+</strong> others tracking their progress on this roadmap
            </span>
          </div>

          <button
            onClick={() => {
              setIsSignedUp(true);
              alert('¡Progreso guardado automáticamente en tu navegador!');
            }}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
              isSignedUp
                ? 'bg-emerald-600 text-white'
                : 'bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black shadow-xs'
            }`}
          >
            {isSignedUp ? '✓ Activo' : 'Sign up free'}
          </button>
        </div>

        {/* Collapsible Accordion: "¿A qué nos referimos con este curso?" */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden bg-[#15181f] shadow-xs">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full px-4 py-3 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-zinc-200 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>¿A qué nos referimos con {courseName || 'este curso'}?</span>
            </div>
            {isAccordionOpen ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {isAccordionOpen && (
            <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 space-y-2 border-t border-zinc-800 bg-[#12151a]">
              <p>
                <strong className="text-white">{courseName || 'Esta asignatura'}</strong> en la Universidad Continental forma parte fundamental del plan de estudios de <strong className="text-amber-300">{careerName || 'Ingeniería de Sistemas e Informática'}</strong> ({cycleName || 'Ciclo Académico'}).
              </p>
              <p>
                El temario oficial se estructura en unidades de aprendizaje secuenciales, cubriendo desde los fundamentos esenciales y conceptos de primer principio hasta casos de aplicación real evaluados en los consolidados y exámenes semestrales.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {milestones.map((m) => {
                  const isSelected = selectedMilestone === m.code;
                  return (
                    <button
                      key={m.code}
                      onClick={() => onSelectMilestone(isSelected ? null : m.code)}
                      className={`text-[11px] px-2.5 py-1 rounded font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                      }`}
                    >
                      Hito {m.code} ({m.weight_percentage}%)
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
