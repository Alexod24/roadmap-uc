'use client';

import React, { useState, useEffect } from 'react';
import { matematicaDiscreta2Data } from '@/data/courses/matematica-discreta-2';
import { universityCareersData } from '@/data/careers';
import { GlobalNavbar } from '@/components/GlobalNavbar';
import { CareersHomeView } from '@/components/CareersHomeView';
import { RoadmapTopNav } from '@/components/RoadmapTopNav';
import { RoadmapSidebar } from '@/components/RoadmapSidebar';
import { RoadmapVisualCanvas } from '@/components/RoadmapVisualCanvas';
import { DynamicCourseRoadmapCanvas } from '@/components/DynamicCourseRoadmapCanvas';
import { ProfessorsSection } from '@/components/ProfessorsSection';
import { PastExamsGallery } from '@/components/PastExamsGallery';
import { ResourceDrawer } from '@/components/ResourceDrawer';
import { generateCurriculumRoadmap, systemsCurriculumData } from '@/data/courses/systems-curriculum';
import { RoadmapNode, EvaluationMilestone, AcademicUnit, CourseRoadmap } from '@/types/roadmap';

const STORAGE_KEY = 'roadmap_uc_matematica_discreta_2_progress';

export default function Home() {
  // Navigation view state: 'careers_home' (inicio con carreras) or 'course_roadmap' (curso activo)
  const [currentView, setCurrentView] = useState<'careers_home' | 'course_roadmap'>('careers_home');
  const [selectedCareerId, setSelectedCareerId] = useState<string>('ing-sistemas');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('matematica-discreta-2');
  const [selectedCycle, setSelectedCycle] = useState<string>('Ciclo IV');

  // Course Roadmap specific state
  const [completedNodeIds, setCompletedNodeIds] = useState<Set<string>>(new Set());
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [importanceFilter, setImportanceFilter] = useState<string | null>(null);
  const [activeNavTab, setActiveNavTab] = useState<'temario' | 'ejercicios' | 'tutor' | 'docentes' | 'examenes'>('temario');

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerNode, setDrawerNode] = useState<RoadmapNode | null>(null);
  const [drawerMilestone, setDrawerMilestone] = useState<EvaluationMilestone | null>(null);
  const [drawerTab, setDrawerTab] = useState<'resources' | 'ai_tutor'>('resources');

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedNodeIds(new Set(parsed));
        }
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  }, []);

  // Save progress
  const handleToggleComplete = (nodeId: string) => {
    setCompletedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error('Error saving progress:', e);
      }
      return next;
    });
  };

  // Open node in drawer
  const handleOpenNodeDrawer = (node: RoadmapNode) => {
    setDrawerNode(node);
    setDrawerMilestone(null);
    setDrawerTab('resources');
    setIsDrawerOpen(true);
  };

  // Open milestone in drawer
  const handleOpenMilestoneDrawer = (milestone: EvaluationMilestone) => {
    setDrawerMilestone(milestone);
    setDrawerNode(null);
    setDrawerTab('resources');
    setIsDrawerOpen(true);
  };

  // Open tutor directly
  const handleOpenTutor = () => {
    const firstNode = matematicaDiscreta2Data.units[0]?.nodes[0] || null;
    setDrawerNode(firstNode);
    setDrawerMilestone(null);
    setDrawerTab('ai_tutor');
    setIsDrawerOpen(true);
  };

  // Open tutor with professor prompt
  const handleOpenTutorWithProfessor = (professorName: string) => {
    const firstNode = currentCourseRoadmap.units[0]?.nodes[0] || null;
    setDrawerNode(firstNode);
    setDrawerMilestone(null);
    setDrawerTab('ai_tutor');
    setIsDrawerOpen(true);
  };

  // Open tutor with past exam prompt
  const handleOpenTutorWithExam = (examTitle: string) => {
    const firstNode = currentCourseRoadmap.units[0]?.nodes[0] || null;
    setDrawerNode(firstNode);
    setDrawerMilestone(null);
    setDrawerTab('ai_tutor');
    setIsDrawerOpen(true);
  };

  // Open exercises modal/drawer
  const handleOpenExercises = () => {
    const criticalNode =
      matematicaDiscreta2Data.units
        .flatMap((u) => u.nodes)
        .find((n) => n.importance === 'Crítico') || matematicaDiscreta2Data.units[0]?.nodes[0];
    if (criticalNode) {
      setDrawerNode(criticalNode);
      setDrawerMilestone(null);
      setDrawerTab('resources');
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Find active career object
  const activeCareer = universityCareersData.find((c) => c.id === selectedCareerId) || universityCareersData[0];
  const allCareerCourses = activeCareer?.featured_courses || [];

  // Filter courses for currently selected cycle
  const coursesForCurrentCycle = allCareerCourses.filter((course) => course.cycle === selectedCycle);

  // Active course object
  const activeCourse = allCareerCourses.find((c) => c.id === selectedCourseId) || {
    id: 'matematica-discreta-2',
    name: matematicaDiscreta2Data.subject_name,
    code: matematicaDiscreta2Data.subject_code,
    cycle: 'Ciclo IV',
    credits: 4,
    hasActiveRoadmap: true,
    description: 'Grafos, árboles, recurrencias, estructuras algebraicas, autómatas finitos y modelos de computación.',
  };

  // Handler when selecting a course from Careers Directory or Sidebar
  const handleSelectCourse = (careerId: string, courseId: string) => {
    setSelectedCareerId(careerId);
    setSelectedCourseId(courseId);

    const career = universityCareersData.find((c) => c.id === careerId);
    const targetCourse = career?.featured_courses.find((c) => c.id === courseId);
    if (targetCourse?.cycle) {
      setSelectedCycle(targetCourse.cycle);
    }

    setActiveNavTab('temario');
    setCurrentView('course_roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler when selecting cycle in sidebar
  const handleSelectCycle = (cycle: string) => {
    setSelectedCycle(cycle);
    const coursesInCycle = allCareerCourses.filter((c) => c.cycle === cycle);
    if (coursesInCycle.length > 0) {
      // If one of the courses has active roadmap, prefer it, else choose first
      const courseWithRoadmap = coursesInCycle.find((c) => c.hasActiveRoadmap);
      const target = courseWithRoadmap || coursesInCycle[0];
      setSelectedCourseId(target.id);
    }
  };

  // Handler to navigate back to Careers Directory
  const handleNavigateToCareers = () => {
    setCurrentView('careers_home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find matching Systems course metadata if applicable
  const systemsCourseMeta = systemsCurriculumData
    .flatMap((c) => c.cursos)
    .find((c) => c.id === selectedCourseId);

  // Active roadmap data: custom rich data for matematica-discreta-2, or generated from curriculum for any course
  const currentCourseRoadmap: CourseRoadmap =
    selectedCourseId === 'matematica-discreta-2'
      ? matematicaDiscreta2Data
      : systemsCourseMeta
      ? generateCurriculumRoadmap(systemsCourseMeta)
      : matematicaDiscreta2Data;

  // Total nodes calculation
  const allNodes = currentCourseRoadmap.units.flatMap((u) => u.nodes);
  const totalCount = allNodes.length;
  const completedCount = completedNodeIds.size;

  // Filter units according to active milestone
  const activeMilestoneObj = selectedMilestone
    ? currentCourseRoadmap.milestones.find((m) => m.code === selectedMilestone)
    : null;

  const visibleUnits = currentCourseRoadmap.units.filter((unit) => {
    if (!activeMilestoneObj) return true;
    return activeMilestoneObj.target_units.includes(unit.id);
  });

  return (
    <div className="min-h-screen bg-[#0d0f12] dark:bg-[#0d0f12] text-zinc-100 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      {/* 1. Persistent Top Global Navigation Bar (Universidad Continental) */}
      <GlobalNavbar
        currentView={currentView}
        currentCareerId={selectedCareerId}
        currentCourseName={activeCourse?.name || 'Matemática Discreta II'}
        onNavigateToCareers={handleNavigateToCareers}
        onSelectCourse={handleSelectCourse}
        onOpenTutor={handleOpenTutor}
        onOpenDocentes={() => {
          setCurrentView('course_roadmap');
          setActiveNavTab('docentes');
        }}
      />

      {/* 2. Main View: Careers Directory OR Course Roadmap Flow */}
      {currentView === 'careers_home' ? (
        <CareersHomeView onSelectCourse={handleSelectCourse} />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Top Banner Navigation matching roadmap.sh */}
          <div className="bg-[#12151a] border-b border-zinc-800">
            {/* Breadcrumb row to jump back to Careers */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3">
              <button
                onClick={handleNavigateToCareers}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>← Volver a Explorar Carreras</span>
              </button>
            </div>

            <RoadmapTopNav
              careerName={activeCareer?.name}
              courseName={activeCourse?.name}
              cycleName={activeCourse?.cycle}
              milestones={currentCourseRoadmap.milestones}
              selectedMilestone={selectedMilestone}
              onSelectMilestone={setSelectedMilestone}
              onOpenMilestoneDrawer={handleOpenMilestoneDrawer}
              onOpenTutor={handleOpenTutor}
              onOpenExercises={handleOpenExercises}
              completedCount={completedCount}
              totalCount={totalCount}
              activeTab={activeNavTab}
              onSelectTab={setActiveNavTab}
            />
          </div>

          {/* Main Layout Area: Floating Socials + Sidebar + Visual Flowchart Canvas or Professors View */}
          <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 flex-1 flex flex-col">
            <div className="relative flex items-start gap-4 lg:gap-6">

              {/* Floating Vertical Social Share Bar */}
              <div className="hidden xl:flex flex-col gap-2 sticky top-20 z-30 shrink-0 text-zinc-400 pt-2">
                <button
                  title="Compartir en X"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=Roadmap%20${encodeURIComponent(activeCourse?.name || '')}`, '_blank')}
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  ✕
                </button>
                <button
                  title="Compartir en Facebook"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-900 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  f
                </button>
                <button
                  title="Discutir en Hacker News"
                  onClick={() => window.open('https://news.ycombinator.com', '_blank')}
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-900 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  Y
                </button>
                <button
                  title="Comunidad en Reddit"
                  onClick={() => window.open('https://reddit.com', '_blank')}
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-900 hover:bg-orange-600 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  ●
                </button>
              </div>

              {/* Left Column Sidebar */}
              <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-20">
                <RoadmapSidebar
                  importanceFilter={importanceFilter}
                  onSelectImportance={setImportanceFilter}
                  onOpenExercises={handleOpenExercises}
                  onSelectDocentes={() => setActiveNavTab('docentes')}
                  onSelectExamenes={() => setActiveNavTab('examenes')}
                  selectedCycle={selectedCycle}
                  onSelectCycle={handleSelectCycle}
                  coursesForSelectedCycle={coursesForCurrentCycle}
                  activeCourseId={selectedCourseId}
                  onSelectCourse={(courseId) => handleSelectCourse(selectedCareerId, courseId)}
                />
              </div>

              {/* Center Main Content Area: Roadmap Visual Flowchart OR Professors Section OR Past Exams Gallery OR Dynamic Syllabus Flowchart */}
              <main className="flex-1 w-full min-w-0 bg-[#12151a] border border-zinc-800 rounded-xl shadow-lg overflow-hidden">
                {activeNavTab === 'docentes' ? (
                  <ProfessorsSection
                    professors={currentCourseRoadmap.professors || []}
                    onOpenTutorWithProfessorPrompt={handleOpenTutorWithProfessor}
                  />
                ) : activeNavTab === 'examenes' ? (
                  <PastExamsGallery
                    currentCourseId={selectedCourseId}
                    currentCourseName={activeCourse?.name || 'Matemática Discreta 2'}
                    onOpenTutorWithExamPrompt={handleOpenTutorWithExam}
                  />
                ) : selectedCourseId === 'matematica-discreta-2' ? (
                  <RoadmapVisualCanvas
                    units={visibleUnits}
                    completedNodeIds={completedNodeIds}
                    onToggleComplete={handleToggleComplete}
                    onSelectNode={handleOpenNodeDrawer}
                    onOpenExercises={handleOpenExercises}
                    onOpenTutor={handleOpenTutor}
                    filterImportance={importanceFilter}
                  />
                ) : (
                  <DynamicCourseRoadmapCanvas
                    units={visibleUnits}
                    completedNodeIds={completedNodeIds}
                    onToggleComplete={handleToggleComplete}
                    onSelectNode={handleOpenNodeDrawer}
                    onOpenExercises={handleOpenExercises}
                    onOpenTutor={handleOpenTutor}
                    filterImportance={importanceFilter}
                    courseName={activeCourse?.name || ''}
                    courseCode={activeCourse?.code || ''}
                    cycleName={activeCourse?.cycle || selectedCycle}
                    credits={activeCourse?.credits || 3}
                  />
                )}
              </main>
            </div>
          </div>

          {/* Slide-over Right Drawer */}
          <ResourceDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            node={drawerNode}
            milestone={drawerMilestone}
            isCompleted={drawerNode ? completedNodeIds.has(drawerNode.id) : false}
            onToggleComplete={handleToggleComplete}
            initialTab={drawerTab}
          />
        </div>
      )}

      {/* Global Minimalistic Footer */}
      <footer className="border-t border-zinc-800 bg-[#12151a] py-6 text-center text-xs text-zinc-400 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            Universidad Continental • Portal de Rutas de Estudio y Roadmaps Académicos 2026
          </span>
          <button
            onClick={handleNavigateToCareers}
            className="text-amber-400 font-bold hover:underline cursor-pointer"
          >
            Explorar todas las Carreras Universitarias
          </button>
        </div>
      </footer>
    </div>
  );
}
