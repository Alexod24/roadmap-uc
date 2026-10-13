'use client';

import React, { useState, useEffect } from 'react';
import { matematicaDiscreta2Data } from '@/data/courses/matematica-discreta-2';
import { RoadmapTopNav } from '@/components/RoadmapTopNav';
import { RoadmapSidebar } from '@/components/RoadmapSidebar';
import { RoadmapVisualCanvas } from '@/components/RoadmapVisualCanvas';
import { ResourceDrawer } from '@/components/ResourceDrawer';
import { RoadmapNode, EvaluationMilestone, AcademicUnit } from '@/types/roadmap';

const STORAGE_KEY = 'roadmap_uc_matematica_discreta_2_progress';

export default function Home() {
  const [completedNodeIds, setCompletedNodeIds] = useState<Set<string>>(new Set());
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [importanceFilter, setImportanceFilter] = useState<string | null>(null);

  // State for the Right Slide-over Resource Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerNode, setDrawerNode] = useState<RoadmapNode | null>(null);
  const [drawerMilestone, setDrawerMilestone] = useState<EvaluationMilestone | null>(null);

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

  // Open right drawer when clicking a topic/node
  const handleOpenNodeDrawer = (node: RoadmapNode) => {
    setDrawerNode(node);
    setDrawerMilestone(null);
    setIsDrawerOpen(true);
  };

  // Open right drawer when clicking an evaluation milestone
  const handleOpenMilestoneDrawer = (milestone: EvaluationMilestone) => {
    setDrawerMilestone(milestone);
    setDrawerNode(null);
    setIsDrawerOpen(true);
  };

  // Open right drawer when clicking a unit header
  const handleOpenUnitDrawer = (unit: AcademicUnit) => {
    if (unit.nodes.length > 0) {
      handleOpenNodeDrawer(unit.nodes[0]);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Total nodes calculation
  const allNodes = matematicaDiscreta2Data.units.flatMap((u) => u.nodes);
  const totalCount = allNodes.length;
  const completedCount = completedNodeIds.size;

  // Filter units according to active milestone
  const activeMilestoneObj = selectedMilestone
    ? matematicaDiscreta2Data.milestones.find((m) => m.code === selectedMilestone)
    : null;

  const visibleUnits = matematicaDiscreta2Data.units.filter((unit) => {
    if (!activeMilestoneObj) return true;
    return activeMilestoneObj.target_units.includes(unit.id);
  });

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-zinc-900 flex flex-col font-sans">
      {/* Top Banner Navigation (roadmap.sh style) */}
      <RoadmapTopNav
        milestones={matematicaDiscreta2Data.milestones}
        selectedMilestone={selectedMilestone}
        onSelectMilestone={setSelectedMilestone}
        onOpenMilestoneDrawer={handleOpenMilestoneDrawer}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      {/* Main Container: Sidebar + Roadmap Canvas */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sticky Sidebar */}
        <div className="w-full lg:w-64 lg:sticky lg:top-6 shrink-0">
          <RoadmapSidebar
            importanceFilter={importanceFilter}
            onSelectImportance={setImportanceFilter}
          />
        </div>

        {/* Center/Right Interactive Visual Roadmap Tree */}
        <div className="flex-1 w-full bg-white border-2 border-zinc-900 rounded-2xl p-4 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[600px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-600">
              Lienzo de Aprendizaje Jerárquico • Haz clic en un tema para ver recursos gratis
            </div>
            {selectedMilestone && (
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded border border-blue-300">
                Filtrando por: Hito {selectedMilestone}
              </span>
            )}
          </div>

          <RoadmapVisualCanvas
            units={visibleUnits}
            completedNodeIds={completedNodeIds}
            onToggleComplete={handleToggleComplete}
            onSelectNode={handleOpenNodeDrawer}
            onSelectUnit={handleOpenUnitDrawer}
            filterImportance={importanceFilter}
          />
        </div>
      </main>

      {/* Slide-over Right Navbar (Drawer) for Community Resources and AI Tutor */}
      <ResourceDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        node={drawerNode}
        milestone={drawerMilestone}
        isCompleted={drawerNode ? completedNodeIds.has(drawerNode.id) : false}
        onToggleComplete={handleToggleComplete}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 mt-auto">
        Academic Roadmap Engine • Universidad Continental • Carrera de Ingeniería de Sistemas e Informática
      </footer>
    </div>
  );
}
