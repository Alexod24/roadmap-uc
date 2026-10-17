export interface ExamFeedbackComment {
  id: string;
  author: string;
  campus: string;
  date: string;
  text: string;
  upvotes: number;
}

export interface PastExamResource {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  term: string; // e.g., '2025-2', '2025-1', '2024-2'
  evalType: 'Consolidado 1' | 'Examen Parcial' | 'Consolidado 2' | 'Examen Final' | 'Sustitutorio';
  professorName?: string;
  campus: string; // 'Huancayo' | 'Lima' | 'Arequipa' | 'Cusco' | 'A Distancia'
  modality: 'Presencial' | 'Semipresencial' | 'A Distancia';
  imageUrl: string;
  fileType: 'image' | 'pdf';
  description: string;
  difficulty: 'Accesible' | 'Moderado' | 'Difícil' | 'Muy Exigente';
  solvedStatus: 'Resuelto Paso a Paso' | 'Enunciado Oficial' | 'Con Rúbrica y Clave';
  keyTopics: string[];
  upvotes: number;
  views: number;
  uploadedBy: string;
  uploadDate: string;
  comments: ExamFeedbackComment[];
}

export const initialPastExams: PastExamResource[] = [
  {
    id: 'exam-md2-ep-2025-2',
    courseId: 'matematica-discreta-2',
    courseName: 'Matemática Discreta 2',
    title: 'Examen Parcial 2025-2 - Grafos, Árboles y Dijkstra',
    term: '2025-2',
    evalType: 'Examen Parcial',
    professorName: 'Ing. Carlos Mendoza',
    campus: 'Huancayo',
    modality: 'Presencial',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image',
    description: 'Enunciado completo de 4 preguntas: Dijkstra con pesos dirigidos, Kruskal con detección de ciclos, Isomorfismo de grafos con matriz de adyacencia y Árbol de Huffman.',
    difficulty: 'Difícil',
    solvedStatus: 'Resuelto Paso a Paso',
    keyTopics: ['Dijkstra', 'Kruskal', 'Isomorfismo', 'Árboles de Huffman'],
    upvotes: 84,
    views: 620,
    uploadedBy: 'Renato S. (Base 23)',
    uploadDate: 'Octubre 2025',
    comments: [
      {
        id: 'c-1',
        author: 'Diego V.',
        campus: 'Huancayo',
        date: 'Noviembre 2025',
        text: 'La pregunta 3 de isomorfismo vino exactamente igual que en las diapositivas de clase. Ojo con la traza de Dijkstra!',
        upvotes: 19,
      },
      {
        id: 'c-2',
        author: 'Valeria M.',
        campus: 'Lima',
        date: 'Diciembre 2025',
        text: 'Recomiendo resolver este examen antes del parcial, el profesor califica estricto la comprobación de árboles generadores.',
        upvotes: 11,
      }
    ]
  },
  {
    id: 'exam-md2-c1-2025-2',
    courseId: 'matematica-discreta-2',
    courseName: 'Matemática Discreta 2',
    title: 'Consolidado 1 (C1) - Recurrencias e Inclusión-Exclusión',
    term: '2025-2',
    evalType: 'Consolidado 1',
    professorName: 'Dra. María Elena Ramos',
    campus: 'Lima',
    modality: 'Semipresencial',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image',
    description: 'Resolución de relaciones de recurrencia homogéneas de segundo grado con raíces complejas y teorema del binomio.',
    difficulty: 'Moderado',
    solvedStatus: 'Con Rúbrica y Clave',
    keyTopics: ['Recurrencias Lineales', 'Inclusión-Exclusión', 'Ecuación Característica'],
    upvotes: 56,
    views: 430,
    uploadedBy: 'Camila P. (Sistemas Lima)',
    uploadDate: 'Septiembre 2025',
    comments: [
      {
        id: 'c-3',
        author: 'José L.',
        campus: 'Lima',
        date: 'Octubre 2025',
        text: 'La rúbrica dio 4 puntos completos por plantear la ecuación característica aunque falle el cálculo final.',
        upvotes: 8,
      }
    ]
  },
  {
    id: 'exam-md2-ef-2025-1',
    courseId: 'matematica-discreta-2',
    courseName: 'Matemática Discreta 2',
    title: 'Examen Final 2025-1 - Autómatas DFA/NFA y Álgebra de Boole',
    term: '2025-1',
    evalType: 'Examen Final',
    professorName: 'Ing. Carlos Mendoza',
    campus: 'Arequipa',
    modality: 'A Distancia',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image',
    description: 'Diseño de un autómata finito determinista para cadenas binarias con restricciones de paridad y minimización con mapa de Karnaugh.',
    difficulty: 'Muy Exigente',
    solvedStatus: 'Resuelto Paso a Paso',
    keyTopics: ['Autómatas Finitos (DFA)', 'Simplificación Booleana', 'Karnaugh', 'Máquinas de Turing'],
    upvotes: 112,
    views: 940,
    uploadedBy: 'Andrés Q. (Arequipa)',
    uploadDate: 'Julio 2025',
    comments: [
      {
        id: 'c-4',
        author: 'Lucía B.',
        campus: 'Cusco',
        date: 'Julio 2025',
        text: 'Fijo viene construir la tabla de transiciones y dibujar los estados finales con doble círculo.',
        upvotes: 24,
      }
    ]
  },
  {
    id: 'exam-db1-ep-2025-2',
    courseId: 'base-datos-1',
    courseName: 'Base de Datos 1',
    title: 'Examen Parcial 2025-2 - Modelo Entidad Relación y Normalización',
    term: '2025-2',
    evalType: 'Examen Parcial',
    professorName: 'Ing. Fernando Gutiérrez',
    campus: 'Huancayo',
    modality: 'Presencial',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image',
    description: 'Caso de estudio de una clínica médica: diseñar el diagrama ER, convertir a modelo relacional y llevarlo hasta la 3ra Forma Normal (3FN).',
    difficulty: 'Moderado',
    solvedStatus: 'Resuelto Paso a Paso',
    keyTopics: ['Diagrama ER', 'Normalización 1FN-3FN', 'Claves Foráneas'],
    upvotes: 72,
    views: 510,
    uploadedBy: 'Paolo T.',
    uploadDate: 'Octubre 2025',
    comments: []
  },
  {
    id: 'exam-poo-c2-2025-2',
    courseId: 'programacion-orientada-objetos',
    courseName: 'Programación Orientada a Objetos',
    title: 'Consolidado 2 - Herencia, Polimorfismo e Interfaces en Java',
    term: '2025-2',
    evalType: 'Consolidado 2',
    professorName: 'Mg. Sandra Villena',
    campus: 'Lima',
    modality: 'Semipresencial',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image',
    description: 'Implementación de un sistema de facturación con clases abstractas, interfaces y manejo de excepciones personalizadas.',
    difficulty: 'Moderado',
    solvedStatus: 'Enunciado Oficial',
    keyTopics: ['Polimorfismo', 'Interfaces', 'Excepciones', 'Java Collections'],
    upvotes: 49,
    views: 380,
    uploadedBy: 'Alonso G.',
    uploadDate: 'Noviembre 2025',
    comments: []
  }
];
