'use client';

import React, { useState, useEffect } from 'react';
import {
  PastExamResource,
  initialPastExams,
  ExamFeedbackComment
} from '@/data/past-exams';
import {
  Upload,
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
  Eye,
  CheckCircle,
  FileText,
  Calendar,
  User,
  MapPin,
  ExternalLink,
  X,
  AlertCircle,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Share2,
  Download,
  Plus
} from 'lucide-react';

interface PastExamsGalleryProps {
  currentCourseId?: string;
  currentCourseName?: string;
  onOpenTutorWithExamPrompt?: (examTitle: string) => void;
}

const STORAGE_KEY = 'roadmap_uc_community_past_exams_v1';

export const PastExamsGallery: React.FC<PastExamsGalleryProps> = ({
  currentCourseId,
  currentCourseName = 'Matemática Discreta 2',
  onOpenTutorWithExamPrompt,
}) => {
  const [exams, setExams] = useState<PastExamResource[]>(initialPastExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvalType, setSelectedEvalType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyCurrentCourse, setOnlyCurrentCourse] = useState<boolean>(true);

  // Modal view for exam preview & comments
  const [selectedExam, setSelectedExam] = useState<PastExamResource | null>(null);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    term: '2025-2',
    evalType: 'Examen Parcial' as PastExamResource['evalType'],
    professorName: '',
    campus: 'Huancayo',
    modality: 'Presencial' as PastExamResource['modality'],
    difficulty: 'Moderado' as PastExamResource['difficulty'],
    solvedStatus: 'Resuelto Paso a Paso' as PastExamResource['solvedStatus'],
    keyTopics: '',
    description: '',
    imageUrl: '',
    uploaderName: '',
  });

  // Local upvotes tracking
  const [upvotedExamIds, setUpvotedExamIds] = useState<Set<string>>(new Set());

  // New comment input inside detail modal
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExams(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading past exams from storage:', e);
    }
  }, []);

  // Save to localStorage helper
  const persistExams = (newExams: PastExamResource[]) => {
    setExams(newExams);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newExams));
    } catch (e) {
      console.error('Error saving past exams:', e);
    }
  };

  // Upvote an exam
  const handleToggleUpvote = (examId: string) => {
    const isUpvoted = upvotedExamIds.has(examId);
    setUpvotedExamIds((prev) => {
      const next = new Set(prev);
      if (isUpvoted) {
        next.delete(examId);
      } else {
        next.add(examId);
      }
      return next;
    });

    const updated = exams.map((ex) => {
      if (ex.id === examId) {
        return {
          ...ex,
          upvotes: isUpvoted ? Math.max(0, ex.upvotes - 1) : ex.upvotes + 1,
        };
      }
      return ex;
    });
    persistExams(updated);

    if (selectedExam && selectedExam.id === examId) {
      setSelectedExam((prev) =>
        prev
          ? {
              ...prev,
              upvotes: isUpvoted ? Math.max(0, prev.upvotes - 1) : prev.upvotes + 1,
            }
          : null
      );
    }
  };

  // Handle uploading a new past exam
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFormData.title.trim()) {
      alert('Por favor introduce un título representativo para el examen.');
      return;
    }

    const newExam: PastExamResource = {
      id: `exam-custom-${Date.now()}`,
      courseId: currentCourseId || 'matematica-discreta-2',
      courseName: currentCourseName,
      title: uploadFormData.title,
      term: uploadFormData.term,
      evalType: uploadFormData.evalType,
      professorName: uploadFormData.professorName.trim() || 'Cátedra Oficial UC',
      campus: uploadFormData.campus,
      modality: uploadFormData.modality,
      difficulty: uploadFormData.difficulty,
      solvedStatus: uploadFormData.solvedStatus,
      keyTopics: uploadFormData.keyTopics
        ? uploadFormData.keyTopics.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Balotario Oficial', 'Examen'],
      description: uploadFormData.description || 'Examen aportado por la comunidad estudiantil de la Universidad Continental.',
      imageUrl:
        uploadFormData.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      fileType: 'image',
      upvotes: 1,
      views: 12,
      uploadedBy: uploadFormData.uploaderName.trim() || 'Estudiante UC Anónimo',
      uploadDate: 'Hace un momento',
      comments: [],
    };

    const nextList = [newExam, ...exams];
    persistExams(nextList);
    setIsUploadModalOpen(false);

    // Reset form
    setUploadFormData({
      title: '',
      term: '2025-2',
      evalType: 'Examen Parcial',
      professorName: '',
      campus: 'Huancayo',
      modality: 'Presencial',
      difficulty: 'Moderado',
      solvedStatus: 'Resuelto Paso a Paso',
      keyTopics: '',
      description: '',
      imageUrl: '',
      uploaderName: '',
    });

    alert('¡Examen subido con éxito a la galería de la comunidad!');
  };

  // Handle adding a student feedback comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam || !newCommentText.trim()) return;

    const newComment: ExamFeedbackComment = {
      id: `comment-${Date.now()}`,
      author: commentAuthor.trim() || 'Compañero Continental',
      campus: selectedExam.campus,
      date: 'Hoy',
      text: newCommentText.trim(),
      upvotes: 0,
    };

    const updatedExam: PastExamResource = {
      ...selectedExam,
      comments: [newComment, ...selectedExam.comments],
    };

    const updatedList = exams.map((ex) => (ex.id === updatedExam.id ? updatedExam : ex));
    persistExams(updatedList);
    setSelectedExam(updatedExam);
    setNewCommentText('');
    setCommentAuthor('');
  };

  // Filtered exams
  const filteredExams = exams.filter((exam) => {
    // Course filter toggle
    if (onlyCurrentCourse && currentCourseId) {
      if (exam.courseId !== currentCourseId) return false;
    }

    // Evaluation type filter
    if (selectedEvalType !== 'all' && exam.evalType !== selectedEvalType) {
      return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all' && exam.difficulty !== selectedDifficulty) {
      return false;
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = exam.title.toLowerCase().includes(q);
      const matchProf = exam.professorName?.toLowerCase().includes(q);
      const matchTerm = exam.term.toLowerCase().includes(q);
      const matchTopics = exam.keyTopics.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchProf && !matchTerm && !matchTopics) return false;
    }

    return true;
  });

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-[#12151a] text-zinc-100 flex flex-col gap-6 font-sans">
      {/* 1. Header Banner */}
      <div className="bg-[#181b22] border border-zinc-700/80 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              Banco Colaborativo UC
            </span>
            <span className="text-[11px] text-zinc-400 font-semibold">
              Exámenes Pasados & Claves de Calificación
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Galería de Exámenes Pasados y Retroalimentación
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
            Revisa fotos de evaluaciones oficiales tomadas en semestres anteriores, guías resueltas paso a paso, comentarios sobre qué vino en cada pregunta y sube tus propios exámenes para apoyar a la comunidad de <strong className="text-zinc-200">{currentCourseName}</strong>.
          </p>
        </div>

        {/* Upload Action Button */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="shrink-0 flex items-center justify-center gap-2 bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black px-5 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>Subir Examen o Recurso</span>
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-[#181b22]/90 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por tema (ej. Dijkstra, Normalización), docente, o ciclo..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Eval Type Filter */}
          <select
            value={selectedEvalType}
            onChange={(e) => setSelectedEvalType(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs py-2 px-3 rounded-lg focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">Todas las Evaluaciones</option>
            <option value="Consolidado 1">Consolidado 1 (C1)</option>
            <option value="Examen Parcial">Examen Parcial (EP)</option>
            <option value="Consolidado 2">Consolidado 2 (C2)</option>
            <option value="Examen Final">Examen Final (EF)</option>
            <option value="Sustitutorio">Sustitutorio</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs py-2 px-3 rounded-lg focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">Dificultad (Todas)</option>
            <option value="Accesible">Accesible</option>
            <option value="Moderado">Moderado</option>
            <option value="Difícil">Difícil</option>
            <option value="Muy Exigente">Muy Exigente</option>
          </select>

          {/* Toggle: Only current course */}
          <button
            onClick={() => setOnlyCurrentCourse(!onlyCurrentCourse)}
            className={`text-xs font-bold px-3 py-2 rounded-lg border transition-all cursor-pointer ${
              onlyCurrentCourse
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white'
            }`}
          >
            {onlyCurrentCourse ? `✓ Solo ${currentCourseName}` : 'Ver Todos los Cursos'}
          </button>
        </div>
      </div>

      {/* 3. Grid Gallery of Exams */}
      {filteredExams.length === 0 ? (
        <div className="bg-[#181b22] border border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3 text-2xl">
            📑
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            No se encontraron exámenes para este criterio
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mb-4">
            Sé el primer estudiante en subir una foto de tu examen parcial o consolidado para compartirlo con la comunidad.
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
          >
            + Subir Examen Ahora
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const isUpvoted = upvotedExamIds.has(exam.id);

            return (
              <div
                key={exam.id}
                onClick={() => setSelectedExam(exam)}
                className="group bg-[#181b22] border border-zinc-800 hover:border-amber-400/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer"
              >
                {/* Photo Preview Container */}
                <div className="relative h-44 w-full bg-zinc-950 overflow-hidden">
                  <img
                    src={exam.imageUrl}
                    alt={exam.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181b22] via-transparent to-black/30" />

                  {/* Badges on top of Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-zinc-950/80 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-zinc-700">
                      {exam.evalType}
                    </span>
                    <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {exam.term}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        exam.solvedStatus === 'Resuelto Paso a Paso'
                          ? 'bg-emerald-600 text-white'
                          : exam.solvedStatus === 'Con Rúbrica y Clave'
                          ? 'bg-amber-500 text-zinc-950'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {exam.solvedStatus}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300">
                    <span className="font-semibold truncate max-w-[200px]">
                      {exam.professorName}
                    </span>
                    <span className="text-[10px] bg-zinc-900/80 px-2 py-0.5 rounded text-zinc-400 border border-zinc-800">
                      {exam.campus}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm sm:text-[15px] text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {exam.description}
                    </p>

                    {/* Key Topics Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exam.keyTopics.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-zinc-900 text-zinc-300 border border-zinc-700/60 px-2 py-0.5 rounded-full"
                        >
                          #{topic}
                        </span>
                      ))}
                      {exam.keyTopics.length > 3 && (
                        <span className="text-[10px] text-zinc-500 self-center">
                          +{exam.keyTopics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Upvote & Feedback Counts */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-3">
                      {/* Upvote Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleUpvote(exam.id);
                        }}
                        className={`flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${
                          isUpvoted ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-amber-400' : ''}`} />
                        <span>{exam.upvotes}</span>
                      </button>

                      {/* Comments Count */}
                      <div className="flex items-center gap-1 text-xs">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{exam.comments.length}</span>
                      </div>
                    </div>

                    <span className="text-[11px] text-zinc-500 font-medium">
                      Subido por {exam.uploadedBy}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. DETAIL & FEEDBACK MODAL */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#181b22] border border-zinc-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between gap-3 bg-[#12151a]">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-amber-400 text-zinc-950 font-black px-2 py-0.5 rounded uppercase">
                  {selectedExam.evalType}
                </span>
                <span className="text-xs font-bold text-zinc-300">
                  {selectedExam.term} • Sede {selectedExam.campus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onOpenTutorWithExamPrompt) {
                      onOpenTutorWithExamPrompt(selectedExam.title);
                    }
                  }}
                  className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Resolver con Tutor IA</span>
                </button>
                <button
                  onClick={() => setSelectedExam(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Exam Title & Meta */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {selectedExam.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mt-1.5">
                  <span><strong>Curso:</strong> {selectedExam.courseName}</span>
                  <span><strong>Docente:</strong> {selectedExam.professorName}</span>
                  <span><strong>Dificultad:</strong> {selectedExam.difficulty}</span>
                  <span><strong>Estado:</strong> {selectedExam.solvedStatus}</span>
                </div>
              </div>

              {/* Full Image Gallery Viewer */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden relative group">
                <img
                  src={selectedExam.imageUrl}
                  alt={selectedExam.title}
                  className="w-full max-h-[500px] object-contain mx-auto"
                />
                <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                  <span>Foto del Enunciado / Examen Físico</span>
                  <a
                    href={selectedExam.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Abrir Imagen en Pantalla Completa</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Description & Recommendations */}
              <div className="bg-[#12151a] border border-zinc-800/90 rounded-xl p-4">
                <h4 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider mb-2">
                  Detalles y Contenido del Examen
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedExam.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedExam.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium bg-zinc-900 border border-zinc-700 text-zinc-200 px-2.5 py-0.5 rounded-full"
                    >
                      ✓ {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Student Feedback & Tips Section */}
              <div className="border-t border-zinc-800 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Retroalimentación & Consejos de Estudiantes ({selectedExam.comments.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => handleToggleUpvote(selectedExam.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      upvotedExamIds.has(selectedExam.id)
                        ? 'bg-amber-400 text-zinc-950 border-amber-400'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Útil ({selectedExam.upvotes})</span>
                  </button>
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="bg-[#12151a] border border-zinc-800 rounded-xl p-4 mb-4">
                  <div className="text-xs font-bold text-zinc-300 mb-2">
                    ¿Diste este examen o tienes algún tip sobre cómo califica el docente?
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="Tu nombre o alias (ej. Juan - Base 24)"
                      className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Escribe tu tip o retroalimentación (ej. 'La pregunta 2 bajaba puntos si no explicabas la justificación formal')..."
                    rows={2}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 mb-2 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black px-4 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Publicar Retroalimentación
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-2.5">
                  {selectedExam.comments.length === 0 ? (
                    <div className="text-xs text-zinc-500 italic py-2">
                      Aún no hay comentarios en este examen. ¡Sé el primero en compartir tu retroalimentación!
                    </div>
                  ) : (
                    selectedExam.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-xs"
                      >
                        <div className="flex items-center justify-between text-zinc-400 mb-1">
                          <span className="font-bold text-zinc-200">{comment.author}</span>
                          <span className="text-[10px] text-zinc-500">{comment.date}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. UPLOAD EXAM MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#181b22] border border-zinc-700 rounded-2xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-[#12151a]">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-white text-base">
                  Subir Examen Pasado o Recurso de Evaluación
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUploadSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">
                  Título del Examen / Evaluación *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Examen Parcial 2025-2 - Grafos y Recurrencias"
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Tipo de Evaluación</label>
                  <select
                    value={uploadFormData.evalType}
                    onChange={(e) =>
                      setUploadFormData({
                        ...uploadFormData,
                        evalType: e.target.value as PastExamResource['evalType'],
                      })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Consolidado 1">Consolidado 1 (C1)</option>
                    <option value="Examen Parcial">Examen Parcial (EP)</option>
                    <option value="Consolidado 2">Consolidado 2 (C2)</option>
                    <option value="Examen Final">Examen Final (EF)</option>
                    <option value="Sustitutorio">Sustitutorio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Semestre / Ciclo</label>
                  <input
                    type="text"
                    placeholder="Ej: 2025-2"
                    value={uploadFormData.term}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, term: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Docente a cargo</label>
                  <input
                    type="text"
                    placeholder="Ej: Ing. Carlos Mendoza"
                    value={uploadFormData.professorName}
                    onChange={(e) =>
                      setUploadFormData({ ...uploadFormData, professorName: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Sede / Campus</label>
                  <select
                    value={uploadFormData.campus}
                    onChange={(e) =>
                      setUploadFormData({ ...uploadFormData, campus: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Huancayo">Huancayo</option>
                    <option value="Lima">Lima</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Cusco">Cusco</option>
                    <option value="A Distancia">A Distancia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Nivel de Dificultad</label>
                  <select
                    value={uploadFormData.difficulty}
                    onChange={(e) =>
                      setUploadFormData({
                        ...uploadFormData,
                        difficulty: e.target.value as PastExamResource['difficulty'],
                      })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Accesible">Accesible</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Difícil">Difícil</option>
                    <option value="Muy Exigente">Muy Exigente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Estado de Resolución</label>
                  <select
                    value={uploadFormData.solvedStatus}
                    onChange={(e) =>
                      setUploadFormData({
                        ...uploadFormData,
                        solvedStatus: e.target.value as PastExamResource['solvedStatus'],
                      })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Resuelto Paso a Paso">Resuelto Paso a Paso</option>
                    <option value="Con Rúbrica y Clave">Con Rúbrica y Clave</option>
                    <option value="Enunciado Oficial">Enunciado Oficial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">
                  Foto o Captura del Examen (Subir archivo o URL)
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setUploadFormData((prev) => ({
                              ...prev,
                              imageUrl: event.target?.result as string,
                            }));
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#ffe500] file:text-zinc-950 hover:file:bg-amber-400 cursor-pointer bg-zinc-900 border border-zinc-700 rounded-lg p-2"
                  />
                  <div className="text-[11px] text-zinc-400 text-center font-semibold">ó ingresa un enlace web:</div>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... o enlace de tu imagen"
                    value={uploadFormData.imageUrl.startsWith('data:') ? '' : uploadFormData.imageUrl}
                    onChange={(e) =>
                      setUploadFormData({ ...uploadFormData, imageUrl: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
                {uploadFormData.imageUrl && (
                  <div className="mt-2 p-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <span className="text-[11px] text-emerald-400 font-bold">✓ Imagen cargada</span>
                    <img
                      src={uploadFormData.imageUrl}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded border border-zinc-700"
                    />
                  </div>
                )}
                <span className="text-[10px] text-zinc-500 mt-0.5 block">
                  Formatos aceptados: JPG, PNG, WEBP o capturas de cámara del examen físico.
                </span>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">
                  Temas Evaluados (separados por coma)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Dijkstra, Kruskal, Isomorfismo, Inducción"
                  value={uploadFormData.keyTopics}
                  onChange={(e) =>
                    setUploadFormData({ ...uploadFormData, keyTopics: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">
                  Descripción o Consejos Clave
                </label>
                <textarea
                  rows={2}
                  placeholder="Explica qué preguntas vinieron, si permitieron formulario, calculadora o notas de advertencia..."
                  value={uploadFormData.description}
                  onChange={(e) =>
                    setUploadFormData({ ...uploadFormData, description: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Tu Nombre o Alias</label>
                <input
                  type="text"
                  placeholder="Ej: Daniel R. (Base 23)"
                  value={uploadFormData.uploaderName}
                  onChange={(e) =>
                    setUploadFormData({ ...uploadFormData, uploaderName: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#ffe500] hover:bg-amber-400 text-zinc-950 font-black cursor-pointer shadow-sm transition-colors"
                >
                  Publicar en la Galería
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
