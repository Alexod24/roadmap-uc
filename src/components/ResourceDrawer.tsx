'use client';

import React, { useState } from 'react';
import { RoadmapNode, EvaluationMilestone, CommunityResource } from '@/types/roadmap';
import {
  X,
  BookOpen,
  Sparkles,
  CheckCircle,
  ThumbsUp,
  ExternalLink,
  Flame,
  AlertTriangle,
  Send,
  MessageSquare,
  ShieldCheck,
  Video,
  FileText,
  BookmarkCheck,
  HelpCircle,
  Layers
} from 'lucide-react';

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  node: RoadmapNode | null;
  milestone: EvaluationMilestone | null;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const ResourceDrawer: React.FC<ResourceDrawerProps> = ({
  isOpen,
  onClose,
  node,
  milestone,
  isCompleted,
  onToggleComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'ai_tutor'>('resources');
  const [userPrompt, setUserPrompt] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  if (!isOpen || (!node && !milestone)) return null;

  const title = node ? node.title : `${milestone?.name} (${milestone?.code})`;
  const description = node
    ? node.first_principles
    : milestone?.description || `Hito de evaluación correspondiente a la semana ${milestone?.week} con ponderación de ${milestone?.weight_percentage}% en la nota final.`;

  const resources: CommunityResource[] = node
    ? node.community_resources || []
    : milestone?.community_resources || [];

  const handleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAskTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    const question = userPrompt;
    setUserPrompt('');
    setAiChat((prev) => [
      ...prev,
      { role: 'user', text: question },
      {
        role: 'assistant',
        text: `En el contexto de "${title}" para Matemática Discreta 2 (UC):\n\nEl punto clave a recordar para tus exámenes es dominar el procedimiento formal paso a paso. Recuerda verificar las condiciones necesarias antes de proceder con el algoritmo y justificar cada transición según la rúbrica docente de la Universidad Continental.`,
      },
    ]);
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Right Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] md:w-[540px] bg-white border-l border-zinc-300 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Top Control Bar (Like roadmap.sh: Resources | AI Tutor | Learning | Done | Skip | X) */}
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between gap-2 bg-zinc-50/90">
          <div className="flex items-center gap-1.5 bg-zinc-200/80 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Recursos
            </button>
            <button
              onClick={() => setActiveTab('ai_tutor')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'ai_tutor'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Tutor
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {node && (
              <button
                onClick={() => onToggleComplete(node.id)}
                className={`text-xs px-2.5 py-1.5 rounded-md font-semibold border flex items-center gap-1 cursor-pointer transition-colors ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {isCompleted ? 'Dominado ✓' : 'Marcar Hecho'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-800 rounded-lg hover:bg-zinc-200/70 transition-colors cursor-pointer"
              aria-label="Cerrar panel lateral"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Header Title & Summary */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                {node ? `Tema • ${node.importance}` : `Hito de Examen • Sem ${milestone?.week}`}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {node ? 'Matemática Discreta 2' : `${milestone?.weight_percentage}% Nota Final`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 leading-tight">
              {title}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {description}
            </p>
          </div>

          {activeTab === 'resources' ? (
            <>
              {/* Highlight Official Community Recommendation */}
              <div className="border-2 border-amber-300 bg-amber-50/70 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Recomendación Verificada de la Comunidad UC
                  </span>
                  <span className="bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-mono text-[10px]">
                    100% GRATIS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900">
                  {node ? `Guía de Examen 80/20: ${node.title}` : `Pack de Supervivencia: ${milestone?.name}`}
                </h4>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Subido y verificado por estudiantes y ayudantes de cátedra que obtuvieron nota sobresaliente en el curso.
                </p>
              </div>

              {/* Free Community Resources List (roadmap.sh style) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-zinc-800">
                    <span className="text-emerald-600">💚</span> Recursos Gratuitos de la Comunidad
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    {resources.length} aportes
                  </span>
                </div>

                {resources.length > 0 ? (
                  <div className="space-y-2.5">
                    {resources.map((item) => {
                      const isUpvoted = upvotedIds.has(item.id);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 bg-white transition-all shadow-xs group"
                        >
                          <div className="flex items-start gap-2.5 flex-1 min-w-0 pr-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 mt-0.5 ${
                                item.type === 'Video'
                                  ? 'bg-rose-100 text-rose-700'
                                  : item.type === 'CheatSheet'
                                  ? 'bg-purple-100 text-purple-700'
                                  : item.type === 'Ejercicios'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {item.type}
                            </span>
                            <div className="flex-1 min-w-0">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors flex items-center gap-1 truncate"
                              >
                                <span className="truncate">{item.title}</span>
                                <ExternalLink className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                              <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                                <span>Por {item.author}</span>
                                {item.duration && <span>• {item.duration}</span>}
                                {item.isVerified && (
                                  <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                                    • Verificado ✓
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Upvote Pill */}
                          <button
                            onClick={() => handleUpvote(item.id)}
                            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border font-semibold transition-colors cursor-pointer shrink-0 ${
                              isUpvoted
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                            }`}
                            title="Votar recurso útil"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{item.upvotes + (isUpvoted ? 1 : 0)}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center border-2 border-dashed border-zinc-200 rounded-xl text-zinc-500 text-xs">
                    Sé el primero en compartir un resumen o video para este tema.
                  </div>
                )}
              </div>

              {/* Node-specific Exam Warnings & Challenge */}
              {node && (
                <div className="space-y-3 pt-2">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      El 80/20 del Examen:
                    </div>
                    <p className="leading-relaxed">{node.exam_80_20}</p>
                  </div>

                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-900">
                    <div className="font-bold flex items-center gap-1.5 text-rose-800 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Trampa Típica (Puntos Perdidos):
                    </div>
                    <p className="leading-relaxed">{node.common_pitfall}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* AI Tutor Tab */
            <div className="space-y-4">
              <div className="bg-zinc-100 p-3.5 rounded-xl text-xs text-zinc-700 leading-relaxed border border-zinc-200">
                Pregúntame cualquier duda sobre el procedimiento o las preguntas trampa de <strong>{title}</strong>.
              </div>

              {aiChat.length > 0 && (
                <div className="space-y-3">
                  {aiChat.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white ml-6 font-medium'
                          : 'bg-zinc-100 text-zinc-800 mr-6 border border-zinc-200 whitespace-pre-line'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Bar: AI Prompt Input (Matching roadmap.sh footer input) */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50">
          <form onSubmit={handleAskTutor} className="relative flex items-center">
            <span className="absolute left-3 text-xs text-zinc-400 font-medium flex items-center gap-1">
              ✨
            </span>
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder={`Pregunta a la IA sobre ${node ? node.title : milestone?.name}...`}
              className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-10 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all shadow-xs"
            />
            <button
              type="submit"
              disabled={!userPrompt.trim()}
              className="absolute right-2 p-1.5 bg-[#ffe500] hover:bg-[#fed700] disabled:opacity-40 text-zinc-900 rounded-md transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
              aria-label="Enviar pregunta"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
};
