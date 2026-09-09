export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  ref: string;
  category: string;
  title: string;
  location: string;
  coordinates: string;
  year: string;
  status: "Completed" | "Commissioned" | "In Execution" | "Feasibility";
  statusBadge: string;
  description: string;
  fullNarrative: string;
  heroImage: string;
  gallery: string[];
  specs: ProjectSpec[];
  highlights: string[];
  feaTolerance: string;
  driftRatio: string;
  materialSpec: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "riverfront-citadel",
    ref: "REF. CH-01 // TORRE SUPERALTA",
    category: "Núcleo de Uso Misto Superalto",
    title: "The Riverfront Citadel & Mixed-Use Supertall",
    location: "Chicago, Estados Unidos",
    coordinates: "41°53'11\"N 87°38'15\"W",
    year: "2024",
    status: "Completed",
    statusBadge: "CONCLUÍDO · 2024",
    description:
      "Torre monolítica de uso misto com 64 pavimentos, projetada para resistir ao desprendimento de vórtices de vento sobre o solo aluvial ribeirinho. Utiliza núcleo central de paredes de cisalhamento pós-tensionadas com treliças perimetrais de alta resistência.",
    fullNarrative:
      "Apoiada diretamente sobre os sedimentos aluviais do Rio Chicago, a Riverfront Citadel resolve os momentos extremos de tombamento gerados pelas fortes rajadas térmicas do lago e pelo desprendimento de vórtices de alta frequência. A solução estrutural combina um núcleo duplo deslizante de concreto de alto desempenho C90/105 com treliças perimetrais de múltiplos níveis e um amortecedor de massa sintonizada de 650 toneladas instalado no topo, alcançando uma taxa exemplar de deslocamento lateral inferior a H/520.",
    heroImage: "/images/riverfront_citadel.jpg",
    gallery: [
      "/images/riverfront_citadel.jpg",
      "/images/trans_stage_3.jpg",
      "/images/trans_stage_2.jpg"
    ],
    specs: [
      { label: "Altura Total", value: "284,4 M (64 Andares)" },
      { label: "Volume de Concreto", value: "62.000 M³ C90/105" },
      { label: "Aço Estrutural", value: "18.500 Toneladas Métricas" },
      { label: "Tubulões de Fundação", value: "48 Engastados em Rocha (38m)" },
      { label: "Desempenho Sísmico", value: "Classe II-B (R=6.5)" },
      { label: "Deriva Lateral", value: "H/520 sob Vento Centenário" }
    ],
    highlights: [
      "Concretagem contínua de bloco de 5.400 m³ executada em 36 horas ininterruptas",
      "Treliças perimetrais de travamento nos níveis 28 e 54",
      "Ascensão hidráulica automatizada do núcleo a 3,5 metros verticais por dia",
      "Telemetria IoT de deformação em tempo real com validação topográfica LiDAR milimétrica"
    ],
    feaTolerance: "±1,2 MM",
    driftRatio: "H/520",
    materialSpec: "Concreto Autoadensável com Sílica Ativa C90/105"
  },
  {
    id: "escarpa-atlantica",
    ref: "REF. SM-04 // BALANÇO GEOTÉCNICO",
    category: "Centro de Monitoramento & Infraestrutura Tectônica",
    title: "Complexo Escarpa Atlântica",
    location: "Serra do Mar, São Paulo, Brasil",
    coordinates: "23°51'42\"S 46°28'15\"W",
    year: "2024",
    status: "Commissioned",
    statusBadge: "COMISSIONADO · 2024",
    description:
      "Projeção horizontal livre de 42 metros sobre o abismo da Serra do Mar, engastada no maciço granítico profundo por tirantes protendidos de ultra-alta resistência contra escorregamentos tropicais.",
    fullNarrative:
      "Erguido a 780 metros de altitude sobre a densa escarpa da Mata Atlântica paulista, o Complexo Escarpa Atlântica projeta-se 42 metros em balanço livre sobre o vale. A resposta mecânica ao elevado momento de tombamento integra tirantes de aço protendido perfurados a 55 metros no maciço rochoso granítico e concreto UHPFRC reforçado com microfibras metálicas, complementados por uma rede profunda de drenagem subsuperficial para suportar o regime pluviométrico severo da serra (superior a 3.200 mm/ano).",
    heroImage: "/images/escarpa_atlantica.jpg",
    gallery: [
      "/images/escarpa_atlantica.jpg"
    ],
    specs: [
      { label: "Vão Livre em Balanço", value: "42,0 M sem Apoios" },
      { label: "Profundidade de Ancoragem", value: "55 M no Maciço Granítico" },
      { label: "Força de Protensão", value: "28.000 kN por Tirante" },
      { label: "Deflexão Máxima na Ponta", value: "Inferior a 11,2 MM" },
      { label: "Drenagem Subsuperficial", value: "Sub-drenos Profundos (DHPs)" },
      { label: "Blindagem Externa", value: "Liga de Titânio-Zinco e UHPFRC" }
    ],
    highlights: [
      "Tirantes subterrâneos perfurados e ancorados em rocha granítica profunda da Serra do Mar",
      "Matriz de concreto UHPFRC autoadensável com resistência característica fck ≥ 110 MPa",
      "Monitoramento geológico e piezométrico contínuo integrado a gêmeo digital em tempo real",
      "Vida útil de projeto de 150 anos com blindagem contra intemperismo tropical úmido"
    ],
    feaTolerance: "±0,6 MM",
    driftRatio: "L/3750 Ponta",
    materialSpec: "Concreto Reforçado com Microfibras Metálicas de Ultra-Alto Desempenho (UHPFRC C110)"
  },
  {
    id: "meridian-viaduct",
    ref: "REF. RD-44 // VIADUTO MARÍTIMO",
    category: "Engenharia Marítima Pesada",
    title: "Meridian Deep-Water Viaduct",
    location: "Roterdã, Países Baixos",
    coordinates: "51°55'18\"N 4°28'52\"E",
    year: "2025",
    status: "In Execution",
    statusBadge: "EM EXECUÇÃO · 2025",
    description:
      "Corredor marítimo segmental em concreto protendido cruzando correntes de maré de alta salinidade com inibição catódica de corrosão, planejado para ciclo operacional de 200 anos.",
    fullNarrative:
      "Projetado para resistir a ressacas severas do Mar do Norte, névoa salina contínua e canais de navegação de navios porta-contêineres ultra-grandes, o Viaduto Meridian estende-se por 2,4 quilômetros no estuário de Maasvlakte, em Roterdã. A superestrutura em viga-caixão segmental incorpora circuitos de proteção catódica embutidos na armadura, impedindo a penetração de cloretos e garantindo integridade estrutural por dois séculos ininterruptos.",
    heroImage: "/images/meridian_viaduct.jpg",
    gallery: [
      "/images/meridian_viaduct.jpg",
      "/images/trans_stage_1.jpg"
    ],
    specs: [
      { label: "Comprimento do Corredor", value: "2.420 M" },
      { label: "Vão Navegável Principal", value: "185,0 M Livre" },
      { label: "Cota de Ressaca Marinha", value: "+8,20 M Acima da Maré Máxima" },
      { label: "Pressão Hidrostática", value: "12 Bar nos Tubulões Marítimos" },
      { label: "Circuito Catódico", value: "Óxido Metálico Misto Embutido" },
      { label: "Vida Útil de Projeto", value: "200 Anos Ininterruptos" }
    ],
    highlights: [
      "Montagem por balanços sucessivos com aduelas pré-moldadas protendidas",
      "Tubulões marítimos cravados 32 metros abaixo do leito marinho",
      "Defletores hidrodinâmicos para mitigação de vórtices nos pilares submersos",
      "Rede de sensores de telemetria conectada em tempo real ao gêmeo digital em Zurique"
    ],
    feaTolerance: "±1,5 MM",
    driftRatio: "L/1200 Vão",
    materialSpec: "Concreto Marítimo de Alto Forno CEM III/B de Baixa Permeabilidade"
  }
];
