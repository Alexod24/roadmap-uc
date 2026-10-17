import { CourseRoadmap, AcademicUnit, RoadmapNode, EvaluationMilestone, CourseProfessor } from '@/types/roadmap';

export interface SystemsCourseMeta {
  id: string;
  name: string;
  code: string;
  cycle: string;
  credits: number;
  description: string;
  temas: string[];
}

export interface SystemsCycleData {
  ciclo: number;
  cycleLabel: string;
  total_creditos: number;
  cursos: SystemsCourseMeta[];
}

export const systemsCurriculumData: SystemsCycleData[] = [
  {
    ciclo: 1,
    cycleLabel: "Ciclo I",
    total_creditos: 23,
    cursos: [
      {
        id: "comprension-textos-1",
        name: "Comprensión y Producción de Textos 1",
        code: "COM-101",
        cycle: "Ciclo I",
        credits: 3,
        description: "Desarrollo de habilidades de lectura crítica, coherencia textual, normativa gramatical y redacción expositiva académica.",
        temas: ["Ortografía y gramática normativa", "Estructura del párrafo", "Comprensión lectora analítica", "Redacción de textos expositivos"]
      },
      {
        id: "lab-liderazgo-innovacion",
        name: "Laboratorio de Liderazgo e Innovación",
        code: "LID-101",
        cycle: "Ciclo I",
        credits: 3,
        description: "Inteligencia emocional, trabajo colaborativo, resolución de conflictos y fundamentos de metodologías ágiles como Design Thinking.",
        temas: ["Autoconocimiento e inteligencia emocional", "Design Thinking básico", "Trabajo en equipo y resolución de conflictos", "Creatividad e innovación"]
      },
      {
        id: "estrategias-herramientas-digitales",
        name: "Estrategias y Herramientas Digitales para el Aprendizaje",
        code: "TIC-101",
        cycle: "Ciclo I",
        credits: 4,
        description: "Uso avanzado de entornos virtuales, repositorios científicos, ofimática en la nube y ciberseguridad personal del estudiante.",
        temas: ["Gestión de información y búsqueda académica", "Herramientas colaborativas en la nube", "Entornos virtuales de aprendizaje", "Seguridad digital básica"]
      },
      {
        id: "matematica-basica",
        name: "Matemática Básica",
        code: "MAT-100",
        cycle: "Ciclo I",
        credits: 4,
        description: "Bases matemáticas esenciales para ingeniería: cálculo algebraico, desigualdades en los reales, funciones y trigonometría analítica.",
        temas: ["Lógica proposicional", "Teoría de conjuntos", "Números reales y desigualdades", "Funciones y relaciones", "Trigonometría y polinomios"]
      },
      {
        id: "matematica-discreta-1",
        name: "Matemática Discreta 1",
        code: "MAT-102",
        cycle: "Ciclo I",
        credits: 4,
        description: "Fundamentos teóricos de la computación: lógica formal, inducción matemática, teoría de conjuntos y aritmética binaria.",
        temas: ["Métodos de demostración matemática", "Inducción matemática", "Teoría de conjuntos y relaciones", "Combinatoria básica", "Sistemas de numeración binario y hexadecimal"]
      },
      {
        id: "tecnicas-programacion",
        name: "Técnicas de Programación",
        code: "ISI-102",
        cycle: "Ciclo I",
        credits: 2,
        description: "Primer contacto práctico con la algoritmia: diseño lógico, pseudocódigo estructurado y modularización con funciones.",
        temas: ["Algoritmos y diagramas de flujo", "Pseudocódigo", "Estructuras de control secuenciales, condicionales y repetitivas", "Funciones y modularización"]
      },
      {
        id: "intro-sistemas",
        name: "Introducción a la Ingeniería de Sistemas e Informática",
        code: "ISI-101",
        cycle: "Ciclo I",
        credits: 3,
        description: "Visión panorámica de la profesión, teoría general de sistemas (TGS), roles tecnológicos, ética profesional y tendencias en IA.",
        temas: ["Evolución de la computación", "Teoría general de sistemas (TGS)", "Roles profesionales y ramas de la ingeniería", "Ética profesional y tendencias tecnológicas"]
      }
    ]
  },
  {
    ciclo: 2,
    cycleLabel: "Ciclo II",
    total_creditos: 24,
    cursos: [
      {
        id: "comprension-textos-2",
        name: "Comprensión y Producción de Textos 2",
        code: "COM-201",
        cycle: "Ciclo II",
        credits: 4,
        description: "Construcción de ensayos académicos rigurosos, estrategias de contraargumentación y dominio del formato de citación APA.",
        temas: ["Argumentación y contraargumentación", "Ensayo académico", "Normas APA y citado de fuentes", "Estrategias de redacción persuasiva"]
      },
      {
        id: "electivo-general-1",
        name: "Electivo General 1",
        code: "ELG-201",
        cycle: "Ciclo II",
        credits: 3,
        description: "Cursos de formación integral humanística, responsabilidad ciudadana y pensamiento contemporáneo.",
        temas: ["Formación humanística y social", "Ciudadanía y responsabilidad social", "Cultura general contemporánea"]
      },
      {
        id: "algebra-lineal-geometria",
        name: "Álgebra Lineal y Geometría Analítica",
        code: "MAT-201",
        cycle: "Ciclo II",
        credits: 4,
        description: "Álgebra vectorial en 2D y 3D, sistemas matriciales, transformaciones lineales y geometría del espacio aplicadas a computación gráfica.",
        temas: ["Matrices y determinantes", "Sistemas de ecuaciones lineales", "Vectores en R2 y R3", "Espacios vectoriales", "Transformaciones lineales", "Rectas, planos y cónicas"]
      },
      {
        id: "modelado-negocios",
        name: "Modelado de Negocios",
        code: "ISI-201",
        cycle: "Ciclo II",
        credits: 3,
        description: "Análisis y optimización de cadenas de valor empresariales, diagramación BPMN y diseño de modelos de negocio con Canvas.",
        temas: ["BPMN (Business Process Model and Notation)", "Análisis de cadenas de valor", "Modelado de procesos organizacionales", "Business Model Canvas"]
      },
      {
        id: "matematica-superior",
        name: "Matemática Superior",
        code: "MAT-202",
        cycle: "Ciclo II",
        credits: 4,
        description: "Estudio exhaustivo del comportamiento funcional: funciones trascendentes, continuidad, cálculo de límites y bases de diferenciación.",
        temas: ["Funciones trascendentes", "Límites y continuidad", "Asíntotas", "Fundamentos de derivación básica y sus aplicaciones"]
      },
      {
        id: "matematica-discreta-2",
        name: "Matemática Discreta 2",
        code: "UC-DISC2",
        cycle: "Ciclo II",
        credits: 4,
        description: "Teoría formal de grafos, recorridos en árboles, circuitos lógicos booleanos, máquinas de estado y autómatas de computación.",
        temas: ["Teoría de grafos", "Árboles y recorridos", "Álgebra de Boole y compuertas lógicas", "Máquinas de estado finito y autómatas"]
      },
      {
        id: "programacion-orientada-objetos",
        name: "Programación Orientada a Objetos",
        code: "ISI-202",
        cycle: "Ciclo II",
        credits: 2,
        description: "Paradigma de programación orientada a objetos: clases, abstracción, encapsulamiento, polimorfismo, interfaces y manejo de excepciones.",
        temas: ["Clases y objetos", "Encapsulamiento y ocultamiento", "Herencia y polimorfismo", "Interfaces y clases abstractas", "Manejo de excepciones"]
      }
    ]
  },
  {
    ciclo: 3,
    cycleLabel: "Ciclo III",
    total_creditos: 24,
    cursos: [
      {
        id: "estadistica-probabilidades",
        name: "Estadística y Probabilidades",
        code: "EST-301",
        cycle: "Ciclo III",
        credits: 4,
        description: "Tratamiento de datos, variables aleatorias discretas/continuas, distribuciones teóricas notables y Teorema de Bayes.",
        temas: ["Estadística descriptiva y medidas de resumen", "Probabilidad condicional y Teorema de Bayes", "Variables aleatorias discretas y continuas", "Distribuciones notables (Binomial, Normal, Poisson)"]
      },
      {
        id: "electivo-general-2",
        name: "Electivo General 2",
        code: "ELG-301",
        cycle: "Ciclo III",
        credits: 3,
        description: "Exploración interdisciplinaria: arte, debate crítico, cultura o desarrollo personal sustentable.",
        temas: ["Arte, cultura o desarrollo personal", "Pensamiento crítico contemporáneo"]
      },
      {
        id: "lab-liderazgo-intermedio",
        name: "Laboratorio de Liderazgo e Innovación Intermedio",
        code: "LID-301",
        cycle: "Ciclo III",
        credits: 2,
        description: "Liderazgo en situaciones complejas, presentación efectiva de pitches de proyectos y gestión constructiva de la incertidumbre.",
        temas: ["Liderazgo adaptativo", "Metodologías de innovación aplicada", "Pitch y comunicación efectiva de proyectos", "Gestión de la incertidumbre"]
      },
      {
        id: "calculo-diferencial",
        name: "Cálculo Diferencial",
        code: "MAT-301",
        cycle: "Ciclo III",
        credits: 4,
        description: "Formalización de la derivada, teoremas del valor medio, optimización de recursos y modelos matemáticos de razón de cambio.",
        temas: ["Definición formal de la derivada", "Reglas de derivación y regla de la cadena", "Máximos, mínimos y optimización", "Teorema de Rolle y Valor Medio", "Trazado de curvas"]
      },
      {
        id: "fisica-1",
        name: "Física 1",
        code: "FIS-301",
        cycle: "Ciclo III",
        credits: 4,
        description: "Mecánica clásica para ingenieros: cinemática de partículas, dinámica de Newton, conservación de energía y equilibrio estático.",
        temas: ["Cinemática traslacional y rotacional", "Leyes de Newton y dinámica", "Trabajo, energía y potencia", "Conservación del momento lineal", "Estática y equilibrio"]
      },
      {
        id: "base-datos-1",
        name: "Base de Datos 1",
        code: "ISI-301",
        cycle: "Ciclo III",
        credits: 3,
        description: "Diseño de modelos conceptuales Entidad-Relación, normalización relacional (1FN-3FN) y programación de consultas complejas en SQL.",
        temas: ["Modelo Entidad-Relación (ER)", "Modelo Relacional y normalización (1FN, 2FN, 3FN)", "Lenguaje SQL (DDL, DML)", "Consultas básicas y uniones (JOINs)", "Restricciones de integridad"]
      },
      {
        id: "diseno-web",
        name: "Diseño Web",
        code: "ISI-302",
        cycle: "Ciclo III",
        credits: 2,
        description: "Construcción moderna de interfaces de usuario para la web: HTML5 semántico, maquetación avanzada con Grid/Flexbox y UI/UX.",
        temas: ["Estructura HTML5 semántica", "Estilos CSS3, Flexbox y CSS Grid", "Diseño responsivo y Mobile-First", "Fundamentos de UI/UX y accesibilidad web"]
      },
      {
        id: "estructura-datos",
        name: "Estructura de Datos",
        code: "ISI-303",
        cycle: "Ciclo III",
        credits: 2,
        description: "Almacenamiento y manipulación eficiente en memoria: pilas, colas, listas, árboles binarios BST, tablas Hash y análisis de complejidad Big-O.",
        temas: ["Arrays, pilas (stacks) y colas (queues)", "Listas enlazadas simples y dobles", "Árboles binarios de búsqueda (BST)", "Tablas Hash", "Algoritmos de ordenamiento y búsqueda", "Complejidad algorítmica (Big O)"]
      }
    ]
  },
  {
    ciclo: 4,
    cycleLabel: "Ciclo IV",
    total_creditos: 23,
    cursos: [
      {
        id: "electivo-general-3",
        name: "Electivo General 3",
        code: "ELG-401",
        cycle: "Ciclo IV",
        credits: 3,
        description: "Sostenibilidad ambiental, tecnologías de bajo impacto ecológico y ética en el ecosistema digital.",
        temas: ["Ética aplicada", "Sostenibilidad y medio ambiente", "Sociedad y tecnología"]
      },
      {
        id: "electivo-general-4",
        name: "Electivo General 4",
        code: "ELG-402",
        cycle: "Ciclo IV",
        credits: 3,
        description: "Habilidades blandas ejecutivas, comunicación asertiva y nociones de desarrollo económico para ingeniería.",
        temas: ["Habilidades comunicativas aplicadas", "Economía básica o desarrollo humano"]
      },
      {
        id: "english-course-1",
        name: "English Course 1",
        code: "ENG-401",
        cycle: "Ciclo IV",
        credits: 3,
        description: "Inglés técnico orientado a la computación: lectura comprensiva de documentación oficial y vocabulario especializado de IT.",
        temas: ["Basic grammar (Present Simple, Continuous)", "Essential tech vocabulary", "Reading basic documentation", "Short speaking introductions"]
      },
      {
        id: "calculo-integral",
        name: "Cálculo Integral",
        code: "MAT-401",
        cycle: "Ciclo IV",
        credits: 4,
        description: "Integrales definidas e impropias, teorema fundamental del cálculo, cálculo de áreas/volúmenes y convergencia de series.",
        temas: ["Integral indefinida y métodos de integración", "Teorema Fundamental del Cálculo", "Integrales impropias", "Cálculo de áreas, volúmenes de revolución y longitudes de arco", "Series y sucesiones"]
      },
      {
        id: "fisica-electromagnetica",
        name: "Física Electromagnética",
        code: "FIS-401",
        cycle: "Ciclo IV",
        credits: 4,
        description: "Fundamentos electromagnéticos del hardware: ley de Gauss, circuitos RC/RL, inducción electromagnética y ecuaciones de Maxwell.",
        temas: ["Ley de Coulomb y campo eléctrico", "Ley de Gauss", "Potencial eléctrico y capacitancia", "Corriente continua y circuitos RC", "Campo magnético e inducción (Ley de Faraday)", "Ecuaciones de Maxwell"]
      },
      {
        id: "analisis-diseno-software",
        name: "Análisis y Diseño de Software",
        code: "ISI-401",
        cycle: "Ciclo IV",
        credits: 4,
        description: "Ingeniería de software inicial: especificación de requisitos con historias de usuario, diagramado UML y patrones de diseño de software.",
        temas: ["Ingeniería de requerimientos (funcionales y no funcionales)", "Casos de uso e historias de usuario", "Diagramas UML (clases, secuencia, actividades)", "Patrones de diseño básicos (Singleton, Factory)"]
      },
      {
        id: "programacion-web",
        name: "Programación Web",
        code: "ISI-402",
        cycle: "Ciclo IV",
        credits: 2,
        description: "Programación dinámica en frontend con JavaScript ES6+, asincronía, manipulación del DOM y consumo de servicios RESTful.",
        temas: ["JavaScript moderno (ES6+)", "Manipulación del DOM", "Asincronía (Promises, Async/Await)", "Consumo de APIs REST (Fetch/Axios)", "Introducción a frameworks/librerías frontend"]
      }
    ]
  },
  {
    ciclo: 5,
    cycleLabel: "Ciclo V",
    total_creditos: 21,
    cursos: [
      {
        id: "english-course-2",
        name: "English Course 2",
        code: "ENG-501",
        cycle: "Ciclo V",
        credits: 3,
        description: "Comunicación técnica en inglés para equipos de desarrollo: participación en dailies, redacción de tickets y documentación técnica.",
        temas: ["Past simple, continuous and perfect", "Technical writing for developers", "Participating in discussions and team standups", "Vocabulary for IT workflows"]
      },
      {
        id: "lab-liderazgo-avanzado",
        name: "Laboratorio de Liderazgo e Innovación Avanzado",
        code: "LID-501",
        cycle: "Ciclo V",
        credits: 3,
        description: "Liderazgo de squads tecnológicos, técnicas de negociación y desarrollo de iniciativas de intraemprendimiento o startups.",
        temas: ["Gestión del cambio organizacional", "Liderazgo de equipos multidisciplinarios", "Negociación y persuasión", "Ecosistema de startups e intraemprendimiento"]
      },
      {
        id: "ecuaciones-diferenciales",
        name: "Ecuaciones Diferenciales",
        code: "MAT-501",
        cycle: "Ciclo V",
        credits: 4,
        description: "Modelado de sistemas dinámicos continuos mediante ecuaciones diferenciales ordinarias, transformadas de Laplace y sistemas lineales.",
        temas: ["Ecuaciones diferenciales ordinarias (EDO) de primer orden", "EDO lineales de orden superior", "Transformada de Laplace", "Sistemas de ecuaciones diferenciales", "Modelado de problemas físicos e ingenieriles"]
      },
      {
        id: "estadistica-ingenieria",
        name: "Estadística para Ingeniería",
        code: "EST-501",
        cycle: "Ciclo V",
        credits: 3,
        description: "Inferencia estadística rigurosa: pruebas de hipótesis, modelos de regresión múltiple, análisis de varianza (ANOVA) y control de calidad.",
        temas: ["Muestreo e intervalos de confianza", "Pruebas de hipótesis paramétricas y no paramétricas", "Regresión lineal simple y múltiple", "Análisis de varianza (ANOVA)", "Control estadístico de la calidad"]
      },
      {
        id: "desarrollo-apps-web",
        name: "Desarrollo de Aplicaciones Web",
        code: "ISI-501",
        cycle: "Ciclo V",
        credits: 2,
        description: "Desarrollo web moderno Full Stack: frameworks frontend interactivos (React/Vue), APIs backend seguras con JWT y despliegues en la nube.",
        temas: ["Frameworks frontend (React, Angular o Vue)", "Patrón MVC en backend", "APIs RESTful con Node.js, Python o Java", "Autenticación basada en tokens (JWT)", "Despliegue inicial"]
      },
      {
        id: "base-datos-2",
        name: "Base de Datos 2",
        code: "ISI-502",
        cycle: "Ciclo V",
        credits: 3,
        description: "Programación en bases de datos (triggers, stored procedures), tuning de consultas, índices y bases de datos NoSQL documentales y clave-valor.",
        temas: ["Procedimientos almacenados, triggers y funciones", "Transacciones y concurrencia (ACID)", "Indexación y optimización de consultas", "Bases de datos NoSQL (MongoDB, Redis)", "Modelado documental y clave-valor"]
      },
      {
        id: "arquitectura-computador",
        name: "Arquitectura del Computador",
        code: "ISI-503",
        cycle: "Ciclo V",
        credits: 3,
        description: "Estructura interna del hardware: procesador, pipeline, registros, memoria caché, buses y programación en lenguaje ensamblador.",
        temas: ["Organización de CPU y registros", "Jerarquía de memoria y memoria caché", "Conjunto de instrucciones (ISA) y lenguaje ensamblador", "Buses y subsistema de entrada/salida", "Pipelining y paralelismo a nivel de instrucción"]
      }
    ]
  },
  {
    ciclo: 6,
    cycleLabel: "Ciclo VI",
    total_creditos: 22,
    cursos: [
      {
        id: "investigacion-academica",
        name: "Investigación Académica",
        code: "INV-601",
        cycle: "Ciclo VI",
        credits: 3,
        description: "Metodología formal de investigación científica, búsqueda en repositorios indexados (Scopus/IEEE) y redacción de artículos técnicos.",
        temas: ["Planteamiento del problema y marco teórico", "Metodología de la investigación científica", "Gestores bibliográficos y bases de datos científicas", "Redacción de artículos científicos y ponencias"]
      },
      {
        id: "english-course-3",
        name: "English Course 3",
        code: "ENG-601",
        cycle: "Ciclo VI",
        credits: 3,
        description: "Defensa técnica de soluciones: exposiciones de proyectos, code reviews colaborativos y reportes de incidentes en inglés profesional.",
        temas: ["Conditionals and passive voice", "Technical presentations and demos", "Code reviews and bug reports in English", "Professional business communication"]
      },
      {
        id: "investigacion-operativa-1",
        name: "Investigación Operativa 1",
        code: "ISI-601",
        cycle: "Ciclo VI",
        credits: 4,
        description: "Modelado matemático para la toma de decisiones óptimas: programación lineal, algoritmo Simplex, teoría de dualidad y modelos de transporte.",
        temas: ["Programación lineal y método Simplex", "Dualidad y análisis de sensibilidad", "Problemas de transporte y asignación", "Programación entera y binaria"]
      },
      {
        id: "metodos-numericos",
        name: "Métodos Numéricos",
        code: "MAT-601",
        cycle: "Ciclo VI",
        credits: 4,
        description: "Algoritmos computacionales para la resolución aproximada de problemas matemáticos continuos: raíces, interpolación y resolución de EDO.",
        temas: ["Teoría de errores y estabilidad", "Raíces de ecuaciones no lineales (Bisección, Newton-Raphson)", "Sistemas lineales por métodos iterativos (Gauss-Seidel)", "Interpolación y aproximación polinómica", "Derivación e integración numérica", "Solución numérica de EDO"]
      },
      {
        id: "desarrollo-videojuegos",
        name: "Desarrollo de Videojuegos",
        code: "ISI-602",
        cycle: "Ciclo VI",
        credits: 4,
        description: "Diseño y programación interactiva: motores de videojuegos (Unity/Unreal), simulación física 2D/3D, animaciones y Game Design Documents.",
        temas: ["Game engines (Unity / Unreal Engine)", "Física 2D/3D en juegos", "Lógicas de juego (Game loop, inputs)", "Sprites, modelos 3D y animaciones", "Game Design Document (GDD) e interfaces de usuario"]
      },
      {
        id: "sistemas-operativos",
        name: "Sistemas Operativos",
        code: "ISI-603",
        cycle: "Ciclo VI",
        credits: 4,
        description: "Principios de sistemas operativos modernos: gestión de procesos, concurrencia, memoria virtual, sistemas de archivos y scripting Bash en Linux.",
        temas: ["Gestión de procesos y sincronización (Semáforos, Mutex)", "Hilos y concurrencia", "Administración de memoria virtual y paginación", "Sistemas de archivos y gestión de E/S", "Seguridad del SO y scripting en Linux (Bash)"]
      }
    ]
  },
  {
    ciclo: 7,
    cycleLabel: "Ciclo VII",
    total_creditos: 24,
    cursos: [
      {
        id: "english-course-4",
        name: "English Course 4",
        code: "ENG-701",
        cycle: "Ciclo VII",
        credits: 3,
        description: "Fluidez técnica avanzada: redacción de propuestas de arquitectura de software y entrevistas técnicas para empresas internacionales.",
        temas: ["Advanced technical discussions", "Drafting project proposals and specs", "Job interviews and technical profiling", "Professional fluency in engineering environments"]
      },
      {
        id: "electivo-general-5",
        name: "Electivo General 5",
        code: "ELG-701",
        cycle: "Ciclo VII",
        credits: 1,
        description: "Taller de integración para el ejercicio profesional responsable y habilidades transversales para el egreso.",
        temas: ["Taller de integración profesional", "Habilidades transversales"]
      },
      {
        id: "ingenieria-economica",
        name: "Ingeniería Económica",
        code: "ECO-701",
        cycle: "Ciclo VII",
        credits: 3,
        description: "Evaluación financiera y toma de decisiones en proyectos tecnológicos: valor del dinero en el tiempo, VAN, TIR, costos de depreciación.",
        temas: ["Valor del dinero en el tiempo y tasas de interés", "Flujos de caja y anualidades", "Criterios de evaluación (VAN, TIR, B/C)", "Análisis de depreciación e impuestos", "Evaluación de alternativas de reemplazo"]
      },
      {
        id: "redes-computadoras",
        name: "Redes de Computadoras",
        code: "ISI-701",
        cycle: "Ciclo VII",
        credits: 4,
        description: "Arquitectura de comunicaciones: protocolos TCP/IP, direccionamiento IPv4/IPv6, cálculo de subredes VLSM y medios físicos de transmisión.",
        temas: ["Modelos OSI y TCP/IP", "Capa de aplicación (HTTP, DNS, DHCP)", "Capa de transporte (TCP vs UDP, control de flujo)", "Direccionamiento IPv4/IPv6 y subnetting (VLSM)", "Cableado estructurado y medios físicos"]
      },
      {
        id: "ingenieria-software",
        name: "Ingeniería de Software",
        code: "ISI-702",
        cycle: "Ciclo VII",
        credits: 4,
        description: "Modelos de ciclo de vida del software, métricas de calidad, control de versiones avanzado con Git y procesos de aseguramiento SQA.",
        temas: ["Ciclos de vida del software", "Gestión de la configuración y control de versiones (Git)", "Estimación de costos y métricas de software", "Aseguramiento de la calidad (SQA)", "Mantenimiento y reingeniería de sistemas"]
      },
      {
        id: "proyectos-innovacion",
        name: "Proyectos de Innovación",
        code: "ISI-703",
        cycle: "Ciclo VII",
        credits: 2,
        description: "Desarrollo rápido de productos mínimos viables (MVP), validación de hipótesis de mercado y estrategias de escalabilidad técnica.",
        temas: ["Ideación y validación de propuestas de valor", "Prototipado rápido y Producto Mínimo Viable (MVP)", "Métricas de innovación", "Estrategias de monetización y escalabilidad"]
      },
      {
        id: "sistemas-dinamicos-modelado",
        name: "Fundamentos de Sistemas Dinámicos y Modelado",
        code: "ISI-704",
        cycle: "Ciclo VII",
        credits: 3,
        description: "Simulación de realidades complejas a través de diagramas causales, diagramas de Forrester y software de dinámica de sistemas (Vensim).",
        temas: ["Pensamiento sistémico y bucles de retroalimentación", "Diagramas causales y de Forrester", "Modelado matemático de dinámicas complejas", "Simulación con herramientas de software (ej. Vensim)"]
      },
      {
        id: "construccion-pruebas-software",
        name: "Construcción y Pruebas de Software",
        code: "ISI-705",
        cycle: "Ciclo VII",
        credits: 4,
        description: "Garantía de calidad del código: pruebas unitarias, integración continua, desarrollo guiado por pruebas (TDD/BDD) y análisis estático.",
        temas: ["Pruebas unitarias (Unit Testing con JUnit/PyTest/Jest)", "Pruebas de integración y end-to-end (E2E)", "Desarrollo Guiado por Pruebas (TDD / BDD)", "Análisis estático de código y refactorización", "Pipelines de Integración Continua (CI básico)"]
      }
    ]
  },
  {
    ciclo: 8,
    cycleLabel: "Ciclo VIII",
    total_creditos: 20,
    cursos: [
      {
        id: "simulacion-procesos",
        name: "Simulación de Procesos",
        code: "ISI-801",
        cycle: "Ciclo VIII",
        credits: 3,
        description: "Simulación computacional de eventos discretos, líneas de espera, teoría de colas y experimentación numérica con software especializado.",
        temas: ["Modelos de simulación de eventos discretos", "Generación de números y variables pseudoaleatorias", "Pruebas de bondad de ajuste", "Modelado de colas y líneas de espera", "Herramientas de simulación (Arena / AnyLogic)"]
      },
      {
        id: "gestion-proyectos-ingenieria",
        name: "Gestión de Proyectos en Ingeniería",
        code: "ISI-802",
        cycle: "Ciclo VIII",
        credits: 3,
        description: "Estándares y mejores prácticas del Project Management Institute (PMBOK), gestión de riesgos, estimación de costos y valor ganado (EVM).",
        temas: ["Estándares del PMI (PMBOK)", "Gestión de alcance, tiempo y costos (EVM)", "Gestión de riesgos e incidentes", "Adquisiciones y contratos", "Cierre de proyectos"]
      },
      {
        id: "conmutacion-enrutamiento",
        name: "Conmutación y Enrutamiento",
        code: "ISI-803",
        cycle: "Ciclo VIII",
        credits: 4,
        description: "Configuración y administración de redes empresariales: VLANs, trunking 802.1Q, enrutamiento dinámico OSPF/BGP, listas de acceso y NAT.",
        temas: ["Configuración de switches y VLANs (Trunking, 802.1Q)", "Protocolo Spanning Tree (STP)", "Enrutamiento estático y dinámico (OSPF, BGP)", "Listas de control de acceso (ACL)", "NAT y PAT"]
      },
      {
        id: "desarrollo-apps-moviles",
        name: "Desarrollo de Aplicaciones Móviles",
        code: "ISI-804",
        cycle: "Ciclo VIII",
        credits: 4,
        description: "Construcción de aplicaciones nativas y multiplataforma (Kotlin/Flutter), almacenamiento local, geolocalización y publicación en tiendas.",
        temas: ["Desarrollo nativo (Kotlin/Swift) vs multiplataforma (Flutter/React Native)", "Ciclo de vida de actividades/vistas móviles", "Almacenamiento local (SQLite, Room)", "Notificaciones push y geolocalización", "Publicación en tiendas de apps"]
      },
      {
        id: "arquitectura-software",
        name: "Arquitectura de Software",
        code: "ISI-805",
        cycle: "Ciclo VIII",
        credits: 3,
        description: "Diseño estructural de sistemas de alta disponibilidad: microservicios, arquitecturas orientadas a eventos (Kafka), modelo C4 y DDD.",
        temas: ["Estilos arquitectónicos (Microservicios, Event-Driven, Hexagonal)", "Atributos de calidad (rendimiento, escalabilidad, resiliencia)", "Patrones de mensajería (Kafka, RabbitMQ)", "Documentación con modelo C4", "Diseño Orientado al Dominio (DDD)"]
      },
      {
        id: "metodologias-agiles-software",
        name: "Metodologías Ágiles para el Desarrollo de Software",
        code: "ISI-806",
        cycle: "Ciclo VIII",
        credits: 3,
        description: "Cultura ágil aplicada: framework Scrum a profundidad, tableros Kanban, ceremonias ágiles, estimación en Story Points y métricas de velocidad.",
        temas: ["Manifiesto Ágil", "Framework Scrum (roles, eventos, artefactos)", "Kanban y flujo de trabajo", "Historias de usuario y estimación (Story Points)", "Métricas ágiles (Velocity, Burndown Chart)"]
      }
    ]
  },
  {
    ciclo: 9,
    cycleLabel: "Ciclo IX",
    total_creditos: 20,
    cursos: [
      {
        id: "electivo-especialidad-1",
        name: "Electivo Transversal o de Especialidad 1",
        code: "ELE-901",
        cycle: "Ciclo IX",
        credits: 3,
        description: "Profundización en tecnologías disruptivas emergentes y marcos avanzados de gestión informática.",
        temas: ["Tópicos avanzados en tecnologías emergentes", "Gestión especializada en TI"]
      },
      {
        id: "taller-investigacion-1",
        name: "Taller de Investigación 1 en Ingeniería de Sistemas e Informática",
        code: "INV-901",
        cycle: "Ciclo IX",
        credits: 4,
        description: "Elaboración formal y aprobación del plan de tesis: revisión sistemática de literatura (SLR), hipótesis, variables y metodología experimental.",
        temas: ["Formulación del plan de tesis", "Estado del arte y revisión sistemática de literatura (SLR)", "Definición de hipótesis y variables", "Diseño de la solución y propuesta metodológica"]
      },
      {
        id: "proyectos-diseno-sistemas",
        name: "Proyectos de Diseño en Ingeniería de Sistemas e Informática",
        code: "ISI-901",
        cycle: "Ciclo IX",
        credits: 4,
        description: "Ingeniería de detalle del proyecto capstone: diagramas arquitectónicos exhaustivos, especificaciones técnicas y costeo.",
        temas: ["Ingeniería de detalle y especificación técnica", "Diseño de interfaces de usuario y arquitectura integral", "Planificación de hitos y prototipado funcional", "Gestión de recursos y presupuesto del proyecto"]
      },
      {
        id: "inteligencia-negocios-ciencia-datos",
        name: "Inteligencia de Negocios y Ciencia de Datos",
        code: "ISI-902",
        cycle: "Ciclo IX",
        credits: 4,
        description: "Data warehousing, pipelines ETL, tableros analíticos en Power BI y algoritmos de Machine Learning para minería de datos empresarial.",
        temas: ["Data Warehousing y modelos multidimensionales (Estrella, Copo de Nieve)", "Procesos ETL/ELT", "Herramientas de visualización (Power BI, Tableau)", "Minería de datos y análisis exploratorio con Python/R", "Técnicas de clustering y clasificación aplicadas a negocios"]
      },
      {
        id: "seguridad-informacion",
        name: "Seguridad de la Información",
        code: "ISI-903",
        cycle: "Ciclo IX",
        credits: 3,
        description: "Protección integral de activos digitales: criptografía moderna, estándar ISO/IEC 27001, análisis de vulnerabilidades y continuidad BCP/DRP.",
        temas: ["Tríada CID (Confidencialidad, Integridad, Disponibilidad)", "Criptografía simétrica y asimétrica", "Norma ISO/IEC 27001 y políticas de seguridad", "Gestión de vulnerabilidades y ethical hacking básico", "Planes de continuidad del negocio (BCP/DRP)"]
      },
      {
        id: "aplicaciones-cloud",
        name: "Aplicaciones Cloud",
        code: "ISI-904",
        cycle: "Ciclo IX",
        credits: 2,
        description: "Diseño y despliegue sobre plataformas en la nube (AWS/Azure/GCP): contenedores Docker, orquestación Kubernetes y funciones Serverless.",
        temas: ["Modelos IaaS, PaaS, SaaS y proveedores principales (AWS, Azure, GCP)", "Contenedores con Docker", "Orquestación básica con Kubernetes", "Servicios Serverless (Lambdas/Cloud Functions)", "Buenas prácticas de despliegue en la nube"]
      }
    ]
  },
  {
    ciclo: 10,
    cycleLabel: "Ciclo X",
    total_creditos: 19,
    cursos: [
      {
        id: "taller-investigacion-2",
        name: "Taller de Investigación 2 en Ingeniería de Sistemas e Informática",
        code: "INV-1001",
        cycle: "Ciclo X",
        credits: 4,
        description: "Culminación del informe de tesis: validación experimental de la solución técnica, análisis de resultados y preparación para la sustentación.",
        temas: ["Implementación y validación experimental del proyecto de tesis", "Análisis e interpretación de resultados", "Redacción final del informe de tesis", "Sustentación académica y defensa de proyecto"]
      },
      {
        id: "proyectos-diseno-desarrollo",
        name: "Proyectos de Diseño y Desarrollo en Ingeniería de Sistemas e Informática",
        code: "ISI-1001",
        cycle: "Ciclo X",
        credits: 4,
        description: "Puesta en producción del proyecto Capstone: pruebas de aceptación de usuario (UAT), observabilidad y entrega de valor final.",
        temas: ["Despliegue de proyecto Capstone integral", "Pruebas de aceptación de usuario (UAT)", "Monitoreo en producción y métricas de impacto", "Entrega final a clientes o stakeholders"]
      },
      {
        id: "auditoria-sistemas",
        name: "Auditoría de Sistemas",
        code: "ISI-1002",
        cycle: "Ciclo X",
        credits: 3,
        description: "Marcos de gobernanza y control (COBIT, ITIL), recolección de evidencias forenses informáticas y emisión de dictámenes de auditoría.",
        temas: ["Marcos de control y gobernanza (COBIT, ITIL)", "Técnicas de auditoría informática y evidencias digitales", "Evaluación de controles de TI y riesgos operacionales", "Informes de auditoría y recomendaciones"]
      },
      {
        id: "robotica-machine-learning",
        name: "Robótica y Machine Learning",
        code: "ISI-1003",
        cycle: "Ciclo X",
        credits: 2,
        description: "Integración de inteligencia en sistemas físicos: visión computacional con OpenCV, redes neuronales profundas y robótica autónoma.",
        temas: ["Aprendizaje supervisado y no supervisado", "Redes neuronales artificiales y Deep Learning básico", "Visión artificial (OpenCV)", "Cinemática de robots y sensores", "Control y automatización con microcontroladores"]
      },
      {
        id: "planificacion-gestion-ti",
        name: "Planificación y Gestión de Tecnologías de la Información",
        code: "ISI-1004",
        cycle: "Ciclo X",
        credits: 3,
        description: "Elaboración del Plan Estratégico de TI (PETI), alineamiento de la infraestructura con el negocio, transformación digital y retorno de inversión.",
        temas: ["Plan Estratégico de Tecnologías de la Información (PETI)", "Alineamiento estratégico TI-Negocio", "Gestión del portafolio de proyectos TI", "Transformación digital en organizaciones", "Presupuestación y ROI de inversiones tecnológicas"]
      },
      {
        id: "electivo-especialidad-2",
        name: "Electivo Transversal o de Especialidad 2",
        code: "ELE-1001",
        cycle: "Ciclo X",
        credits: 3,
        description: "Especialización avanzada de egreso en ramas de alta demanda: DevOps, Ciberseguridad Ofensiva, Blockchain o Big Data Analytics.",
        temas: ["Especialización avanzada (ej. DevOps, Ciberseguridad, Blockchain o Big Data)", "Tendencias de la industria"]
      }
    ]
  }
];

// Helper to convert any course with topics into a fully-interactive CourseRoadmap
export function generateCurriculumRoadmap(course: SystemsCourseMeta): CourseRoadmap {
  const units: AcademicUnit[] = course.temas.map((tema, idx) => {
    const unitNum = idx + 1;
    const unitId = `u-${course.id}-${unitNum}`;
    const mainNodeId = `node-${course.id}-${unitNum}-main`;
    const deepNodeId = `node-${course.id}-${unitNum}-deep`;
    const toolsNodeId = `node-${course.id}-${unitNum}-tools`;

    const nodes: RoadmapNode[] = [
      {
        id: mainNodeId,
        title: tema,
        importance: idx === 0 || idx === course.temas.length - 1 ? 'Crítico' : 'Alto',
        prerequisites: idx > 0 ? [`node-${course.id}-${idx}-main`] : [],
        first_principles: `Comprender los principios fundamentales, definiciones operativas y conceptos clave de: ${tema}.`,
        exam_80_20: `El 80% de los puntos en evaluaciones de este tema evalúa la aplicación práctica y análisis de casos reales de ${tema}.`,
        common_pitfall: `Quedarse en la teoría abstracta sin implementar ejercicios prácticos o resolver problemas típicos de examen.`,
        tools: ["Documentación Oficial", "Repositorio de Ejercicios UC", "Simuladores"],
        action_challenge: `Construye un mapa conceptual y resuelve un caso o ejercicio aplicativo completo sobre ${tema}.`,
        isOptional: false,
        checkColor: 'purple',
        community_resources: [
          {
            id: `res-${course.id}-${unitNum}-1`,
            title: `Guía Esencial y Ejercicios Resueltos: ${tema}`,
            type: "Guía",
            url: "https://github.com",
            author: "Comunidad Estudiantil UC",
            upvotes: 45 + idx * 8,
            isVerified: true
          },
          {
            id: `res-${course.id}-${unitNum}-2`,
            title: `Explicación Paso a Paso en Video: ${tema}`,
            type: "Video",
            url: "https://youtube.com",
            author: "Tutoría Académica Continental",
            upvotes: 38 + idx * 5,
            isVerified: true
          }
        ]
      },
      {
        id: deepNodeId,
        title: `Casos de Estudio & Aplicación: ${tema}`,
        importance: 'Medio',
        prerequisites: [mainNodeId],
        first_principles: `Profundización en técnicas avanzadas, resolución de problemas tipo examen y buenas prácticas de ingeniería en ${tema}.`,
        exam_80_20: `Preguntas fijas de resolución numérica o justificación conceptual en los exámenes parciales y finales.`,
        common_pitfall: `No verificar las condiciones de contorno o restricciones normativas del problema.`,
        tools: ["VS Code", "Jupyter", "Calculadora Científica / Software"],
        action_challenge: `Desarrolla una solución integral paso a paso y valida el resultado con un compañero o docente.`,
        isOptional: true,
        checkColor: 'green',
        community_resources: [
          {
            id: `res-${course.id}-${unitNum}-3`,
            title: `Banco de Preguntas Fijas y Balotario Resuelto`,
            type: "Ejercicios",
            url: "https://github.com",
            author: "Círculo de Estudios UC",
            upvotes: 62 + idx * 4,
            isVerified: true
          }
        ]
      }
    ];

    return {
      id: unitId,
      unit_number: unitNum,
      title: `Unidad ${unitNum}: ${tema}`,
      duration_hours: 16,
      exam_target: unitNum <= 2 ? "Consolidado 1 / Examen Parcial" : "Consolidado 2 / Examen Final",
      nodes
    };
  });

  const milestones: EvaluationMilestone[] = [
    {
      code: "C1",
      name: "Consolidado 1",
      week: 4,
      weight_percentage: 20,
      target_units: units.slice(0, Math.ceil(units.length / 4)).map(u => u.id),
      description: `Evaluación de la primera fase: ${course.temas[0] || 'Fundamentos iniciales'}.`
    },
    {
      code: "EP",
      name: "Examen Parcial",
      week: 8,
      weight_percentage: 25,
      target_units: units.slice(0, Math.ceil(units.length / 2)).map(u => u.id),
      description: `Evaluación de medio término que sintetiza la primera mitad del syllabus oficial.`
    },
    {
      code: "C2",
      name: "Consolidado 2",
      week: 12,
      weight_percentage: 20,
      target_units: units.slice(Math.ceil(units.length / 2), Math.ceil((units.length * 3) / 4)).map(u => u.id),
      description: `Evaluación de la segunda fase de contenidos avanzados y proyectos prácticos.`
    },
    {
      code: "EF",
      name: "Examen Final",
      week: 16,
      weight_percentage: 35,
      target_units: units.map(u => u.id),
      description: `Examen final comprensivo que evalúa el logro de todas las competencias de la asignatura.`
    }
  ];

  return {
    subject_code: course.code,
    subject_name: course.name,
    career: "Ingeniería de Sistemas e Informática",
    term: "2026-1",
    formula: "PF = C1(20%) + EP(25%) + C2(20%) + EF(35%)",
    milestones,
    units,
    professors: [
      {
        id: `prof-${course.id}-1`,
        full_name: "Dr. Carlos Alberto Mendoza Vega",
        title_degree: "Ph.D. en Ciencias de la Computación e Ingeniería de Software",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        is_active: true,
        semesters_taught: ["2024-1", "2024-2", "2025-1", "2025-2", "2026-1"],
        campuses: ["Huancayo", "Lima", "A Distancia"],
        modalities: ["Presencial", "Semipresencial", "A Distancia"],
        badge: "Docente Catedrático Principal",
        teaching_style: {
          summary: "Enfoque 100% práctico orientado a la resolución de problemas reales y rúbricas claras de evaluación continua.",
          methodology: "Clases dinámicas con ejemplos de la industria, resolución de balotarios paso a paso y retroalimentación semanal.",
          exam_style: "Evaluaciones basadas en casos prácticos y aplicación directa de los conceptos vistos en clase.",
          evaluation_criteria: "Pondera el procedimiento lógico, la justificación técnica y la puntualidad en entregables.",
          recommended_tools: ["VS Code", "GitHub", "Canvas UC"]
        },
        recommendations: {
          dos: [
            "Participa activamente en clase y asiste puntualmente a las sesiones de práctica.",
            "Revisa el material de Canvas y resuelve los ejercicios propuestos antes de cada evaluación."
          ],
          donts: [
            "No dejes los entregables para el último día ni copies soluciones de internet sin comprenderlas.",
            "No faltes a las evaluaciones de Consolidado, ya que son determinantes para el promedio final."
          ],
          best_practice_quote: "El rigor en la práctica diaria es lo que transforma a un estudiante en un ingeniero de impacto."
        },
        stats: {
          rating: 4.8,
          review_count: 54,
          approval_rate_percentage: 89,
          clarity_score: 94,
          difficulty_level: "Media",
          strictness_score: 82,
          responsiveness_score: 95
        },
        reviews: [
          {
            id: `rev-${course.id}-1`,
            author_term: "2025-2",
            campus: "Huancayo",
            grade_obtained: "17",
            comment: "Excelente docente. Sus explicaciones son directas y los exámenes miden exactamente lo practicado en clase.",
            date: "Diciembre 2025",
            upvotes: 38,
            tags: ["Explicación Clara", "Puntual", "Rúbricas Justas"]
          }
        ]
      }
    ]
  };
}
