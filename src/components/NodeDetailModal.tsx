'use client';

import React from 'react';
import { RoadmapNode } from '@/types/roadmap';
import { X, CheckCircle, Flame, AlertTriangle, BookOpen, Wrench, ArrowRight } from 'lucide-react';

interface NodeDetailModalProps {
  node: RoadmapNode | null;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  isCompleted,
  onToggleComplete
}) => {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-zinc-200 flex items-start justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                node.importance === 'Crítico'
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : node.importance === 'Alto'
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}>
                {node.importance}
              </span>
              {node.prerequisites.length > 0 && (
                <span className="text-xs text-zinc-500 font-mono">
                  Prerrequisitos: {node.prerequisites.join(', ')}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 leading-snug">
              {node.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Primeros Principios */}
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Primeros Principios
            </div>
            <p className="text-zinc-700 leading-relaxed">
              {node.first_principles}
            </p>
          </div>

          {/* El 80/20 del Examen */}
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              El 80/20 del Examen (Lo que evalúan sí o sí)
            </div>
            <p className="text-amber-950 leading-relaxed">
              {node.exam_80_20}
            </p>
          </div>

          {/* Trampa Típica */}
          <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider mb-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Trampa Típica (Puntos perdidos en evaluaciones pasadas)
            </div>
            <p className="text-rose-950 leading-relaxed">
              {node.common_pitfall}
            </p>
          </div>

          {/* Herramientas */}
          {node.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold">
                <Wrench className="w-4 h-4 text-zinc-400" />
                Herramientas recomendadas:
              </div>
              {node.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* Reto de Acción */}
          <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <ArrowRight className="w-4 h-4 text-emerald-600" />
                Reto Práctico Inmediato
              </div>
              <button
                onClick={() => onToggleComplete(node.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer border flex items-center gap-1.5 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {isCompleted ? 'Completado ✓' : 'Marcar como dominado'}
              </button>
            </div>
            <p className="text-emerald-950 leading-relaxed font-medium">
              {node.action_challenge}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
