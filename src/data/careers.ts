import { systemsCurriculumData } from './courses/systems-curriculum';

export interface CoursePreview {
  id: string;
  name: string;
  code: string;
  cycle: string;
  credits: number;
  hasActiveRoadmap: boolean;
  roadmapRoute?: string;
  description: string;
  temas?: string[];
}

export interface UniversityCareer {
  id: string;
  name: string;
  faculty: string;
  short_description: string;
  icon: string;
  accentColor: string;
  duration_years: number;
  total_credits: number;
  campuses: string[];
  modalities: string[];
  featured_courses: CoursePreview[];
}

// Convert systemsCurriculumData into CoursePreview[] for ing-sistemas
const systemsCoursesPreviews: CoursePreview[] = systemsCurriculumData.flatMap((cycleData) =>
  cycleData.cursos.map((c) => ({
    id: c.id,
    name: c.name,
    code: c.code,
    cycle: c.cycle,
    credits: c.credits,
    hasActiveRoadmap: true,
    roadmapRoute: c.id,
    description: c.description,
    temas: c.temas,
  }))
);

export const universityCareersData: UniversityCareer[] = [
  {
    id: "ing-sistemas",
    name: "Ingeniería de Sistemas e Informática",
    faculty: "Facultad de Ingeniería",
    icon: "💻",
    accentColor: "blue",
    duration_years: 5,
    total_credits: 220,
    campuses: ["Huancayo", "Lima", "Arequipa", "Cusco", "A Distancia"],
    modalities: ["Presencial", "Semipresencial", "A Distancia"],
    short_description: "Diseño y arquitectura de software de gran escala, algoritmos, ciberseguridad, inteligencia artificial y gestión estratégica de tecnologías computacionales.",
    featured_courses: systemsCoursesPreviews,
  },
  {
    id: "psicologia",
    name: "Psicología",
    faculty: "Facultad de Humanidades y Ciencias Sociales",
    icon: "🧠",
    accentColor: "purple",
    duration_years: 5,
    total_credits: 200,
    campuses: ["Huancayo", "Lima", "Arequipa", "Cusco", "A Distancia"],
    modalities: ["Presencial", "Semipresencial", "A Distancia"],
    short_description: "Estudio del comportamiento humano, neurociencias cognitivas, diagnóstico clínico, psicometría y diseño de intervenciones terapéuticas individuales y comunitarias.",
    featured_courses: [
      {
        id: "neurociencia-cognitiva",
        name: "Neurociencia y Procesos Cognitivos",
        code: "PSI-NEUR",
        cycle: "Ciclo III",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Bases neurobiológicas de la atención, percepción, memoria, lenguaje y toma de decisiones."
      },
      {
        id: "psicopatologia",
        name: "Psicopatología General y Diagnóstico",
        code: "PSI-PAT1",
        cycle: "Ciclo IV",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Clasificación de trastornos psicológicos según criterios DSM-5 y CIE-11."
      },
      {
        id: "evaluacion-psicometrica",
        name: "Evaluación y Pruebas Psicométricas",
        code: "PSI-PSIC",
        cycle: "Ciclo V",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Diseño, estandarización e interpretación de tests de personalidad e inteligencia (WAIS, Rorschach)."
      },
      {
        id: "psicologia-clinica",
        name: "Psicología Clínica y Terapéutica",
        code: "PSI-CLIN",
        cycle: "Ciclo VI",
        credits: 5,
        hasActiveRoadmap: false,
        description: "Modelos de entrevista clínica, encuadre terapéutico y relación terapeuta-paciente."
      }
    ]
  },
  {
    id: "arquitectura",
    name: "Arquitectura y Urbanismo",
    faculty: "Facultad de Arquitectura",
    icon: "📐",
    accentColor: "amber",
    duration_years: 5,
    total_credits: 210,
    campuses: ["Huancayo", "Arequipa", "Cusco", "Lima"],
    modalities: ["Presencial"],
    short_description: "Diseño arquitectónico bioclimático, urbanismo regenerativo, cálculo estructural sismorresistente y modelado paramétrico con tecnologías BIM.",
    featured_courses: [
      {
        id: "taller-diseno-3",
        name: "Taller de Diseño Arquitectónico III",
        code: "ARQ-DIS3",
        cycle: "Ciclo IV",
        credits: 6,
        hasActiveRoadmap: false,
        description: "Proyectos espaciales de media complejidad con criterios de sostenibilidad y confort bioclimático."
      },
      {
        id: "estructuras-sistemas",
        name: "Estructuras y Sistemas Constructivos",
        code: "ARQ-ESTR",
        cycle: "Ciclo IV",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Comportamiento estático de pórticos, concreto armado, acero estructural y normas sismorresistentes."
      },
      {
        id: "historia-arquitectura",
        name: "Historia y Teoría de la Arquitectura",
        code: "ARQ-HIST",
        cycle: "Ciclo V",
        credits: 3,
        hasActiveRoadmap: false,
        description: "Evolución tipológica desde el periodo clásico hasta la arquitectura moderna y contemporánea."
      },
      {
        id: "modelado-bim",
        name: "Modelado BIM y Paramétrico",
        code: "ARQ-BIM1",
        cycle: "Ciclo VI",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Gestión digital de proyectos con Revit, análisis de interferencias y documentación técnica."
      }
    ]
  },
  {
    id: "enfermeria",
    name: "Enfermería",
    faculty: "Facultad de Ciencias de la Salud",
    icon: "🩺",
    accentColor: "rose",
    duration_years: 5,
    total_credits: 205,
    campuses: ["Huancayo", "Arequipa", "Cusco", "Lima"],
    modalities: ["Presencial", "Semipresencial"],
    short_description: "Atención holística del paciente en todas las etapas de la vida, farmacología clínica, gestión del cuidado en emergencias, cuidados intensivos y salud pública.",
    featured_courses: [
      {
        id: "anatomia-fisiologia",
        name: "Anatomía y Fisiología Humana II",
        code: "ENF-ANAT",
        cycle: "Ciclo III",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Morfofisiología de los sistemas cardiovascular, respiratorio, renal y endocrino."
      },
      {
        id: "farmacologia-clinica",
        name: "Farmacología Clínica Aplicada",
        code: "ENF-FARM",
        cycle: "Ciclo IV",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Farmacocinética, farmacodinamia, dosificación segura y vías de administración de medicamentos."
      },
      {
        id: "enfermeria-adulto",
        name: "Enfermería en Salud del Adulto",
        code: "ENF-ADUL",
        cycle: "Ciclo V",
        credits: 5,
        hasActiveRoadmap: false,
        description: "Cuidados pre, trans y postoperatorios y manejo de patologías médicas complejas."
      },
      {
        id: "urgencias-emergencias",
        name: "Cuidados Críticos y Emergencias",
        code: "ENF-CRIT",
        cycle: "Ciclo VI",
        credits: 5,
        hasActiveRoadmap: false,
        description: "Soporte vital avanzado (ACLS), reanimación cardiopulmonar y manejo del paciente en shock."
      }
    ]
  },
  {
    id: "odontologia",
    name: "Odontología",
    faculty: "Facultad de Ciencias de la Salud",
    icon: "🦷",
    accentColor: "cyan",
    duration_years: 5,
    total_credits: 215,
    campuses: ["Huancayo", "Arequipa", "Lima"],
    modalities: ["Presencial"],
    short_description: "Diagnóstico y rehabilitación estomatológica integral, anatomía y oclusión dental, cariología, endodoncia, periodoncia y cirugía maxilofacial.",
    featured_courses: [
      {
        id: "anatomia-dental",
        name: "Anatomía Dental y Oclusión",
        code: "ODO-ANAT",
        cycle: "Ciclo III",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Morfología de piezas dentarias permanentes y temporales, dinámica mandibular y articuladores."
      },
      {
        id: "histologia-oral",
        name: "Histología y Embriología Oral",
        code: "ODO-HIST",
        cycle: "Ciclo IV",
        credits: 3,
        hasActiveRoadmap: false,
        description: "Estructura microscópica del esmalte, dentina, pulpa, periodonto y glándulas salivales."
      },
      {
        id: "cariologia-operatoria",
        name: "Cariología y Odontología Restauradora",
        code: "ODO-OPER",
        cycle: "Ciclo V",
        credits: 5,
        hasActiveRoadmap: false,
        description: "Etiopatogenia de la caries, preparaciones cavitarias y adhesión con resinas compuestas."
      },
      {
        id: "endodoncia-1",
        name: "Endodoncia y Patología Pulpar",
        code: "ODO-ENDO",
        cycle: "Ciclo VI",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Diagnóstico diferencial de pulpitis, instrumentación biomecánica y obturación tridimensional."
      }
    ]
  },
  {
    id: "medicina-humana",
    name: "Medicina Humana",
    faculty: "Facultad de Ciencias de la Salud",
    icon: "🥼",
    accentColor: "emerald",
    duration_years: 7,
    total_credits: 310,
    campuses: ["Huancayo", "Arequipa"],
    modalities: ["Presencial"],
    short_description: "Prevención, diagnóstico y tratamiento médico quirúrgico basado en evidencia, fisiopatología profunda y prácticas hospitalarias continuas.",
    featured_courses: [
      {
        id: "fisiopatologia-medica",
        name: "Fisiopatología Médica",
        code: "MED-FISP",
        cycle: "Ciclo IV",
        credits: 5,
        hasActiveRoadmap: false,
        description: "Mecanismos moleculares y sistémicos de la enfermedad cardiovascular, respiratoria y renal."
      },
      {
        id: "semiologia-medica",
        name: "Semiología Médica y Propedéutica",
        code: "MED-SEMI",
        cycle: "Ciclo V",
        credits: 6,
        hasActiveRoadmap: false,
        description: "Historia clínica rigurosa, anamnesis y exploración física sistematizada por aparatos."
      }
    ]
  },
  {
    id: "derecho",
    name: "Derecho",
    faculty: "Facultad de Derecho y Ciencias Políticas",
    icon: "⚖️",
    accentColor: "zinc",
    duration_years: 5,
    total_credits: 200,
    campuses: ["Huancayo", "Lima", "Arequipa", "Cusco", "A Distancia"],
    modalities: ["Presencial", "Semipresencial", "A Distancia"],
    short_description: "Ciencia jurídica, litigación oral, derecho constitucional, penal, civil corporativo y resolución alternativa de conflictos.",
    featured_courses: [
      {
        id: "derecho-constitucional",
        name: "Derecho Constitucional y Garantías",
        code: "DER-CONS",
        cycle: "Ciclo III",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Interpretación constitucional, derechos fundamentales y procesos de amparo y hábeas corpus."
      },
      {
        id: "litigacion-oral",
        name: "Técnicas de Litigación Oral",
        code: "DER-LITI",
        cycle: "Ciclo VI",
        credits: 4,
        hasActiveRoadmap: false,
        description: "Teoría del caso, interrogatorio, contrainterrogatorio y alegatos de clausura en juicio oral."
      }
    ]
  }
];
