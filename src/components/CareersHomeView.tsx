'use client';

import React, { useState } from 'react';
import { universityCareersData, UniversityCareer, CoursePreview } from '@/data/careers';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
  X
} from 'lucide-react';

interface CareersHomeViewProps {
  onSelectCourse: (careerId: string, courseId: string) => void;
}

export const CareersHomeView: React.FC<CareersHomeViewProps> = ({ onSelectCourse }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareerModal, setSelectedCareerModal] = useState<UniversityCareer | null>(null);

  // Faculties list
  const faculties = [
    'all',
    'Facultad de Ingeniería',
    'Facultad de Ciencias de la Salud',
    'Facultad de Humanidades y Ciencias Sociales',
    'Facultad de Arquitectura',
    'Facultad de Derecho y Ciencias Políticas',
  ];

  // Filtered careers
  const filteredCareers = universityCareersData.filter((career) => {
    const matchesFaculty =
      selectedFaculty === 'all' || career.faculty === selectedFaculty;

    const matchesSearch =
      career.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.featured_courses.some((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFaculty && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#0d0f12] dark:bg-[#0d0f12] font-sans text-zinc-100 pb-16 transition-colors">
      {/* Hero Banner (Clean, Academic & Sleek Dark Design) */}
      <section className="bg-[#12151a] border-b border-zinc-800 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#ffe500] text-zinc-950 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs mb-4">
            <GraduationCap className="w-4 h-4" />
            Portal Académico Universidad Continental
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Rutas Académicas y Roadmaps Universitarios
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Elige tu carrera profesional para explorar el plan de estudios, los árboles de aprendizaje paso a paso,
            los balotarios de exámenes resueltos y las recomendaciones de la cátedra docente.
          </p>

          {/* Quick Search */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar carrera (ej. Sistemas, Psicología, Arquitectura, Enfermería)..."
              className="w-full pl-11 pr-4 py-3 bg-[#181b21] hover:bg-[#1f232b] focus:bg-[#1f232b] border border-zinc-700 rounded-xl text-sm font-medium text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffe500] transition-all shadow-md"
            />
          </div>

          {/* Faculty Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6">
            {faculties.map((fac) => {
              const label =
                fac === 'all'
                  ? 'Todas las Facultades'
                  : fac.replace('Facultad de ', '');
              const isSelected = selectedFaculty === fac;

              return (
                <button
                  key={fac}
                  onClick={() => setSelectedFaculty(fac)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] shadow-sm'
                      : 'bg-zinc-900/90 text-zinc-300 border-zinc-700/80 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Careers Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Carreras Profesionales Disponibles
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
              Explora los cursos con roadmaps tácticos y balotarios guiados.
            </p>
          </div>
          <span className="text-xs font-bold bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full text-zinc-300">
            {filteredCareers.length} carreras encontradas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const activeCourse = career.featured_courses.find(
              (c) => c.hasActiveRoadmap
            );

            return (
              <div
                key={career.id}
                className="bg-[#15181f] border border-zinc-700/80 hover:border-zinc-500 rounded-xl p-5 shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Career Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                      {career.icon}
                    </div>

                    <span className="text-[10px] font-bold bg-zinc-800/80 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                      {career.duration_years} años • {career.total_credits} créditos
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    {career.faculty}
                  </span>

                  <h3 className="text-lg font-black text-white leading-snug mt-0.5 group-hover:text-amber-300 transition-colors">
                    {career.name}
                  </h3>

                  <p className="text-xs text-zinc-300 font-medium mt-2 leading-relaxed line-clamp-3">
                    {career.short_description}
                  </p>

                  {/* Highlight for Active Roadmap (e.g. Matemática Discreta II in Sistemas) */}
                  {activeCourse && (
                    <div
                      onClick={() => onSelectCourse(career.id, activeCourse.id)}
                      className="mt-4 p-3 rounded-lg bg-emerald-950/70 border-2 border-emerald-500/80 hover:bg-emerald-900/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-1">
                        <span>⚡ Roadmap Disponible</span>
                        <span>{activeCourse.cycle}</span>
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm text-white flex items-center justify-between">
                        <span>{activeCourse.name}</span>
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[11px] text-zinc-300 mt-1 line-clamp-2">
                        {activeCourse.description}
                      </p>
                    </div>
                  )}

                  {/* Featured Courses List Preview */}
                  <div className="mt-4 pt-3 border-t border-zinc-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      Cursos del Plan de Estudios:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.featured_courses.slice(0, 3).map((course) => (
                        <button
                          key={course.id}
                          onClick={() => {
                            if (course.hasActiveRoadmap) {
                              onSelectCourse(career.id, course.id);
                            } else {
                              setSelectedCareerModal(career);
                            }
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded font-semibold border transition-colors cursor-pointer ${
                            course.hasActiveRoadmap
                              ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] font-black hover:bg-amber-400'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white'
                          }`}
                        >
                          {course.name}
                        </button>
                      ))}
                      {career.featured_courses.length > 3 && (
                        <button
                          onClick={() => setSelectedCareerModal(career)}
                          className="text-[10px] text-zinc-400 hover:text-white font-bold px-1.5 py-0.5 cursor-pointer"
                        >
                          +{career.featured_courses.length - 3} más
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400 font-medium">
                    Sedes: {career.campuses.slice(0, 2).join(', ')}...
                  </span>

                  <button
                    onClick={() => {
                      if (activeCourse) {
                        onSelectCourse(career.id, activeCourse.id);
                      } else {
                        setSelectedCareerModal(career);
                      }
                    }}
                    className="flex items-center gap-1.5 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <span>{activeCourse ? 'Abrir Roadmap' : 'Ver Cursos'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Career Detail / Courses Modal */}
      {selectedCareerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#181b22] border border-zinc-700 rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl text-zinc-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-start justify-between gap-4 bg-[#12151a] rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl shadow-xs">
                  {selectedCareerModal.icon}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase">
                    {selectedCareerModal.faculty}
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight">
                    {selectedCareerModal.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {selectedCareerModal.duration_years} años • {selectedCareerModal.total_credits} créditos académicos
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCareerModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Courses List */}
            <div className="p-5 overflow-y-auto space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Plan de Estudios y Cursos Principales:
              </div>

              {selectedCareerModal.featured_courses.map((course) => (
                <div
                  key={course.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    course.hasActiveRoadmap
                      ? 'bg-emerald-950/60 border-emerald-600 shadow-md'
                      : 'bg-zinc-900/80 border-zinc-800'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white">
                        {course.name}
                      </span>
                      <span className="text-[10px] font-bold bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded border border-zinc-700">
                        {course.cycle}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 leading-snug">
                      {course.description}
                    </p>
                  </div>

                  <div>
                    {course.hasActiveRoadmap ? (
                      <button
                        onClick={() => {
                          setSelectedCareerModal(null);
                          onSelectCourse(selectedCareerModal.id, course.id);
                        }}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black text-xs px-3.5 py-2 rounded-lg shadow-sm cursor-pointer transition-colors"
                      >
                        <span>Abrir Roadmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-block text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded border border-zinc-700 text-center">
                        En desarrollo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-[#12151a] rounded-b-2xl text-right">
              <button
                onClick={() => setSelectedCareerModal(null)}
                className="text-xs font-bold text-zinc-300 hover:text-white px-4 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
