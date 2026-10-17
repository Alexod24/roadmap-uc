'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  BookOpen,
  MapPin,
  Sparkles,
  ChevronDown,
  Layers,
  Users,
  Compass,
  Home as HomeIcon,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { universityCareersData } from '@/data/careers';
import { useTheme } from '@/context/ThemeContext';

interface GlobalNavbarProps {
  currentView: 'careers_home' | 'course_roadmap';
  currentCareerId?: string;
  currentCourseName?: string;
  onNavigateToCareers: () => void;
  onSelectCourse: (careerId: string, courseId: string) => void;
  onOpenTutor?: () => void;
  onOpenDocentes?: () => void;
}

export const GlobalNavbar: React.FC<GlobalNavbarProps> = ({
  currentView,
  currentCareerId = 'ing-sistemas',
  currentCourseName = 'Matemática Discreta II',
  onNavigateToCareers,
  onSelectCourse,
  onOpenTutor,
  onOpenDocentes,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [selectedCampus, setSelectedCampus] = useState('Sede Huancayo');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Find career object
  const currentCareer = universityCareersData.find((c) => c.id === currentCareerId);

  // Search results
  const searchResults = searchQuery.trim()
    ? universityCareersData.flatMap((career) =>
        career.featured_courses
          .filter(
            (course) =>
              course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              career.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              course.code.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((course) => ({
            career,
            course,
          }))
      )
    : [];

  return (
    <>
      <nav className="w-full bg-[#12151a] dark:bg-[#12151a] border-b border-zinc-800 dark:border-zinc-800 text-zinc-100 sticky top-0 z-40 font-sans shadow-md transition-colors">
        {/* Top Brand Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">

          {/* Left: University & Platform Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToCareers}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
              title="Volver a la selección de Carreras"
            >
              <div className="w-9 h-9 rounded-lg bg-[#ffe500] border-2 border-zinc-950 flex items-center justify-center font-black text-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-0.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg text-white tracking-tight leading-none">
                    Roadmap UC
                  </span>
                  <span className="bg-[#ffe500] text-zinc-950 text-[9px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider">
                    2026
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-semibold block leading-tight">
                  Universidad Continental • Portal de Rutas
                </span>
              </div>
            </button>

            {/* Breadcrumb pills when viewing a course */}
            {currentView === 'course_roadmap' && currentCareer && (
              <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-zinc-800 text-xs font-semibold text-zinc-400">
                <button
                  onClick={onNavigateToCareers}
                  className="hover:text-white hover:underline cursor-pointer flex items-center gap-1"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Carreras</span>
                </button>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-300">{currentCareer.name}</span>
                <span className="text-zinc-600">/</span>
                <span className="bg-[#ffe500] text-zinc-950 px-2 py-0.5 rounded font-black text-[11px]">
                  {currentCourseName}
                </span>
              </div>
            )}
          </div>

          {/* Center: Search Button */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-400 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <span>Buscar carrera, curso o tema...</span>
              </div>
              <kbd className="hidden sm:inline-block bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-[10px] font-mono text-zinc-300 shadow-2xs">
                Buscar
              </kbd>
            </button>
          </div>

          {/* Right: Actions, Campus selector, Theme Toggle & Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Campus Selector */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                aria-label="Seleccionar sede"
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold text-zinc-200"
              >
                <option value="Sede Huancayo" className="bg-zinc-900 text-white">Huancayo</option>
                <option value="Sede Lima" className="bg-zinc-900 text-white">Lima</option>
                <option value="Sede Arequipa" className="bg-zinc-900 text-white">Arequipa</option>
                <option value="Sede Cusco" className="bg-zinc-900 text-white">Cusco</option>
                <option value="A Distancia" className="bg-zinc-900 text-white">A Distancia</option>
              </select>
            </div>

            {/* Quick Button to go back to Carreras Hub */}
            <button
              onClick={onNavigateToCareers}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                currentView === 'careers_home'
                  ? 'bg-[#ffe500] text-zinc-950 border-[#ffe500] shadow-xs'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explorar</span> Carreras
            </button>

            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Cambiar a tema Claro (Light)' : 'Cambiar a tema Oscuro (Dark)'}
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden xl:inline text-[11px]">Tema Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span className="hidden xl:inline text-[11px]">Tema Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#181b21] border border-zinc-700 rounded-xl max-w-xl w-full shadow-2xl overflow-hidden text-zinc-100">
            <div className="p-3 border-b border-zinc-800 flex items-center gap-2 bg-[#12151a]">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe una carrera (ej. Psicología, Sistemas) o curso (ej. Discreta 2)..."
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-zinc-500"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 text-xs">
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map(({ career, course }) => (
                    <button
                      key={course.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        onSelectCourse(career.id, course.id);
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-amber-300">
                          {course.name}
                        </div>
                        <div className="text-zinc-400 text-[11px] mt-0.5">
                          {career.name} • {course.cycle} • {course.code}
                        </div>
                      </div>
                      {course.hasActiveRoadmap ? (
                        <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                          ⚡ Roadmap Activo
                        </span>
                      ) : (
                        <span className="text-zinc-500 text-[11px] font-semibold">
                          Próximamente
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="py-8 text-center text-zinc-400">
                  No se encontraron cursos con &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="py-4 px-2 text-zinc-400">
                  <div className="font-bold text-zinc-300 text-xs mb-2">
                    Carreras Populares:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {universityCareersData.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSearchQuery(c.name)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border border-zinc-700"
                      >
                        {c.icon} {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
