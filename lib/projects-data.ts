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
    id: "cantilever-pavilion",
    ref: "REF. LU-09 // BALANÇO ESTRUTURAL",
    category: "Infraestrutura Cultural",
    title: "Cantilever Pavilion Z-9",
    location: "Lago Lucerna, Suíça",
    coordinates: "47°03'00\"N 8°18'20\"E",
    year: "2023",
    status: "Commissioned",
    statusBadge: "COMISSIONADO · 2023",
    description:
      "Projeção horizontal livre de 38 metros sobre as águas de lago alpino, contrabalançada por tirantes subterrâneos protendidos perfurados diretamente em rocha granítica profunda.",
    fullNarrative:
      "Desafiando a convenção gravitacional, o Pavilion Z-9 projeta-se 38 metros em balanço livre sobre águas alpinas. Em vez de apoios visíveis na margem, o momento de tombamento é resolvido por tendões de aço-carbono de alta resistência ancorados a 45 metros de profundidade no leito de granito, combinados a um amortecedor de massa líquida integrado para neutralizar a ressonância harmônica provocada pelo tráfego de pedestres.",
    heroImage: "/images/cantilever_pavilion.jpg",
    gallery: [
      "/images/cantilever_pavilion.jpg",
      "/images/zurich_studio.jpg"
    ],
    specs: [
      { label: "Vão Livre em Balanço", value: "38,0 M sem Apoios" },
      { label: "Profundidade de Ancoragem", value: "45 M no Granito" },
      { label: "Força de Protensão", value: "24.000 kN por Tirante" },
      { label: "Deflexão Máxima na Ponta", value: "Inferior a 14,5 MM" },
      { label: "Amortecimento Harmônico", value: "Amortecedor Líquido (0,8Hz)" },
      { label: "Blindagem Externa", value: "Liga de Titânio-Zinco" }
    ],
    highlights: [
      "Tirantes subterrâneos perfurados e ancorados em rocha granítica profunda",
      "Cancelamento passivo de ressonância líquida na cavidade frontal do balanço",
      "Validação cíclica térmica e sísmica completa segundo Eurocódigos 0-8",
      "Vida útil de projeto de 200 anos com zero exposição corrosiva"
    ],
    feaTolerance: "±0,8 MM",
    driftRatio: "L/2600 Ponta",
    materialSpec: "Concreto Reforçado com Fibras de Ultra-Alto Desempenho (UHPFRC)"
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
