import { CourseRoadmap } from '@/types/roadmap';

export const matematicaDiscreta2Data: CourseRoadmap = {
  subject_code: "UC-DISC2",
  subject_name: "Matemática Discreta II",
  career: "Ingeniería de Sistemas e Informática",
  term: "2026-1",
  formula: "PF = C1(20%) + EP(25%) + C2(20%) + EF(35%)",
  milestones: [
    {
      code: "C1",
      name: "Consolidado 1",
      week: 4,
      weight_percentage: 20,
      target_units: ["u-conteo", "u-recurrencia"],
      description: "Evaluación continua 1: Técnicas de conteo avanzado, permutaciones, combinaciones, principio de inclusión-exclusión y resolución de relaciones de recurrencia lineales.",
      community_resources: [
        {
          id: "res-c1-1",
          title: "Balotario Resuelto Conteo y Recurrencias UC 2025 (PDF)",
          type: "Ejercicios",
          url: "https://github.com",
          author: "Comunidad Sistemas UC",
          upvotes: 142,
          isVerified: true
        },
        {
          id: "res-c1-2",
          title: "Plantilla para Ecuaciones Características y Raíces Múltiples",
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
      target_units: ["u-grafos", "u-arboles"],
      description: "Examen central que cubre Teoría de Grafos y Árboles (Kruskal, Prim, caminos, circuitos de Euler/Hamilton, isomorfismo y búsqueda DFS/BFS).",
      community_resources: [
        {
          id: "res-ep-1",
          title: "Megaguía: Preguntas Fijas de Grafos y Árboles Parcial UC",
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
      target_units: ["u-algebraicas", "u-boole"],
      description: "Evaluación de Estructuras Algebraicas (grupos, subgrupos, anillos) y Álgebra de Boole (simplificación lógica, mapas de Karnaugh).",
      community_resources: [
        {
          id: "res-c2-1",
          title: "Resumen de Tablas de Cayley y Demostración de Grupos Abelianos",
          type: "CheatSheet",
          url: "https://github.com",
          author: "Comunidad de Álgebra y Lógica UC",
          upvotes: 98,
          isVerified: true
        }
      ]
    },
    {
      code: "EF",
      name: "Examen Final",
      week: 16,
      weight_percentage: 35,
      target_units: ["u-modelos", "u-gramaticas", "u-turing"],
      description: "El hito de mayor peso (35%). Integra Modelos de Computación, Autómatas Finitos (AFD/AFND), Jerarquía de Chomsky y Máquinas de Turing.",
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
          title: "Construcción de Subconjuntos y Máquinas de Turing Paso a Paso",
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
      id: "u-conteo",
      unit_number: 1,
      title: "Fundamentos y Conteo",
      duration_hours: 18,
      exam_target: "Consolidado 1",
      nodes: [
        {
          id: "n-principio-mult",
          title: "¿Qué es el principio multiplicativo?",
          importance: "Medio",
          isOptional: true,
          checkColor: "purple",
          prerequisites: ["Conjuntos", "Operaciones Básicas"],
          first_principles: "Si un evento puede ocurrir en m formas y un segundo evento en n formas independientes, el total de formas conjuntas es m × n.",
          exam_80_20: "Clave para problemas de conteo de combinaciones de contraseñas, placas y rutas sin retorno.",
          common_pitfall: "Confundir con el principio aditivo cuando los eventos son mutuamente excluyentes.",
          tools: ["Calculadora Factorial", "Wolfram Alpha"],
          action_challenge: "Calcular el número de contraseñas de 8 caracteres con al menos una mayúscula y un dígito.",
          community_resources: [
            {
              id: "res-pm-1",
              title: "Principio Multiplicativo vs Aditivo en 6 minutos",
              type: "Video",
              url: "https://youtube.com",
              author: "MateDiscreta",
              upvotes: 87,
              duration: "6 mins",
              isVerified: true
            }
          ]
        },
        {
          id: "n-permutaciones",
          title: "Permutaciones y Combinaciones",
          importance: "Crítico",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Principio Multiplicativo", "Factoriales"],
          first_principles: "En las permutaciones el orden de los elementos importa (nPr); en las combinaciones el orden no tiene relevancia (nCr).",
          exam_80_20: "Pregunta obligatoria de C1: Distribución con y sin repetición, selección de comités con restricciones condicionales.",
          common_pitfall: "No identificar si los objetos son distinguibles o no distinguibles antes de plantear la fórmula.",
          tools: ["Combinatorics Calculator", "Python itertools"],
          action_challenge: "Resolver el problema de formar un comité de 5 personas de un grupo de 8 hombres y 6 mujeres con al menos 2 mujeres.",
          community_resources: [
            {
              id: "res-pc-1",
              title: "Guía Rápida: Cuándo usar nPr vs nCr",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Comunidad UC",
              upvotes: 115,
              isVerified: true
            }
          ]
        },
        {
          id: "n-inclusion-exclusion",
          title: "Principio de Inclusión-Exclusión",
          importance: "Alto",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Teoría de Conjuntos", "Diagramas de Venn"],
          first_principles: "Para contar la unión de conjuntos sin sobrecontar intersecciones: sumar tamaños individuales, restar intersecciones dobles, sumar triples, etc.",
          exam_80_20: "Problemas de conteo de números divisibles entre 3, 5 o 7 en un rango dado [1, 1000].",
          common_pitfall: "Olvidar alternar los signos (+, -, +, -) o no calcular correctamente las intersecciones múltiples.",
          tools: ["Wolfram Alpha Set Theory", "Venn Diagram Visualizer"],
          action_challenge: "Determinar cuántos enteros entre 1 y 500 no son divisibles ni por 2, ni por 3, ni por 5.",
          community_resources: [
            {
              id: "res-pie-1",
              title: "Inclusión-Exclusión con 3 y 4 conjuntos paso a paso",
              type: "Video",
              url: "https://youtube.com",
              author: "Profe UC Discreta",
              upvotes: 94,
              duration: "15 mins"
            }
          ]
        },
        {
          id: "n-palomar",
          title: "Principio del Palomar",
          importance: "Medio",
          isOptional: true,
          checkColor: "green",
          prerequisites: ["Conteo Básico"],
          first_principles: "Si n palomas se colocan en k palomares y n > k, entonces al menos un palomar contiene al menos ⌈n/k⌉ palomas.",
          exam_80_20: "Demostraciones de existencia en exámenes: probar que en un grupo de personas al menos dos comparten día de cumpleaños o número de amigos.",
          common_pitfall: "No definir con precisión quiénes son las palomas (objetos) y quiénes son los palomares (casillas/categorías).",
          tools: ["Pigeonhole Principle Simulator"],
          action_challenge: "Demostrar que si se eligen 5 números del conjunto {1, 2, ..., 8}, al menos dos suman exactamente 9.",
          community_resources: [
            {
              id: "res-pal-1",
              title: "10 Ejercicios Clásicos del Principio del Palomar",
              type: "Ejercicios",
              url: "https://github.com",
              author: "Club de Algoritmia",
              upvotes: 78
            }
          ]
        }
      ]
    },
    {
      id: "u-recurrencia",
      unit_number: 2,
      title: "Relaciones de Recurrencia",
      duration_hours: 18,
      exam_target: "Consolidado 1",
      nodes: [
        {
          id: "n-recurrencias-lineales",
          title: "Recurrencias Lineales Homogéneas y No Homogéneas",
          importance: "Crítico",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Álgebra Polinomial", "Ecuaciones Cuadráticas"],
          first_principles: "La solución general es la suma de la solución homogénea (raíces de la ecuación característica) y la solución particular a_n = a_n^(h) + a_n^(p).",
          exam_80_20: "Hallar la solución cerrada de una recurrencia lineal de orden 2 dadas condiciones iniciales a_0 y a_1.",
          common_pitfall: "Tratar raíces repetidas (r1 = r2) sin multiplicar por el factor n en c_2·n·r^n.",
          tools: ["Wolfram Alpha Recurrence Solver", "SymPy Recurrence"],
          action_challenge: "Resolver a_n - 5a_{n-1} + 6a_{n-2} = 0 con a_0 = 1, a_1 = 4 y graficar sus primeros 6 términos.",
          community_resources: [
            {
              id: "res-rec-1",
              title: "Método de la Ecuación Característica en 10 minutos",
              type: "Video",
              url: "https://youtube.com",
              author: "Tutorías UC",
              upvotes: 145,
              duration: "11 mins",
              isVerified: true
            }
          ]
        },
        {
          id: "n-coeficientes-indeterminados",
          title: "Método de Coeficientes Indeterminados",
          importance: "Alto",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Recurrencias Lineales Homogéneas"],
          first_principles: "Proponer una solución particular que tenga la misma forma funcional que el término no homogéneo F(n) (polinomio, exponencial o combinación).",
          exam_80_20: "Casos donde F(n) = c·2^n o F(n) = A·n + B con duplicación de raíces.",
          common_pitfall: "Olvidar multiplicar la propuesta particular por n^s cuando la base exponencial ya es raíz de la ecuación característica.",
          tools: ["Casio ClassWiz Recurrence Mode", "Python Calculator"],
          action_challenge: "Resolver a_n - 4a_{n-1} = 3·2^n con condición a_0 = 1.",
          community_resources: [
            {
              id: "res-coef-1",
              title: "Tabla de Ensayos Particulares para Exámenes",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Comunidad Sistemas UC",
              upvotes: 92
            }
          ]
        }
      ]
    },
    {
      id: "u-grafos",
      unit_number: 3,
      title: "Teoría de Grafos",
      duration_hours: 24,
      exam_target: "Examen Parcial",
      nodes: [
        {
          id: "n-grafos-caminos",
          title: "Grafos, caminos y ciclos",
          importance: "Crítico",
          isOptional: true,
          checkColor: "green",
          prerequisites: ["Conjuntos", "Relaciones Binarias"],
          first_principles: "Un grafo G = (V, E) modela relaciones entre entidades. Un camino es una secuencia de vértices adyacentes; un ciclo es un camino cerrado sin repetir vértices intermedios.",
          exam_80_20: "Cálculo de caminos y ciclos eulerianos (condición de paridad de grados) vs hamiltonianos.",
          common_pitfall: "Confundir un camino simple (sin vértices repetidos) con un paseo o trayectoria.",
          tools: ["Graph Online Visualizer", "Geogebra Grapher"],
          action_challenge: "Identificar si un grafo dado de 8 vértices admite circuito euleriano usando el Teorema de Euler.",
          community_resources: [
            {
              id: "res-graf-1",
              title: "Euler vs Hamilton: Regla Mnemotécnica en 1 Hoja",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Diego R.",
              upvotes: 160,
              isVerified: true
            }
          ]
        },
        {
          id: "n-conectividad-subgrafos",
          title: "Conectividad y Subgrafos",
          importance: "Alto",
          isOptional: true,
          checkColor: "purple",
          prerequisites: ["Grafos Básicos"],
          first_principles: "Un grafo es conexo si existe al menos un camino entre todo par de vértices. Los subgrafos inducidos se forman tomando un subconjunto de vértices y todas las aristas entre ellos.",
          exam_80_20: "Cálculo de componentes conexas y matriz de adyacencia de subgrafos.",
          common_pitfall: "Omitir aristas al construir un subgrafo inducido.",
          tools: ["NetworkX (Python)", "Visualgo Graph"],
          action_challenge: "Calcular el número de componentes conexas de un grafo no conexo a partir de su matriz de adyacencia.",
          community_resources: [
            {
              id: "res-con-1",
              title: "Componentes Fuertemente Conexas en Dígrafos",
              type: "Video",
              url: "https://youtube.com",
              author: "Club Algoritmia",
              upvotes: 75,
              duration: "14 mins"
            }
          ]
        },
        {
          id: "n-isomorfismo-grafos",
          title: "Isomorfismo de Grafos",
          importance: "Alto",
          isOptional: true,
          checkColor: "green",
          prerequisites: ["Matriz de Adyacencia", "Grados de Vértices"],
          first_principles: "Dos grafos son isomorfos si conservan la misma estructura topológica bajo un renombrado biyectivo. Si difieren en un solo invariante, no son isomorfos.",
          exam_80_20: "Demostrar que dos grafos con la misma secuencia de grados NO son isomorfos hallando ciclos de distinta longitud.",
          common_pitfall: "Asumir que tener iguales vértices, aristas y secuencia de grados garantiza el isomorfismo.",
          tools: ["Graph Tea", "Python pynauty"],
          action_challenge: "Descartar el isomorfismo entre dos grafos de 6 vértices analizando la conectividad de los nodos de grado 3.",
          community_resources: [
            {
              id: "res-iso-1",
              title: "Descarte Rápido de Isomorfismo en Evaluaciones",
              type: "Artículo",
              url: "https://medium.com",
              author: "MateDiscreta Facil",
              upvotes: 95,
              isVerified: true
            }
          ]
        },
        {
          id: "n-planares-coloreado",
          title: "Grafos Planares y Coloreado",
          importance: "Medio",
          isOptional: true,
          checkColor: "green",
          prerequisites: ["Grafos, caminos y ciclos"],
          first_principles: "Fórmula de Euler para grafos planares conexos: v - e + f = 2. El número cromático χ(G) es el mínimo de colores para colorear vértices sin que vecinos compartan color.",
          exam_80_20: "Uso del Teorema de Kuratowski (no contener K_5 ni K_{3,3}) y coloreado voraz de mapas.",
          common_pitfall: "Olvidar contar la región infinita exterior f como una de las caras en la fórmula de Euler.",
          tools: ["Planar Graph Validator", "Graph Coloring Applet"],
          action_challenge: "Verificar si el grafo de Petersen es planar y calcular su número cromático.",
          community_resources: [
            {
              id: "res-plan-1",
              title: "Demostración de No-Planaridad con Teorema de Kuratowski",
              type: "Video",
              url: "https://youtube.com",
              author: "Profesor Discretas",
              upvotes: 83,
              duration: "16 mins"
            }
          ]
        }
      ]
    },
    {
      id: "u-arboles",
      unit_number: 4,
      title: "Árboles",
      duration_hours: 24,
      exam_target: "Examen Parcial",
      nodes: [
        {
          id: "n-arboles-expansion",
          title: "Árboles de expansión",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Teoría de Grafos", "Conectividad"],
          first_principles: "Un árbol de expansión de un grafo conexo G de n vértices es un subgrafo que contiene todos los vértices de G y es un árbol (posee n-1 aristas sin ciclos).",
          exam_80_20: "Generación de árboles de expansión a partir de recorridos BFS y DFS.",
          common_pitfall: "Crear aristas que cierran ciclos desconectando otros vértices.",
          tools: ["VisuAlgo Tree Traversal"],
          action_challenge: "Dibujar dos árboles de expansión no isomorfos para un grafo completo K4.",
          community_resources: [
            {
              id: "res-arb-1",
              title: "Árboles de Expansión por DFS y BFS explicados",
              type: "Guía",
              url: "https://github.com",
              author: "Comunidad Sistemas UC",
              upvotes: 110,
              isVerified: true
            }
          ]
        },
        {
          id: "n-mst-kruskal-prim",
          title: "Árboles de Expansión Mínima (Kruskal, Prim)",
          importance: "Crítico",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Árboles de expansión", "Grafos Ponderados"],
          first_principles: "El MST minimiza el peso acumulado de aristas. Kruskal selecciona aristas de menor peso globalmente evitando ciclos; Prim expande un árbol desde un vértice inicial con la arista incidente más económica.",
          exam_80_20: "Pregunta fija de 5 puntos en el Examen Parcial: Tabla comparativa de selección de aristas en Kruskal vs Prim y peso total.",
          common_pitfall: "No reportar las aristas rechazadas en Kruskal por generar ciclos.",
          tools: ["VisuAlgo MST Simulator", "Kruskal Step-by-Step"],
          action_challenge: "Calcular el MST para un grafo ponderado de 7 nodos y listar orden exacto de aceptación y rechazo.",
          community_resources: [
            {
              id: "res-mst-1",
              title: "Plantilla Oficial Kruskal vs Prim para el Parcial UC",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Comunidad UC",
              upvotes: 198,
              isVerified: true
            }
          ]
        },
        {
          id: "n-dfs-bfs",
          title: "Búsquedas DFS y BFS",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Árboles de expansión"],
          first_principles: "BFS explora por niveles usando una cola (FIFO); DFS explora en profundidad usando una pila (LIFO o recursión).",
          exam_80_20: "Trazar el orden de visita de nodos partiendo de un vértice dado respetando orden alfabético.",
          common_pitfall: "Romper empates de manera inconsistente en vez de seguir el orden alfabético indicado en el examen.",
          tools: ["Graph Traversal Visualizer", "Python graph-search"],
          action_challenge: "Trazar el árbol DFS y el árbol BFS para un dígrafo de 6 nodos y comparar sus alturas.",
          community_resources: [
            {
              id: "res-bfs-1",
              title: "DFS vs BFS en 8 minutos con Colas y Pilas",
              type: "Video",
              url: "https://youtube.com",
              author: "Algoritmos Continental",
              upvotes: 89,
              duration: "9 mins"
            }
          ]
        }
      ]
    },
    {
      id: "u-algebraicas",
      unit_number: 5,
      title: "Estructuras Algebraicas",
      duration_hours: 20,
      exam_target: "Consolidado 2",
      nodes: [
        {
          id: "n-grupos-subgrupos",
          title: "Grupos y Subgrupos",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Operaciones Binarias", "Axiomas de Grupo"],
          first_principles: "Un grupo (G, *) cumple: cerradura, asociatividad, elemento neutro y elemento inverso. Es abeliano si además es conmutativo.",
          exam_80_20: "Construcción y análisis de Tablas de Cayley para conjuntos finitos módulo n (Z_n, +) y verificación del Teorema de Lagrange.",
          common_pitfall: "Olvidar verificar la existencia del inverso para TODOS los elementos del conjunto.",
          tools: ["Cayley Table Generator", "Wolfram Alpha Abstract Algebra"],
          action_challenge: "Determinar si (Z_7*, ·) es un grupo cíclico y encontrar todos sus generadores.",
          community_resources: [
            {
              id: "res-grp-1",
              title: "Cómo verificar axiomas de grupo en exámenes",
              type: "Guía",
              url: "https://github.com",
              author: "Comunidad Lógica UC",
              upvotes: 88,
              isVerified: true
            }
          ]
        },
        {
          id: "n-anillos-campos",
          title: "Anillos y Campos",
          importance: "Medio",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Grupos y Subgrupos"],
          first_principles: "Un anillo tiene dos operaciones (+, ·), donde (R, +) es grupo abeliano y (R, ·) es semigrupo distributivo. Un campo además tiene inverso multiplicativo para no nulos.",
          exam_80_20: "Diferenciar entre dominios de integridad y campos finitos (Galois Fields GF(p)).",
          common_pitfall: "Confundir divisores de cero con elementos invertibles en anillos Z_n no primos.",
          tools: ["Finite Fields Calculator"],
          action_challenge: "Demostrar por qué (Z_6, +, ·) no es un dominio entero identificando sus divisores de cero.",
          community_resources: [
            {
              id: "res-anillo-1",
              title: "Anillos, Dominios de Integridad y Cuerpos en Diagrama Resumen",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Club de Ciencias UC",
              upvotes: 72
            }
          ]
        }
      ]
    },
    {
      id: "u-modelos",
      unit_number: 6,
      title: "Modelos de Computación",
      duration_hours: 24,
      exam_target: "Examen Final",
      nodes: [
        {
          id: "n-dfa-nfa",
          title: "Autómatas Finitos (DFA y NFA)",
          importance: "Crítico",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Teoría de Conjuntos", "Cadenas y Alfabetos"],
          first_principles: "Un AFD tiene transiciones deterministas exactas; un AFND permite múltiples transiciones o saltos vacíos (ε). Ambos reconocen la clase de lenguajes regulares.",
          exam_80_20: "Pregunta fija de 5 puntos: Algoritmo de construcción de subconjuntos para convertir AFND a AFD y minimización de Moore.",
          common_pitfall: "Omitir el estado sumidero (muerto) o calcular erróneamente la cerradura-ε.",
          tools: ["JFLAP 7.1", "Automata Simulator Online"],
          action_challenge: "Convertir un AFND con transiciones ε a un AFD equivalente y simplificarlo.",
          community_resources: [
            {
              id: "res-dfa-1",
              title: "Conversión AFND a AFD por tabla sin equivocarse",
              type: "Video",
              url: "https://youtube.com",
              author: "Comunidad Sistemas UC",
              upvotes: 210,
              duration: "26 mins",
              isVerified: true
            }
          ]
        },
        {
          id: "n-gramaticas-modelos",
          title: "Gramáticas",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Autómatas Finitos"],
          first_principles: "Una gramática G = (V, Σ, R, S) define reglas generativas de sustitución que producen el lenguaje L(G).",
          exam_80_20: "Transformar expresiones regulares en gramáticas lineales derechas y viceversa.",
          common_pitfall: "Mezclar variables no terminales con símbolos terminales en las producciones regulares.",
          tools: ["CyberZHG Grammar Tools"],
          action_challenge: "Construir la gramática lineal derecha para el lenguaje de cadenas binarias con un número impar de ceros.",
          community_resources: [
            {
              id: "res-gram-1",
              title: "Gramáticas Regulares vs Expresiones Regulares",
              type: "Guía",
              url: "https://github.com",
              author: "Ayudantía UC",
              upvotes: 94
            }
          ]
        },
        {
          id: "n-gramaticas-boole",
          title: "Gramáticas e Boelios",
          importance: "Medio",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Álgebra de Boole", "Gramáticas"],
          first_principles: "Conexión formal entre las álgebras de Boole de eventos y la semántica formal de las reglas de producción.",
          exam_80_20: "Simplificación de sistemas de ecuaciones de lenguajes usando identidades booleanas y lema de Arden.",
          common_pitfall: "Olvidar la propiedad absorbente del lenguaje vacío ∅ frente a la cadena vacía ε.",
          tools: ["Regex & Boolean Solver"],
          action_challenge: "Resolver la ecuación de lenguaje X = aX + b aplicando el lema de Arden.",
          community_resources: [
            {
              id: "res-gboole-1",
              title: "Lema de Arden y Álgebra de Conjuntos aplicada a Lenguajes",
              type: "Artículo",
              url: "https://medium.com",
              author: "Ing. Carlos Mendoza",
              upvotes: 81
            }
          ]
        },
        {
          id: "n-maquinas-turing-modelos",
          title: "Máquinas de Turing",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Autómatas Finitos", "Modelos de Computación"],
          first_principles: "Modelo teórico con cinta infinita y cabezal bidireccional de lectura/escritura; define la clase de lenguajes recursivamente enumerables.",
          exam_80_20: "Diagrama de transiciones de una MT para reconocimiento de palíndromos o suma unaria.",
          common_pitfall: "No contemplar el símbolo en blanco (B o ␣) al alcanzar el fin de cadena.",
          tools: ["Turing Machine Simulator Online", "JFLAP Turing Simulator"],
          action_challenge: "Diseñar una Máquina de Turing de 1 cinta que acepte el lenguaje {0^n 1^n | n ≥ 1}.",
          community_resources: [
            {
              id: "res-turing-1",
              title: "Máquina de Turing desde cero: Concepto y Simulador",
              type: "Video",
              url: "https://youtube.com",
              author: "Club de Algoritmia UC",
              upvotes: 118,
              duration: "19 mins",
              isVerified: true
            }
          ]
        }
      ]
    },
    {
      id: "u-boole",
      unit_number: 7,
      title: "Álgebra de Boole",
      duration_hours: 16,
      exam_target: "Consolidado 2",
      nodes: [
        {
          id: "n-leyes-boole",
          title: "Leyes del Álgebra de Boole y Compuertas",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Tablas de Verdad", "Lógica Proposicional"],
          first_principles: "Estructura algebraica cerrada bajo (+, ·, ') que cumple distributividad mutua y leyes de De Morgan.",
          exam_80_20: "Simplificación algebraica de funciones lógicas de 4 variables.",
          common_pitfall: "Aplicar mal la ley de De Morgan al negar productos agrupados con sumas.",
          tools: ["Logisim", "Logic.ly"],
          action_challenge: "Simplificar la expresión F = A'B + AB + AB'C y verificar con tabla de verdad.",
          community_resources: [
            {
              id: "res-boole-1",
              title: "Leyes de De Morgan y Teoremas Booleanos en 1 Hoja",
              type: "CheatSheet",
              url: "https://github.com",
              author: "Diego R.",
              upvotes: 130,
              isVerified: true
            }
          ]
        },
        {
          id: "n-karnaugh",
          title: "Mapas de Karnaugh y Formas Canónicas",
          importance: "Crítico",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Leyes del Álgebra de Boole"],
          first_principles: "Representación geométrica en código Gray donde celdas adyacentes difieren en exactamente 1 bit, permitiendo agrupaciones de potencias de 2.",
          exam_80_20: "Obtención de la suma de productos mínima (SOP) y condiciones de no importa (don't care).",
          common_pitfall: "Hacer grupos que no sean potencia de 2 (ej. grupos de 3 o 6) o no aprovechar las adyacencias de las esquinas.",
          tools: ["Karnaugh Map Solver", "32x8 K-Map Generator"],
          action_challenge: "Minimizar una función de 4 variables con 5 minitérminos y 2 términos don't care.",
          community_resources: [
            {
              id: "res-karnaugh-1",
              title: "Mapas de Karnaugh de 4 variables sin errores de agrupación",
              type: "Video",
              url: "https://youtube.com",
              author: "Tutorías UC",
              upvotes: 155,
              duration: "16 mins",
              isVerified: true
            }
          ]
        }
      ]
    },
    {
      id: "u-gramaticas",
      unit_number: 8,
      title: "Gramáticas y Lenguajes",
      duration_hours: 20,
      exam_target: "Examen Final",
      nodes: [
        {
          id: "n-jerarquia-chomsky",
          title: "Jerarquía de Chomsky",
          importance: "Alto",
          isOptional: false,
          checkColor: "green",
          prerequisites: ["Gramáticas Generativas"],
          first_principles: "Clasificación formal en 4 niveles: Tipo 0 (Recursivamente Enumerable), Tipo 1 (Sensible al Contexto), Tipo 2 (Libre de Contexto), Tipo 3 (Regular).",
          exam_80_20: "Clasificar gramáticas dadas examinando restricciones en el lado izquierdo y derecho de las reglas.",
          common_pitfall: "Confundir Tipo 2 con Tipo 3 al permitir variables a la izquierda y derecha en la misma regla.",
          tools: ["JFLAP Grammar Classifier"],
          action_challenge: "Clasificar 4 gramáticas de examen según la jerarquía de Chomsky justificando la respuesta.",
          community_resources: [
            {
              id: "res-chom-1",
              title: "Tabla de Identificación de Gramáticas Chomsky",
              type: "Guía",
              url: "https://github.com",
              author: "Comunidad UC",
              upvotes: 98,
              isVerified: true
            }
          ]
        }
      ]
    },
    {
      id: "u-turing",
      unit_number: 9,
      title: "Máquinas de Turing",
      duration_hours: 20,
      exam_target: "Examen Final",
      nodes: [
        {
          id: "n-turing-computabilidad",
          title: "Máquinas de Turing",
          importance: "Crítico",
          isOptional: false,
          checkColor: "purple",
          prerequisites: ["Gramáticas y Lenguajes", "Modelos de Computación"],
          first_principles: "Tesis de Church-Turing: cualquier cálculo algorítmico realizable por una computadora puede ser ejecutado por una Máquina de Turing.",
          exam_80_20: "Pregunta conceptual y de diseño en Examen Final: decidibilidad vs indecidibilidad (Problema de la Parada).",
          common_pitfall: "Asumir que si una MT no se detiene, la cadena es automáticamente rechazada.",
          tools: ["Turing Simulator", "JFLAP"],
          action_challenge: "Explicar mediante reducción por qué el Halting Problem es indecidible.",
          community_resources: [
            {
              id: "res-tur-final",
              title: "Halting Problem y Decidibilidad Explicado Fácil",
              type: "Video",
              url: "https://youtube.com",
              author: "Profe Discreta",
              upvotes: 140,
              duration: "13 mins",
              isVerified: true
            }
          ]
        }
      ]
    }
  ],
  professors: [
    {
      id: "prof-mendoza",
      full_name: "Ing. Carlos Mendoza Ramos",
      title_degree: "Mg. en Ingeniería de Software y Sistemas",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      is_active: true,
      semesters_taught: ["2026-1", "2025-2", "2025-1", "2024-2"],
      campuses: ["Huancayo", "Lima"],
      modalities: ["Presencial", "Semipresencial"],
      badge: "Enfoque Práctico & Balotarios",
      teaching_style: {
        summary: "Clases dinámicas centradas en la resolución paso a paso de problemas típicos de examen en pizarra y JFLAP.",
        methodology: "Dedica los primeros 25 minutos a la teoría básica y los siguientes 60 minutos a resolver 3 a 4 problemas tipo examen de ciclos pasados. Suele dejar balotarios previos que tienen 70% de coincidencia con las evaluaciones formales.",
        exam_style: "Evaluaciones de desarrollo de 4 preguntas (5 puntos cada una). Evalúa procedimiento riguroso con tabla de iteraciones en grafos y autómatas.",
        evaluation_criteria: "Valora mucho el orden y la justificación paso a paso. No penaliza severamente errores de cálculo aritmético menor si el procedimiento lógico es correcto.",
        recommended_tools: ["JFLAP 7.1", "Plantilla de Tablas Dijkstra en Excel", "Python NetworkX"]
      },
      recommendations: {
        dos: [
          "Resolver sin falta los balotarios de repaso de la semana 3 y semana 7.",
          "Completar la tabla de iteraciones en Dijkstra con todas las columnas (Vértice, Distancia tentativa, Predecesor).",
          "Participar en las asesorías de los sábados para ganar décimas directas al promedio de consolidado."
        ],
        donts: [
          "No omitir el estado sumidero (muerto) en los diagramas de autómatas finitos AFD.",
          "No entregar tareas fuera de plazo en el Aula Virtual, ya que su rúbrica descuenta 2 puntos por día."
        ],
        best_practice_quote: "Si resuelves a conciencia las guías de ejercicios que entrega antes de cada hito, tienes asegurado más de 16 en el parcial."
      },
      stats: {
        rating: 4.8,
        review_count: 54,
        approval_rate_percentage: 86,
        clarity_score: 93,
        difficulty_level: "Media",
        strictness_score: 8.0,
        responsiveness_score: 9.4
      },
      reviews: [
        {
          id: "rev-m1",
          author_term: "Estudiante Semestre 2025-2",
          campus: "Sede Huancayo / Presencial",
          grade_obtained: "Nota final: 18",
          comment: "Excelente docente. Sus balotarios son idénticos a los problemas del parcial. En Dijkstra y Prim pide llenar la tabla exacta como la enseña en pizarra. Super recomendado.",
          date: "Noviembre 2025",
          upvotes: 42,
          tags: ["Balotarios Clave", "Explicación Clara", "Rúbrica Justa"]
        },
        {
          id: "rev-m2",
          author_term: "Estudiante Semestre 2025-1",
          campus: "Sede Lima / Semipresencial",
          grade_obtained: "Nota final: 15",
          comment: "Las asesorías de dudas salvan el ciclo. Siempre contesta correos y foros en menos de un día. Solo asegúrate de no faltar a la clase de gramáticas de Chomsky.",
          date: "Julio 2025",
          upvotes: 28,
          tags: ["Atención Rápida", "Usa JFLAP"]
        }
      ]
    },
    {
      id: "prof-villavicencio",
      full_name: "Dra. Elena Villavicencio Poma",
      title_degree: "Ph.D. en Ciencias Matemáticas y Computación Teórica",
      avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      is_active: true,
      semesters_taught: ["2026-1", "2025-1", "2024-1"],
      campuses: ["Arequipa", "Distancia"],
      modalities: ["Presencial", "A Distancia"],
      badge: "Rigor Teórico & Demostraciones",
      teaching_style: {
        summary: "Enfoque formal matemático con fuerte énfasis en inducción estructural, álgebra abstracta y teoría de la computación.",
        methodology: "Desarrolla demostraciones completas en clase. No le basta con que apliques la fórmula; exige que demuestres por inducción o por contradicción por qué el teorema funciona. Utiliza bibliografía internacional (Kenneth Rosen).",
        exam_style: "Preguntas de demostración conceptual (ej. probar formalmente que un lenguaje no es regular usando Lema de Bombeo, o invariantes de isomorfismo).",
        evaluation_criteria: "Rúbrica exigente: si das una respuesta intuitiva sin axiomas ni teoremas matemáticos citados, solo asigna puntaje parcial.",
        recommended_tools: ["Kenneth Rosen - Discrete Mathematics", "Overleaf LaTeX", "Wolfram Alpha"]
      },
      recommendations: {
        dos: [
          "Especificar siempre los cuantificadores (∀, ∃) y el dominio en cada paso de tus respuestas.",
          "Estudiar los ejercicios impares del libro de Rosen, de ahí extrae preguntas de reto para puntos extra.",
          "Asistir a sus horarios de consulta para revisar borradores de tus demostraciones."
        ],
        donts: [
          "No justificar afirmaciones con 'es evidente' o 'por simple inspección', descuenta puntaje.",
          "No faltar a las clases sincrónicas de relaciones de recurrencia no homogéneas."
        ],
        best_practice_quote: "Con la Dra. Elena aprendes la matemática de verdad. Es exigente, pero sales dominando la base para Teoría de la Computación y Complejidad."
      },
      stats: {
        rating: 4.6,
        review_count: 41,
        approval_rate_percentage: 78,
        clarity_score: 95,
        difficulty_level: "Alta",
        strictness_score: 9.1,
        responsiveness_score: 8.6
      },
      reviews: [
        {
          id: "rev-v1",
          author_term: "Estudiante Semestre 2025-1",
          campus: "Sede Arequipa / Presencial",
          grade_obtained: "Nota final: 16",
          comment: "Es la profesora más rigurosa que he tenido, pero aprendes muchísimo. Sus exámenes no son tramposos, pero si no justificas formalmente te baja puntos. Estudia con tiempo.",
          date: "Julio 2025",
          upvotes: 35,
          tags: ["Muy Rigurosa", "Se Aprende Mucho", "Examen Conceptual"]
        },
        {
          id: "rev-v2",
          author_term: "Estudiante Modalidad Distancia 2024-2",
          campus: "A Distancia",
          grade_obtained: "Nota final: 14",
          comment: "En el examen final vino una demostración de Máquinas de Turing idéntica a la que explicó en la sesión 14. Recomiendo repasar sus diapositivas completas.",
          date: "Diciembre 2024",
          upvotes: 19,
          tags: ["Clases Grabadas Clave", "Demostraciones"]
        }
      ]
    },
    {
      id: "prof-rojas",
      full_name: "Mg. Patricia Rojas Alarcón",
      title_degree: "Mg. en Tecnologías de Información y Ciencias de Datos",
      avatar_url: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400",
      is_active: true,
      semesters_taught: ["2026-1", "2025-2", "2025-1"],
      campuses: ["Lima", "Distancia"],
      modalities: ["A Distancia", "Semipresencial"],
      badge: "Clases Dinámicas & Muy Organizada",
      teaching_style: {
        summary: "Metodología ágil con micro-cápsulas de video, mapas conceptuales interactivos y rúbricas 100% transparentes.",
        methodology: "Estructura el curso de forma impecable. Publica guías semanales con hojas de ruta claras, cuestionarios de autoevaluación que no penalizan y sesiones de resolución de dudas en grupos pequeños.",
        exam_style: "Exámenes balanceados: 2 ejercicios prácticos paso a paso, 1 caso de aplicación real y 1 problema de simplificación lógica con Mapas de Karnaugh.",
        evaluation_criteria: "Aplica rúbricas transparentes compartidas previamente. Brinda retroalimentación detallada en cada evaluación devuelta.",
        recommended_tools: ["Simuladores de Circuitos Lógicos", "Visualgo.net", "Cuestionarios Interactivos"]
      },
      recommendations: {
        dos: [
          "Completar todos los cuestionarios semanales de autoevaluación; otorgan puntos de bonificación al Consolidado 1 y 2.",
          "Ver las cápsulas de 10 minutos grabadas antes de ingresar a la clase sincrónica.",
          "Utilizar colores claros para agrupar los unos en los Mapas de Karnaugh para facilitar la corrección."
        ],
        donts: [
          "No descuidar los foros de debate colaborativo que tienen puntaje formativo.",
          "No esperar al final de la semana para descargar las diapositivas con ejercicios tipo."
        ],
        best_practice_quote: "La profesora más ordenada de la carrera. Su material está tan bien estructurado que no necesitas buscar material externo para aprobar con más de 17."
      },
      stats: {
        rating: 4.9,
        review_count: 62,
        approval_rate_percentage: 92,
        clarity_score: 97,
        difficulty_level: "Media",
        strictness_score: 7.8,
        responsiveness_score: 9.7
      },
      reviews: [
        {
          id: "rev-r1",
          author_term: "Estudiante Modalidad Distancia 2025-2",
          campus: "A Distancia / Lima",
          grade_obtained: "Nota final: 19",
          comment: "La mejor docente de Matemática Discreta. Explica Árboles de Expansión Mínima y Minimización de Moore de una manera tan clara que nadie se pierde. Un 10/10.",
          date: "Diciembre 2025",
          upvotes: 56,
          tags: ["Excelente Docente", "Feedback Detallado", "Material Impecable"]
        }
      ]
    },
    {
      id: "prof-quispe",
      full_name: "Mg. David Quispe Condori",
      title_degree: "Mg. en Ciencias de la Computación e Inteligencia Artificial",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      is_active: false,
      semesters_taught: ["2025-1", "2024-2", "2024-1", "2023-2"],
      campuses: ["Cusco", "Huancayo"],
      modalities: ["Semipresencial", "A Distancia"],
      badge: "Docente Histórico • Enfoque en Algoritmia",
      teaching_style: {
        summary: "Conecta cada concepto discreto con algoritmos reales e implementaciones en código Python y C++.",
        methodology: "Enseñaba grafos mostrando la estructura de datos en memoria (listas de adyacencia vs matrices) y comparando el orden de complejidad temporal Big-O. Muy querido por estudiantes apasionados por la programación competitiva.",
        exam_style: "Ejercicios analíticos combinados con trazas de algoritmos (mostrar el estado de la cola y pila en BFS/DFS paso a paso).",
        evaluation_criteria: "Exigía rigor en la notación asintótica y el análisis de invariantes de bucle.",
        recommended_tools: ["Python NetworkX", "Graphviz", "LeetCode Graph Problems"]
      },
      recommendations: {
        dos: [
          "Revisar su repositorio público de GitHub donde dejó implementados los simuladores de autómatas.",
          "Analizar la complejidad temporal de cada algoritmo de grafos antes de responder.",
          "Resolver las trazas manuales paso a paso."
        ],
        donts: [
          "No confundir la complejidad de Prim O(E log V) con Dijkstra O((V+E) log V).",
          "No descuidar los aspectos teóricos de gramáticas formales."
        ],
        best_practice_quote: "Sus clases te preparan directamente para entrevistas técnicas de algoritmos y estructuras de datos."
      },
      stats: {
        rating: 4.7,
        review_count: 48,
        approval_rate_percentage: 88,
        clarity_score: 91,
        difficulty_level: "Media",
        strictness_score: 7.9,
        responsiveness_score: 9.1
      },
      reviews: [
        {
          id: "rev-q1",
          author_term: "Egresado Semestre 2024-2",
          campus: "Sede Cusco",
          grade_obtained: "Nota final: 17",
          comment: "Sus clases de Grafos y BFS/DFS me sirvieron luego para pasar las pruebas técnicas de prácticas pre-profesionales. Gran profesor.",
          date: "Enero 2025",
          upvotes: 38,
          tags: ["Algorítmico", "Código Real", "Muy Recomendado"]
        }
      ]
    }
  ]
};
