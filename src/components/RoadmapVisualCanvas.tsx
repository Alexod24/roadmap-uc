'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { AcademicUnit, RoadmapNode } from '@/types/roadmap';
import { Check, Sparkles, HelpCircle } from 'lucide-react';

interface RoadmapVisualCanvasProps {
  units: AcademicUnit[];
  completedNodeIds: Set<string>;
  onToggleComplete: (id: string) => void;
  onSelectNode: (node: RoadmapNode) => void;
  onSelectUnit?: (unit: AcademicUnit) => void;
  onOpenExercises?: () => void;
  onOpenTutor?: () => void;
  filterImportance: string | null;
}

interface PathLine {
  id: string;
  d: string;
  isDotted: boolean;
  hasArrow: boolean;
}

export const RoadmapVisualCanvas: React.FC<RoadmapVisualCanvasProps> = ({
  units,
  completedNodeIds,
  onToggleComplete,
  onSelectNode,
  onSelectUnit,
  onOpenExercises,
  onOpenTutor,
  filterImportance,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<PathLine[]>([]);

  // Find node helper
  const allNodes = units.flatMap((u) => u.nodes);
  const getNode = (id: string) => allNodes.find((n) => n.id === id);

  // Measure and compute SVG paths between nodes
  const calculatePaths = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cRect = container.getBoundingClientRect();

    const getCenter = (el: Element | null, side: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center') => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const x = rect.left - cRect.left;
      const y = rect.top - cRect.top;

      switch (side) {
        case 'left':
          return { x, y: y + rect.height / 2 };
        case 'right':
          return { x: x + rect.width, y: y + rect.height / 2 };
        case 'top':
          return { x: x + rect.width / 2, y };
        case 'bottom':
          return { x: x + rect.width / 2, y: y + rect.height };
        default:
          return { x: x + rect.width / 2, y: y + rect.height / 2 };
      }
    };

    const newPaths: PathLine[] = [];

    // Connections definition: [fromId, toId, fromSide, toSide, isDotted, hasArrow]
    const connections: Array<{
      from: string;
      to: string;
      fromSide: 'left' | 'right' | 'top' | 'bottom';
      toSide: 'left' | 'right' | 'top' | 'bottom';
      isDotted: boolean;
      hasArrow: boolean;
    }> = [
      // Stage 1 -> Subtopics (right)
      { from: 'box-conteo', to: 'card-n-principio-mult', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-conteo', to: 'card-n-permutaciones', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-conteo', to: 'card-n-inclusion-exclusion', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-conteo', to: 'card-n-palomar', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },

      // Stage 1 -> Stage 2 (down arrow)
      { from: 'box-conteo', to: 'box-recurrencia', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 2 -> Subtopics (right)
      { from: 'box-recurrencia', to: 'card-n-recurrencias-lineales', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-recurrencia', to: 'card-n-coeficientes-indeterminados', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },

      // Stage 2 -> Stage 3 (down arrow)
      { from: 'box-recurrencia', to: 'box-grafos', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 3 -> Subtopics (right)
      { from: 'box-grafos', to: 'card-n-grafos-caminos', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-grafos', to: 'card-n-conectividad-subgrafos', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-grafos', to: 'card-n-isomorfismo-grafos', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-grafos', to: 'card-n-planares-coloreado', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },

      // Stage 3 -> Stage 4 (down arrow)
      { from: 'box-grafos', to: 'box-arboles', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 4 -> Subtopics (right)
      { from: 'box-arboles', to: 'card-n-arboles-expansion', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-arboles', to: 'card-n-mst-kruskal-prim', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },
      { from: 'box-arboles', to: 'card-n-dfs-bfs', fromSide: 'right', toSide: 'left', isDotted: true, hasArrow: false },

      // Stage 4 -> Stage 5 (down arrow)
      { from: 'box-arboles', to: 'box-algebraicas', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 5 -> Subtopics (LEFT)
      { from: 'box-algebraicas', to: 'card-n-grupos-subgrupos', fromSide: 'left', toSide: 'right', isDotted: true, hasArrow: false },
      { from: 'box-algebraicas', to: 'card-n-anillos-campos', fromSide: 'left', toSide: 'right', isDotted: true, hasArrow: false },

      // Stage 5 -> Stage 6 (down arrow or connection)
      { from: 'box-algebraicas', to: 'box-modelos', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 6 -> Left Subtopics
      { from: 'box-modelos', to: 'card-n-dfa-nfa', fromSide: 'left', toSide: 'right', isDotted: true, hasArrow: false },
      { from: 'box-modelos', to: 'card-n-gramaticas-modelos', fromSide: 'left', toSide: 'right', isDotted: true, hasArrow: false },
      { from: 'box-modelos', to: 'card-n-gramaticas-boole', fromSide: 'left', toSide: 'right', isDotted: true, hasArrow: false },
      { from: 'box-modelos', to: 'card-n-maquinas-turing-modelos', fromSide: 'left', toSide: 'right', isDotted: true, hasArrow: false },

      // Stage 6 -> Stage 7 (Álgebra de Boole on right)
      { from: 'box-modelos', to: 'box-boole', fromSide: 'right', toSide: 'left', isDotted: false, hasArrow: true },

      // Stage 7 -> Stage 8 (Gramáticas y Lenguajes down arrow)
      { from: 'box-boole', to: 'box-gramaticas', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 8 -> Stage 9 (Máquinas de Turing down arrow)
      { from: 'box-gramaticas', to: 'card-n-turing-final', fromSide: 'bottom', toSide: 'top', isDotted: false, hasArrow: true },

      // Stage 6 -> Tutor IA (bottom dotted)
      { from: 'box-modelos', to: 'btn-tutor-bottom', fromSide: 'bottom', toSide: 'top', isDotted: true, hasArrow: false },
    ];

    connections.forEach((conn, idx) => {
      const fromEl = container.querySelector(`[data-node-id="${conn.from}"]`);
      const toEl = container.querySelector(`[data-node-id="${conn.to}"]`);
      if (!fromEl || !toEl) return;

      const p1 = getCenter(fromEl, conn.fromSide);
      const p2 = getCenter(toEl, conn.toSide);
      if (!p1 || !p2) return;

      let d = '';
      if (!conn.isDotted) {
        // Direct or orthogonal line with arrow
        if (Math.abs(p1.x - p2.x) < 25) {
          // Vertical straight line
          d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
        } else if (Math.abs(p1.y - p2.y) < 25) {
          // Horizontal straight line
          d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
        } else {
          // Bent line
          const midX = (p1.x + p2.x) / 2;
          d = `M ${p1.x} ${p1.y} L ${midX} ${p1.y} L ${midX} ${p2.y} L ${p2.x} ${p2.y}`;
        }
      } else {
        // Smooth curved dotted bezier
        const dx = Math.abs(p2.x - p1.x) * 0.55;
        const sign = p2.x > p1.x ? 1 : -1;
        d = `M ${p1.x} ${p1.y} C ${p1.x + sign * dx} ${p1.y}, ${p2.x - sign * dx} ${p2.y}, ${p2.x} ${p2.y}`;
      }

      newPaths.push({
        id: `path-${idx}`,
        d,
        isDotted: conn.isDotted,
        hasArrow: conn.hasArrow,
      });
    });

    setPaths(newPaths);
  };

  useEffect(() => {
    calculatePaths();
    const handleResize = () => calculatePaths();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => calculatePaths());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const timer = setTimeout(calculatePaths, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [units, filterImportance]);

  // Subtopic Card Renderer
  const renderCard = (
    nodeId: string,
    fallbackTitle: string,
    defaultCheckColor: 'purple' | 'green' = 'purple',
    isOptionalBadge = false,
    customClass = ''
  ) => {
    const node = getNode(nodeId);
    const title = node?.title || fallbackTitle;
    const isDone = completedNodeIds.has(nodeId);
    const isOptional = isOptionalBadge || node?.isOptional;
    const checkColor = node?.checkColor || defaultCheckColor;

    return (
      <div
        data-node-id={`card-${nodeId}`}
        onClick={() => node && onSelectNode(node)}
        className={`relative group cursor-pointer transition-all duration-150 select-none ${customClass}`}
      >
        {/* Floating "Opcional" Green Badge */}
        {isOptional && (
          <span className="absolute -top-2.5 right-2 z-20 bg-[#16a34a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black/20 shadow-xs pointer-events-none">
            Opcional
          </span>
        )}

        {/* Card Body */}
        <div
          className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 ${
            isDone
              ? 'bg-[#dcfce7] border-emerald-900'
              : 'bg-[#fef08a] hover:bg-[#fde047]'
          }`}
        >
          <span
            className={`text-xs sm:text-[13px] font-bold text-zinc-950 leading-snug ${
              isDone ? 'line-through text-zinc-600' : ''
            }`}
          >
            {title}
          </span>

          {/* Interactive Checkmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(nodeId);
            }}
            title={isDone ? 'Marcar incompleto' : 'Marcar completado'}
            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-zinc-950 transition-colors ${
              isDone
                ? 'bg-emerald-600 text-white'
                : checkColor === 'purple'
                ? 'bg-[#7c3aed] text-white'
                : 'bg-[#16a34a] text-white'
            }`}
          >
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-auto min-w-[760px] py-6 px-4 bg-[#12151a] text-zinc-100"
    >
      {/* Dynamic SVG Layer for Real Connectors & Arrows */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="blue-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb" />
          </marker>
        </defs>

        {paths.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            stroke="#2563eb"
            strokeWidth={p.isDotted ? '2' : '2.5'}
            strokeDasharray={p.isDotted ? '3,4' : undefined}
            markerEnd={p.hasArrow ? 'url(#blue-arrow)' : undefined}
            className="transition-all duration-300"
          />
        ))}
      </svg>

      {/* Main Flow Layout */}
      <div className="flex flex-col gap-10 max-w-4xl mx-auto relative z-20">

        {/* SECTION 1: Fundamentos y Conteo */}
        <div className="grid grid-cols-[240px_1fr] gap-12 items-center">
          {/* Main Stage 1 Box */}
          <div
            data-node-id="box-conteo"
            className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Fundamentos y Conteo
          </div>

          {/* Subtopics Stack */}
          <div className="flex flex-col gap-2.5 max-w-md">
            {renderCard('n-principio-mult', '¿Qué es el principio multiplicativo?', 'purple', true)}
            {renderCard('n-permutaciones', 'Permutaciones y Combinaciones', 'purple', false)}
            {renderCard('n-inclusion-exclusion', 'Principio de Inclusión-Exclusión', 'purple', false)}
            {renderCard('n-palomar', 'Principio del Palomar', 'green', true)}
          </div>
        </div>

        {/* SECTION 2: Relaciones de Recurrencia */}
        <div className="grid grid-cols-[240px_1fr] gap-12 items-center">
          {/* Main Stage 2 Box */}
          <div
            data-node-id="box-recurrencia"
            className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Relaciones de Recurrencia
          </div>

          {/* Subtopics Stack */}
          <div className="flex flex-col gap-2.5 max-w-md">
            {renderCard('n-recurrencias-lineales', 'Recurrencias Lineales Homogéneas y No Homogéneas', 'green', false)}
            {renderCard('n-coeficientes-indeterminados', 'Método de Coeficientes Indeterminados', 'purple', false)}
          </div>
        </div>

        {/* SECTION 3: Teoría de Grafos */}
        <div className="grid grid-cols-[240px_1fr] gap-12 items-center">
          {/* Main Stage 3 Box */}
          <div
            data-node-id="box-grafos"
            className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Teoría de Grafos
          </div>

          {/* Subtopics Stack */}
          <div className="flex flex-col gap-2.5 max-w-md">
            {renderCard('n-grafos-caminos', 'Grafos, caminos y ciclos', 'green', true)}
            {renderCard('n-conectividad-subgrafos', 'Conectividad y Subgrafos', 'purple', true)}
            {renderCard('n-isomorfismo-grafos', 'Isomorfismo de Grafos', 'green', true)}
            {renderCard('n-planares-coloreado', 'Grafos Planares y Coloreado', 'green', true)}
          </div>
        </div>

        {/* SECTION 4: Árboles */}
        <div className="grid grid-cols-[240px_1fr] gap-12 items-center">
          {/* Main Stage 4 Box */}
          <div
            data-node-id="box-arboles"
            className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Árboles
          </div>

          {/* Subtopics Stack */}
          <div className="flex flex-col gap-2.5 max-w-md">
            {renderCard('n-arboles-expansion', 'Árboles de expansión', 'green', false)}
            {renderCard('n-mst-kruskal-prim', 'Árboles de Expansión Mínima (Kruskal, Prim)', 'purple', false)}
            {renderCard('n-dfs-bfs', 'Búsquedas DFS y BFS', 'green', false)}
          </div>
        </div>

        {/* SECTION 5 & LOWER FLOW: Estructuras Algebraicas, Modelos de Computación, Álgebra de Boole */}
        <div className="grid grid-cols-[220px_240px_220px] gap-8 items-start pt-4">

          {/* LEFT COLUMN: Estructuras Algebraicas Subtopics + Modelos de Computación Subtopics */}
          <div className="flex flex-col gap-3">
            {/* Connected to Estructuras Algebraicas */}
            <div className="space-y-2.5 pb-6">
              {renderCard('n-grupos-subgrupos', 'Grupos y Subgrupos', 'green', false)}
              {renderCard('n-anillos-campos', 'Anillos y Campos', 'green', false)}
            </div>

            {/* Connected to Modelos de Computación */}
            <div className="space-y-2.5 pt-4 border-t-2 border-zinc-200">
              {renderCard('n-dfa-nfa', 'Autómatas Finitos (DFA y NFA)', 'purple', false)}
              {renderCard('n-gramaticas-modelos', 'Gramáticas', 'green', false)}
              {renderCard('n-gramaticas-boole', 'Gramáticas e Boelios', 'green', false)}
              {renderCard('n-maquinas-turing-modelos', 'Máquinas de Turing', 'green', false)}
            </div>
          </div>

          {/* CENTER COLUMN: Estructuras Algebraicas & Modelos de Computación Blocks */}
          <div className="flex flex-col items-center gap-4">
            {/* Box 5: Estructuras Algebraicas */}
            <div
              data-node-id="box-algebraicas"
              className="w-full bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Estructuras Algebraicas
            </div>

            {/* Box 6: Modelos de Computación */}
            <div
              data-node-id="box-modelos"
              className="w-full bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Modelos de Computación
            </div>

            {/* Intermediate Practice Box in between */}
            <div className="w-full bg-[#181b22] border border-zinc-700/80 rounded-xl p-3 text-center shadow-md mt-6">
              <p className="text-xs font-semibold text-zinc-300 leading-snug mb-2.5">
                A estas alturas, deberías ser capaz de resolver problemas complejos de estructuras discretas.
              </p>
              <button
                type="button"
                onClick={() => onOpenExercises && onOpenExercises()}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs py-2 px-3 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
              >
                Ejercicios de Nivel Intermedio
              </button>
            </div>

            {/* Tutor IA Button at the bottom */}
            <div className="pt-6 w-full flex flex-col items-center">
              <button
                data-node-id="btn-tutor-bottom"
                type="button"
                onClick={() => onOpenTutor && onOpenTutor()}
                className="flex items-center justify-center gap-2 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-black shadow-md cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-zinc-950" />
                <span>Tutor IA</span>
                <span className="text-zinc-800 font-semibold">¿Tienes alguna duda? Pregunta aquí</span>
              </button>
              <span className="text-[11px] text-zinc-500 font-medium mt-1.5">
                Ai in Development
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Álgebra de Boole -> Gramáticas y Lenguajes -> Máquinas de Turing */}
          <div className="flex flex-col gap-8">
            {/* Box 7: Álgebra de Boole */}
            <div
              data-node-id="box-boole"
              className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Álgebra de Boole
            </div>

            {/* Box 8: Gramáticas y Lenguajes */}
            <div
              data-node-id="box-gramaticas"
              className="bg-[#ffe500] hover:bg-[#fed700] text-zinc-950 font-bold px-4 py-3 rounded-lg border-2 border-zinc-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center text-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Gramáticas y Lenguajes
            </div>

            {/* Stage 9 Card: Máquinas de Turing */}
            <div data-node-id="card-n-turing-final">
              {renderCard('n-turing-computabilidad', 'Máquinas de Turing', 'purple', false)}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
