'use client';

import React, { useState } from 'react';
import { CourseProfessor } from '@/types/roadmap';
import {
  Star,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  ThumbsUp,
  Search,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  BarChart3,
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ProfessorsSectionProps {
  professors: CourseProfessor[];
  onOpenTutorWithProfessorPrompt?: (professorName: string) => void;
}

export const ProfessorsSection: React.FC<ProfessorsSectionProps> = ({
  professors,
  onOpenTutorWithProfessorPrompt,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'past'>('all');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [activeModalProfessor, setActiveModalProfessor] = useState<CourseProfessor | null>(null);
  const [upvotedReviews, setUpvotedReviews] = useState<Set<string>>(new Set());

  // Handle upvoting reviews
  const handleToggleUpvote = (reviewId: string) => {
    setUpvotedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  // Filter professors
  const filteredProfessors = professors.filter((prof) => {
    const matchesSearch =
      prof.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.title_degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.teaching_style.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? prof.is_active
        : !prof.is_active;

    const matchesCampus =
      selectedCampus === 'all'
        ? true
        : prof.campuses.some((c) => c.toLowerCase() === selectedCampus.toLowerCase());

    return matchesSearch && matchesStatus && matchesCampus;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 font-sans text-zinc-100">
      {/* Header & Overview */}
      <div className="bg-[#181b22] border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#ffe500] text-zinc-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              Cátedra Universitaria UC
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Docentes de Matemática Discreta II
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
              Plana docente que imparte o ha impartido el curso. Haz clic en <strong>&ldquo;Leer más detalles&rdquo;</strong> para ver rúbricas y tips de aprobación.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 rounded-lg p-2.5 shrink-0 self-start sm:self-auto">
            <TrendingUp className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">{professors.length} Docentes en registro</span>
              <span className="text-zinc-400 text-[11px]">
                {professors.filter((p) => p.is_active).length} activos en el semestre 2026-1
              </span>
            </div>
          </div>
        </div>

        {/* Search & Quick Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-zinc-800">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar docente o palabra clave..."
              className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ffe500]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-zinc-700 bg-zinc-900 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#ffe500] text-zinc-950 font-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Todos ({professors.length})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Activos 2026 ({professors.filter((p) => p.is_active).length})
              </button>
              <button
                onClick={() => setStatusFilter('past')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  statusFilter === 'past'
                    ? 'bg-zinc-800 text-zinc-200 shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Históricos
              </button>
            </div>

            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              aria-label="Filtrar por sede"
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#ffe500] cursor-pointer"
            >
              <option value="all">Todas las Sedes</option>
              <option value="huancayo">Huancayo</option>
              <option value="lima">Lima</option>
              <option value="arequipa">Arequipa</option>
              <option value="cusco">Cusco</option>
              <option value="distancia">A Distancia</option>
            </select>
          </div>
        </div>
      </div>

      {/* COMPACT & ESSENTIAL PROFESSOR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredProfessors.map((prof) => {
          return (
            <div
              key={prof.id}
              className="bg-[#181b22] border border-zinc-700/80 hover:border-zinc-500 rounded-xl p-4 sm:p-5 shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Avatar Image + Core Info */}
                <div className="flex items-start gap-3.5 mb-3">
                  {/* Real Photo Thumbnail */}
                  <div className="relative shrink-0">
                    <img
                      src={prof.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                      alt={prof.full_name}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border-2 border-zinc-700 shadow-xs bg-zinc-800"
                    />
                    <span
                      title={prof.is_active ? 'Dictando este ciclo (2026-1)' : 'Docente de ciclos anteriores'}
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#181b22] shadow-xs ${
                        prof.is_active ? 'bg-emerald-500' : 'bg-zinc-500'
                      }`}
                    />
                  </div>

                  {/* Name and Degree */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-black text-white text-base leading-tight">
                        {prof.full_name}
                      </h3>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-semibold mt-0.5 truncate">
                      {prof.title_degree}
                    </p>

                    {/* Specialty Pill */}
                    {prof.badge && (
                      <span className="inline-block mt-1.5 bg-[#ffe500] text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                        {prof.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Essential Stats Row (Clean & Visual) */}
                <div className="grid grid-cols-3 gap-2 bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 my-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      <span>{prof.stats.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-medium">
                      {prof.stats.review_count} opiniones
                    </div>
                  </div>

                  <div>
                    <div className="font-black text-sm text-emerald-400">
                      {prof.stats.approval_rate_percentage}%
                    </div>
                    <div className="text-[10px] text-zinc-400 font-medium">
                      Aprobación
                    </div>
                  </div>

                  <div>
                    <div className="font-black text-sm text-zinc-200">
                      {prof.stats.difficulty_level}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-medium">
                      Dificultad
                    </div>
                  </div>
                </div>

                {/* Modality & Campus Tags */}
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium flex-wrap mb-1">
                  <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span>Sedes:</span>
                  <span className="text-zinc-200 font-semibold">
                    {prof.campuses.join(', ')}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{prof.modalities.join(' / ')}</span>
                </div>
              </div>

              {/* Bottom Card Action: "Leer más detalles" button */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-400 font-semibold">
                  {prof.is_active ? '🟢 Activo en 2026-1' : '⚪ Histórico'}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveModalProfessor(prof)}
                  className="flex items-center gap-1.5 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>Leer más detalles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProfessors.length === 0 && (
        <div className="text-center py-12 bg-[#181b22] border border-zinc-800 rounded-xl p-8">
          <h4 className="font-bold text-white text-base">No se encontraron docentes</h4>
          <p className="text-zinc-400 text-xs mt-1">
            Intenta cambiar los filtros de búsqueda o seleccionar &ldquo;Todas las Sedes&rdquo;.
          </p>
        </div>
      )}

      {/* ============================================================== */}
      {/* DEEP DETAIL MODAL (Opened upon clicking "Leer más detalles")   */}
      {/* ============================================================== */}
      {activeModalProfessor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#181b22] border border-zinc-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative my-auto text-zinc-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-start justify-between gap-4 bg-[#12151a] rounded-t-2xl">
              <div className="flex items-start gap-4">
                <img
                  src={activeModalProfessor.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={activeModalProfessor.full_name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-zinc-700 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                      {activeModalProfessor.full_name}
                    </h3>
                    {activeModalProfessor.is_active ? (
                      <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                        Activo 2026-1
                      </span>
                    ) : (
                      <span className="bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-700">
                        Histórico
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    {activeModalProfessor.title_degree}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px]">
                    <span className="bg-zinc-900 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded font-semibold">
                      Sedes: {activeModalProfessor.campuses.join(', ')}
                    </span>
                    <span className="bg-zinc-900 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded font-semibold">
                      Semestres: {activeModalProfessor.semesters_taught.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProfessor(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-zinc-300">
              {/* Detailed Statistics Metrics */}
              <div>
                <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  Métricas y Estadísticas del Docente
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-base">
                      <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      <span>{activeModalProfessor.stats.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Calificación ({activeModalProfessor.stats.review_count} votos)
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2.5 text-center">
                    <div className="font-black text-base text-emerald-400">
                      {activeModalProfessor.stats.approval_rate_percentage}%
                    </div>
                    <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Tasa de Aprobación
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2.5 text-center">
                    <div className="font-black text-base text-blue-400">
                      {activeModalProfessor.stats.clarity_score}%
                    </div>
                    <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Claridad Didáctica
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2.5 text-center">
                    <div className="font-black text-base text-purple-400">
                      {activeModalProfessor.stats.strictness_score} / 10
                    </div>
                    <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                      Exigencia en Rúbricas
                    </div>
                  </div>
                </div>
              </div>

              {/* Forma de Enseñanza & Metodología */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4">
                <h4 className="font-extrabold text-white text-xs sm:text-sm flex items-center gap-1.5 mb-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Forma de Enseñanza y Metodología en Clase
                </h4>
                <p className="text-zinc-300 leading-relaxed font-medium mb-3">
                  {activeModalProfessor.teaching_style.methodology}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-[11px] text-zinc-300">
                  <div>
                    <strong className="text-white">Estilo de exámenes:</strong> {activeModalProfessor.teaching_style.exam_style}
                  </div>
                  <div>
                    <strong className="text-white">Criterio de calificación:</strong> {activeModalProfessor.teaching_style.evaluation_criteria}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <strong className="text-white">Herramientas clave:</strong>
                    {activeModalProfessor.teaching_style.recommended_tools.map((tool) => (
                      <span key={tool} className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-2 py-0.5 rounded font-semibold text-[10px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Survival Recommendations (DOs and DONTs) */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-3">
                <h4 className="font-extrabold text-white text-xs sm:text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-400" />
                  Recomendaciones y Tips de Supervivencia (Ex-alumnos)
                </h4>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Qué SÍ hacer para asegurar tu nota:
                  </span>
                  {activeModalProfessor.recommendations.dos.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {activeModalProfessor.recommendations.donts.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                      Qué evitar para no perder puntos:
                    </span>
                    {activeModalProfessor.recommendations.donts.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-rose-300">
                        <X className="w-4 h-4 text-rose-500 stroke-[3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-zinc-800/80 border-l-3 border-amber-400 p-2.5 rounded-r text-zinc-300 italic text-xs">
                  &ldquo;{activeModalProfessor.recommendations.best_practice_quote}&rdquo;
                </div>
              </div>

              {/* Verified Student Reviews */}
              {activeModalProfessor.reviews.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Reseñas Verificadas de Alumnos
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalProfessor.reviews.map((rev) => {
                      const isUpvoted = upvotedReviews.has(rev.id);
                      return (
                        <div key={rev.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs">
                          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold mb-1">
                            <span>{rev.author_term} • {rev.campus}</span>
                            {rev.grade_obtained && (
                              <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                {rev.grade_obtained}
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-200 leading-snug font-medium">
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                            <div className="flex flex-wrap gap-1">
                              {rev.tags.map((tag) => (
                                <span key={tag} className="text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-300 px-1.5 py-0.2 rounded font-semibold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleUpvote(rev.id)}
                              className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer border ${
                                isUpvoted
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{rev.upvotes + (isUpvoted ? 1 : 0)} útil</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 flex items-center justify-between gap-3 bg-[#12151a] rounded-b-2xl">
              <button
                type="button"
                onClick={() => setActiveModalProfessor(null)}
                className="text-xs font-bold text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cerrar
              </button>

              {onOpenTutorWithProfessorPrompt && (
                <button
                  type="button"
                  onClick={() => {
                    const profName = activeModalProfessor.full_name;
                    setActiveModalProfessor(null);
                    onOpenTutorWithProfessorPrompt(profName);
                  }}
                  className="flex items-center gap-1.5 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 text-xs font-black px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Preguntar al Tutor IA sobre este docente</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
