import { CourseRoadmap } from '@/types/roadmap';

export const matematicaDiscreta2Data: CourseRoadmap = {
  subject_code: "UC-DISC2",
  subject_name: "Matemática Discreta 2",
  career: "Ingeniería de Sistemas e Informática",
  term: "2026-1",
  formula: "PF = C1(20%) + EP(25%) + C2(20%) + EF(35%)",
  milestones: [
    {
      code: "C1",
      name: "Consolidado 1",
      week: 4,
      weight_percentage: 20,
      target_units: ["u1"],
      description: "Evaluación continua de la Unidad 1: Representación de grafos con matrices, invariantes de isomorfismo, circuitos de Euler vs Hamilton y rutas mínimas con Dijkstra.",
      community_resources: [
        {
          id: "res-c1-1",
          title: "Balotario Resuelto Exámenes C1 Semestres 2024 y 2025 (PDF)",
          type: "Ejercicios",
          url: "https://github.com",
          author: "Comunidad Sistemas UC",
          upvotes: 142,
          isVerified: true
        },
        {
          id: "res-c1-2",
          title: "Plantilla para Tablas de Dijkstra Paso a Paso para Evaluaciones",
          type: "Guía",
          url: "https://visualgo.net",
          author: "Club de Algoritmia Continental",
          upvotes: 89,
          isVerified: true
        }
      ]
    },
    {
      code: "EP",
      name: "Examen Parcial",
      week: 8,
      weight_percentage: 25,
      target_units: ["u1", "u2"],
      description: "Examen central que cubre Grafos (Unidad 1) y Árboles / MST (Unidad 2). Preguntas fijas sobre Prim vs Kruskal y recorrido de árboles binarios.",
      community_resources: [
        {
          id: "res-ep-1",
          title: "Megaguía: Preguntas Fijas del Parcial de Discreta 2",
          type: "Guía",
          url: "https://github.com",
          author: "Diego R. (Top 1 Promoción 2025)",
          upvotes: 215,
          isVerified: true
        },
        {
          id: "res-ep-2",
          title: "Kruskal y Prim sin caer en trampas de aristas repetidas",
          type: "Video",
          url: "https://youtube.com",
          author: "Tutorías Académicas UC",
          upvotes: 134,
          duration: "18 mins"
        }
      ]
    },
    {
      code: "C2",
      name: "Consolidado 2",
      week: 12,
      weight_percentage: 20,
      target_units: ["u3"],
      description: "Evaluación de la Unidad 3: Jerarquía de Chomsky, clasificación de gramáticas regulares vs libres de contexto y simplificación con Lema de Arden.",
      community_resources: [
        {
          id: "res-c2-1",
          title: "Guía Rápida de Identificación de Tipos Chomsky (Tabla Resumen)",
          type: "CheatSheet",
          url: "https://github.com",
          author: "Comunidad de Compiladores e IA",
          upvotes: 98,
          isVerified: true
        },
        {
          id: "res-c2-2",
          title: "Resolución de Ecuaciones de Lenguajes con Lema de Arden",
          type: "Artículo",
          url: "https://medium.com",
          author: "Ing. Carlos Mendoza",
          upvotes: 76
        }
      ]
    },
    {
      code: "EF",
      name: "Examen Final",
      week: 16,
      weight_percentage: 35,
      target_units: ["u1", "u2", "u3", "u4"],
      description: "El hito de mayor peso (35%). Integra todas las unidades con énfasis decisivo en Máquinas de Estados Finitos (AFD, AFND y Minimización de Moore).",
      community_resources: [
        {
          id: "res-ef-1",
          title: "Compendio Maestro Examen Final UC (Teoría + 40 Ejercicios)",
          type: "Ejercicios",
          url: "https://github.com",
          author: "Centro de Estudiantes Ingeniería",
          upvotes: 380,
          isVerified: true
        },
        {
          id: "res-ef-2",
          title: "Algoritmo de Construcción de Subconjuntos y Minimización",
          type: "Video",
          url: "https://youtube.com",
          author: "Profe Discretas Continental",
          upvotes: 195,
          duration: "32 mins"
        }
      ]
    }
  ],
  units: [
    {
      id: "u1",
      unit_number: 1,
      title: "Teoría de Grafos y Conectividad",
      duration_hours: 24,
      exam_target: "Consolidado 1 / Examen Parcial",
      nodes: [
        {
          id: "u1-n1",
          title: "Representación Matricial de Grafos (Adyacencia e Incidencia)",
          importance: "Crítico",
          prerequisites: ["Álgebra Matricial Básica", "Concepto de Vértice y Arista"],
          first_principles: "Un grafo es una relación binaria sobre un conjunto de vértices. Las matrices codifican esta relación de forma algebraica; las potencias A^k de la matriz de adyacencia computan exactamente el número de caminos de longitud k entre dos vértices.",
          exam_80_20: "En los exámenes de la UC evalúan el cálculo e interpretación de A² y A³ para contar caminos directos entre nodos, y la diferencia de simetría entre dígrafos y grafos no dirigidos.",
          common_pitfall: "Confundir la matriz de adyacencia (V x V) con la matriz de incidencia (V x E), o no duplicar aristas no dirigidas como pares bidireccionales en la matriz simétrica.",
          tools: ["NetworkX (Python)", "Geogebra Grapher", "Visualgo.net"],
          action_challenge: "Construir la matriz de adyacencia de un grafo de 5 nodos dado en examen pasado y calcular el número de caminos de longitud 3 del nodo 1 al nodo 4 calculando A³.",
          community_resources: [
            {
              id: "res-u1n1-1",
              title: "Cálculo de caminos con potencias A^k en 5 minutos",
              type: "Video",
              url: "https://youtube.com",
              author: "Juan C. (Ayudante de Cátedra)",
              upvotes: 112,
              duration: "8 mins",
              isVerified: true
            },
            {
              id: "res-u1n1-2",
              title: "Cheat Sheet: Adyacencia vs Incidencia y Propiedades de Potencias",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Comunidad Sistemas UC",
              upvotes: 84,
              isVerified: true
            },
            {
              id: "res-u1n1-3",
              title: "Simulador Interactivo de Matrices de Adyacencia",
              type: "Guía",
              url: "https://visualgo.net",
              author: "OpenSource Team",
              upvotes: 62
            }
          ]
        },
        {
          id: "u1-n2",
          title: "Isomorfismo de Grafos e Invariantes",
          importance: "Alto",
          prerequisites: ["Representación Matricial", "Grados de Vértices"],
          first_principles: "Dos grafos son isomorfos si conservan la misma estructura topológica bajo un renombrado biyectivo de vértices. Si difieren en un solo invariante (número de vértices, aristas, secuencia de grados o ciclos inducidos), no son isomorfos.",
          exam_80_20: "Pregunta clásica de justificación: Demostrar que dos grafos de 6 a 8 vértices NO son isomorfos hallando un invariante discrepante (ej. ciclo C3 ausente o distribución de vecinos).",
          common_pitfall: "Asumir que si tienen el mismo número de vértices, aristas y secuencia de grados ya son isomorfos. Dichos invariantes son condición necesaria pero NO suficiente.",
          tools: ["Graph Tea", "Python pynauty"],
          action_challenge: "Tomar dos grafos con idéntica secuencia de grados [3,3,3,3,2,2] y probar formalmente si existe una biyección o si difieren en ciclos conexos.",
          community_resources: [
            {
              id: "res-u1n2-1",
              title: "Cómo descartar Isomorfismo en exámenes sin perder tiempo",
              type: "Artículo",
              url: "https://medium.com",
              author: "MateDiscreta Facil",
              upvotes: 95,
              isVerified: true
            },
            {
              id: "res-u1n2-2",
              title: "5 Ejercicios de Justificación Rigurosa para Examen C1",
              type: "Ejercicios",
              url: "https://github.com",
              author: "Club Algoritmia UC",
              upvotes: 73
            }
          ]
        },
        {
          id: "u1-n3",
          title: "Caminos y Circuitos de Euler vs Hamilton",
          importance: "Crítico",
          prerequisites: ["Conectividad", "Grado de un Vértice"],
          first_principles: "Euler recorre cada arista exactamente una vez (caracterizado por la paridad de grados: Teorema de Euler). Hamilton visita cada vértice exactamente una vez (problema NP-completo, apoyado en condiciones suficientes de Dirac y Ore).",
          exam_80_20: "C1 y EP exigen clasificar un grafo como euleriano, semieuleriano o no euleriano solo analizando grados impares, y luego trazar el circuito usando el algoritmo de Fleury.",
          common_pitfall: "Olvidar verificar la conexidad antes de aplicar el criterio de grados pares en Euler, o confundir arista puente al ejecutar Fleury eliminando componentes conexas.",
          tools: ["Visualgo Graph Traversal", "Graph Online Euler solver"],
          action_challenge: "Determinar si el grafo de la evaluación C1 contiene camino o circuito euleriano analizando el grado de sus 7 vértices y especificar el recorrido exacto sin repetir aristas.",
          community_resources: [
            {
              id: "res-u1n3-1",
              title: "Algoritmo de Fleury paso a paso para no borrar puentes",
              type: "Video",
              url: "https://youtube.com",
              author: "Tutorías UC",
              upvotes: 128,
              duration: "12 mins",
              isVerified: true
            },
            {
              id: "res-u1n3-2",
              title: "Regla Mnemotécnica Euler vs Hamilton en 1 página",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Lucia M.",
              upvotes: 88
            }
          ]
        },
        {
          id: "u1-n4",
          title: "Rutas Óptimas: Algoritmos de Dijkstra y Floyd-Warshall",
          importance: "Crítico",
          prerequisites: ["Grafos Ponderados", "Estructuras de Datos Cola de Prioridad"],
          first_principles: "Principio de Optimalidad de Bellman: todo subcamino de una ruta mínima es a su vez una ruta mínima. Dijkstra utiliza una estrategia voraz (greedy) para fuente única; Floyd-Warshall usa programación dinámica para todos los pares.",
          exam_80_20: "En la evaluación presencial se exige llenar la tabla de iteraciones de Dijkstra paso a paso (Vértice actual, Vector de distancias tentativas D[v], Predecesor P[v]). La pérdida de puntos suele ser error aritmético en la tabla.",
          common_pitfall: "Intentar aplicar Dijkstra a grafos con aristas de peso negativo (lleva a resultados incorrectos) o no actualizar los nodos permanentes en la tabla del examen.",
          tools: ["Graph Online Dijkstra Visualizer", "Python heapq"],
          action_challenge: "Ejecutar manualmente la tabla de Dijkstra para un grafo ponderado de 6 nodos y 9 aristas partiendo del nodo origen 'A' hasta 'F', anotando el árbol generador de rutas.",
          community_resources: [
            {
              id: "res-u1n4-1",
              title: "Plantilla Oficial en Excel para la tabla de Dijkstra del examen",
              type: "Guía",
              url: "https://docs.google.com",
              author: "Comunidad Sistemas UC",
              upvotes: 184,
              isVerified: true
            },
            {
              id: "res-u1n4-2",
              title: "Visualizador de Dijkstra paso a paso",
              type: "Artículo",
              url: "https://visualgo.net/en/sssp",
              author: "VisuAlgo",
              upvotes: 104
            }
          ]
        }
      ]
    },
    {
      id: "u2",
      unit_number: 2,
      title: "Árboles y Árboles de Expansión Mínima (MST)",
      duration_hours: 24,
      exam_target: "Examen Parcial",
      nodes: [
        {
          id: "u2-n1",
          title: "Propiedades Fundamentales de Árboles y Árboles Binarios de Búsqueda (BST)",
          importance: "Alto",
          prerequisites: ["Concepto de Grafo Acíclico", "Conectividad"],
          first_principles: "Un árbol de n vértices tiene exactamente n-1 aristas y un único camino simple entre cualquier par de nodos. Un BST impone la invariante de orden: subárbol izquierdo < raíz < subárbol derecho en cada nodo.",
          exam_80_20: "Reconstruir un árbol a partir de sus recorridos (Inorden + Preorden/Postorden) y balance o eliminación de nodos con dos hijos en un BST.",
          common_pitfall: "Confundir el recorrido Inorden (que produce la secuencia estrictamente ordenada en un BST) con el Preorden al intentar reconstruir la raíz original.",
          tools: ["USFCA Tree Visualizer", "VisuAlgo BST"],
          action_challenge: "Insertar secuencialmente los elementos [45, 23, 67, 12, 34, 89, 50] en un BST, eliminar el nodo raíz (45) mostrando el reemplazo por el sucesor inorden, y dibujar el árbol final.",
          community_resources: [
            {
              id: "res-u2n1-1",
              title: "Reconstrucción exacta de árboles: Inorden + Preorden en 3 pasos",
              type: "Video",
              url: "https://youtube.com",
              author: "Algoritmos Continental",
              upvotes: 139,
              duration: "14 mins",
              isVerified: true
            }
          ]
        },
        {
          id: "u2-n2",
          title: "Algoritmos de Prim y Kruskal para Árbol de Expansión Mínima",
          importance: "Crítico",
          prerequisites: ["Grafos Conexos Ponderados", "Detección de Ciclos / Conjuntos Disjuntos"],
          first_principles: "Dado un grafo conexo ponderado, el MST minimiza la suma total de pesos sin formar ciclos. Kruskal ordena aristas globalmente y las agrega si no crean ciclo; Prim hace crecer un árbol conectando la arista más barata a un nodo no visitado.",
          exam_80_20: "Obligatorio en el Examen Parcial: Mostrar el orden exacto de selección de aristas en Prim vs Kruskal y reportar el peso total mínimo. Las rúbricas penalizan no listar las aristas rechazadas por generar ciclos.",
          common_pitfall: "En Kruskal, no descartar explícitamente aristas que cierran ciclos; en Prim, elegir una arista de menor peso que conecta dos vértices que ya están dentro del árbol actual.",
          tools: ["VisuAlgo MST", "Kruskal Step-by-Step Simulator"],
          action_challenge: "Resolver el ejercicio típico del Examen Parcial: Grafo de 7 nodos, aplicar Kruskal listando aristas ordenadas, estado de aceptación/rechazo, y contrastar con Prim desde el nodo C.",
          community_resources: [
            {
              id: "res-u2n2-1",
              title: "Formato de Tabla Prim vs Kruskal que pide el docente en el Parcial",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Comunidad Sistemas UC",
              upvotes: 167,
              isVerified: true
            }
          ]
        }
      ]
    },
    {
      id: "u3",
      unit_number: 3,
      title: "Lenguajes Formales, Expresiones Regulares y Gramáticas",
      duration_hours: 24,
      exam_target: "Consolidado 2",
      nodes: [
        {
          id: "u3-n1",
          title: "Jerarquía de Chomsky y Gramáticas Generativas",
          importance: "Medio",
          prerequisites: ["Teoría de Conjuntos", "Cadenas y Alfabetos"],
          first_principles: "Un lenguaje es un conjunto de cadenas sobre un alfabeto Σ. Chomsky clasifica las gramáticas G = (V, Σ, R, S) en 4 niveles según las restricciones de sus producciones: Tipo 0 (Sin restricciones), Tipo 1 (Sensibles al contexto), Tipo 2 (Libres de contexto), Tipo 3 (Regulares).",
          exam_80_20: "Identificar a qué nivel de Chomsky pertenece una gramática formal dada inspeccionando la forma de las reglas (α -> β) y construir árboles de derivación para cadenas específicas.",
          common_pitfall: "Confundir gramáticas regulares Tipo 3 (lineales por derecha A -> aB | a) con Tipo 2 libres de contexto (A -> α sin restricción en el lado derecho).",
          tools: ["JFLAP 7.1", "CyberZHG Grammar Tools"],
          action_challenge: "Dada la gramática con producciones S -> aSb | ab, clasificarla según Chomsky, generar la derivación para a³b³ y demostrar formalmente por qué no es regular.",
          community_resources: [
            {
              id: "res-u3n1-1",
              title: "Cómo clasificar gramáticas en Tipo 0, 1, 2 y 3 sin dudar",
              type: "Guía",
              url: "https://github.com",
              author: "Grupo TEORIA UC",
              upvotes: 82
            }
          ]
        },
        {
          id: "u3-n2",
          title: "Expresiones Regulares y Álgebra de Lenguajes",
          importance: "Crítico",
          prerequisites: ["Operaciones de Lenguajes: Concatenación, Unión, Estrella de Kleene"],
          first_principles: "Las expresiones regulares denotan lenguajes regulares mediante composición inductiva con operadores (+, ·, *). Las identidades algebraicas (como el Lema de Arden: X = AX + B => X = A*B) permiten resolver ecuaciones de lenguajes.",
          exam_80_20: "Diseñar la expresión regular para cadenas con restricciones binarias (ej. 'todas las cadenas sobre {0,1} que no contengan la subcadena 11' o 'tengan cantidad par de ceros').",
          common_pitfall: "Olvidar incluir la cadena vacía (λ o ε) cuando el exponente de Kleene (*) permite longitud cero, o confundir (a+b)* con a*+b*.",
          tools: ["Regex101", "RegExr", "Debuggex visualizer"],
          action_challenge: "Escribir la expresión regular simplificada para el lenguaje sobre Σ={a,b} donde cada ocurrencia de 'a' es seguida inmediatamente por al menos dos 'b'.",
          community_resources: [
            {
              id: "res-u3n2-1",
              title: "Lema de Arden resuelto con 4 ejemplos paso a paso",
              type: "Video",
              url: "https://youtube.com",
              author: "Profesor Discreta",
              upvotes: 119,
              duration: "21 mins",
              isVerified: true
            }
          ]
        }
      ]
    },
    {
      id: "u4",
      unit_number: 4,
      title: "Autómatas Finitos y Máquinas de Estados",
      duration_hours: 24,
      exam_target: "Examen Final",
      nodes: [
        {
          id: "u4-n1",
          title: "Autómatas Finitos Deterministas (AFD) y No Deterministas (AFND)",
          importance: "Crítico",
          prerequisites: ["Expresiones Regulares", "Grafos Dirigidos"],
          first_principles: "Un AFD es una 5-tupla (Q, Σ, δ, q0, F) con transiciones unívocas δ: Q × Σ → Q. Un AFND permite múltiples estados destino o transiciones vacías (ε). Por el teorema de Rabin-Scott, ambos tienen el mismo poder expresivo.",
          exam_80_20: "Pregunta fija de 5 puntos en Examen Final: Convertir un AFND o AFND-λ a un AFD equivalente utilizando el método de construcción de subconjuntos (tabla de cerraduras-ε y transiciones).",
          common_pitfall: "Omitir el estado de error/muerte (sink state) en el AFD para completitud de funciones, o calcular de manera incompleta la cerradura-ε al incluir el estado inicial.",
          tools: ["JFLAP", "Automata Simulator Online", "FSM Simulator"],
          action_challenge: "Diseñar un AFND para reconocer cadenas que terminan en '01' sobre {0,1}, y transformarlo paso a paso mediante construcción de subconjuntos en su AFD mínimo.",
          community_resources: [
            {
              id: "res-u4n1-1",
              title: "Conversión AFND a AFD por tabla de subconjuntos sin fallos",
              type: "Video",
              url: "https://youtube.com",
              author: "Comunidad Sistemas UC",
              upvotes: 210,
              duration: "26 mins",
              isVerified: true
            },
            {
              id: "res-u4n1-2",
              title: "Guía de JFLAP para verificar ejercicios de examen en 3 minutos",
              type: "Guía",
              url: "https://github.com",
              author: "Alex O.",
              upvotes: 145,
              isVerified: true
            }
          ]
        },
        {
          id: "u4-n2",
          title: "Minimización de Autómatas Finitos (Algoritmo de Moore / Hopcroft)",
          importance: "Crítico",
          prerequisites: ["AFD", "Relaciones de Equivalencia"],
          first_principles: "El Teorema de Myhill-Nerode establece que para cada lenguaje regular existe un único AFD minimal (salvo isomorfismo). La minimización particiona los estados separando iterativamente estados distinguibles de indistinguibles.",
          exam_80_20: "En el Examen Final de la UC se evalúa la tabla triangular de estados distinguibles (método de llenado de tablas o particiones sucesivas P0 = {F, Q-F}, P1, P2...).",
          common_pitfall: "No eliminar primero los estados inaccesibles/inalcanzables desde el estado inicial q0 antes de aplicar el algoritmo de particionamiento, lo que invalida el resultado.",
          tools: ["JFLAP State Minimizer", "CyberZHG DFA Minimizer"],
          action_challenge: "Tomar un AFD de 6 estados con estados equivalentes, eliminar estados inaccesibles y computar la partición final de estados equivalentes dibujando el autómata mínimo resultante.",
          community_resources: [
            {
              id: "res-u4n2-1",
              title: "Método de Partición vs Tabla Triangular: Cuál usar en el Examen Final",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Ayudantía UC",
              upvotes: 172,
              isVerified: true
            }
          ]
        }
      ]
    }
  ]
};
