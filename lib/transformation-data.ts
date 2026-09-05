export interface TransformationStage {
  id: number;
  label: string;
  tabTitle: string;
  tabSubtitle: string;
  step: string;
  title: string;
  description: string;
  image: string;
  coordinates: string;
  elevation: string;
  massRemovedOrPoured: string;
  metrics: {
    label: string;
    value: string;
  }[];
  feaEquilibrium: string;
}

export const TRANSFORMATION_DATA: TransformationStage[] = [
  {
    id: 0,
    label: "FASE 01: ESCAVAÇÃO DO CANTEIRO",
    tabTitle: "01. TERRENO",
    tabSubtitle: "Escavação subterrânea",
    step: "ETAPA 1 DE 4",
    title: "Terraplenagem e Tubulões Subterrâneos",
    description:
      "Perfuração de 48 tubulões engastados em rocha dura a uma profundidade de 38 metros abaixo do lençol freático, estabilizados com contrapressão hidrostática de lama bentonítica.",
    image: "/images/trans_stage_1.jpg",
    coordinates: "41.8864° N, 87.6375° W",
    elevation: "SUBTERRÂNEO: -14,20 M",
    massRemovedOrPoured: "TERRA REMOVIDA: 84.000 MT",
    metrics: [
      { label: "Profundidade dos Tubulões", value: "38,0 M" },
      { label: "Densidade da Lama", value: "1,18 G/CM³" },
      { label: "Critério Sísmico", value: "Deriva Máx < 0,002 rad" }
    ],
    feaEquilibrium: "Equilíbrio Hidrostático Piezométrico"
  },
  {
    id: 1,
    label: "FASE 02: BLOCO DE FUNDAÇÃO",
    tabTitle: "02. FUNDAÇÃO",
    tabSubtitle: "Física do radier maciço",
    step: "ETAPA 2 DE 4",
    title: "Radier Monolítico Subterrâneo & Física de Massa",
    description:
      "Concretagem contínua de 5.400 metros cúbicos de concreto autoadensável ao longo de 36 horas. Serpentinas de resfriamento com nitrogênio líquido previnem fissuras por estresse térmico.",
    image: "/images/trans_stage_2.jpg",
    coordinates: "41.8864° N, 87.6375° W",
    elevation: "NÍVEL DO RADIER: -8,50 M",
    massRemovedOrPoured: "CONCRETO: 12.800 MT",
    metrics: [
      { label: "Volume de Concretagem", value: "5.400 M³" },
      { label: "Gradiente Térmico (ΔT)", value: "< 18°C Criogênico" },
      { label: "Resistência à Compressão", value: "90 MPa aos 28 dias" }
    ],
    feaEquilibrium: "Uniformidade de Contato Solo-Rocha"
  },
  {
    id: 2,
    label: "FASE 03: NÚCLEO ESTRUTURAL",
    tabTitle: "03. ESTRUTURA",
    tabSubtitle: "Núcleo deslizante e gruas",
    step: "ETAPA 3 DE 4",
    title: "Núcleo Deslizante de Cisalhamento & Gruas de Obra",
    description:
      "Fôrmas autotrepantes hidráulicas elevam o núcleo duplo de concreto estrutural a 3,5 metros verticais por dia, acompanhadas por gruas telescópicas duplas.",
    image: "/images/trans_stage_3.jpg",
    coordinates: "41.8864° N, 87.6375° W",
    elevation: "NÍVEL DO NÚCLEO: +160,00 M",
    massRemovedOrPoured: "AÇO ESTRUTURAL: 18.500 MT",
    metrics: [
      { label: "Velocidade de Subida", value: "3,5 M / Dia" },
      { label: "Gruas de Ascensão", value: "2x Liebherr 50 Ton" },
      { label: "Eixo de Prumo a Laser", value: "Tolerância ±0,5 MM" }
    ],
    feaEquilibrium: "Momento Secundário P-Delta Contido"
  },
  {
    id: 3,
    label: "FASE 04: COMISSIONAMENTO",
    tabTitle: "04. CONCLUSÃO",
    tabSubtitle: "Torre iluminada",
    step: "ETAPA 4 DE 4",
    title: "Conclusão e Entrega do Marco Arquitetônico",
    description:
      "Torre de uso misto concluída com 64 andares, envelope aerodinâmico pressurizado, outriggers mistos e amortecedor de massa sintonizada ativo no pináculo.",
    image: "/images/trans_stage_4.jpg",
    coordinates: "41.8864° N, 87.6375° W",
    elevation: "ALTURA MÁXIMA: +284,40 M",
    massRemovedOrPoured: "PESO TOTAL: 142.800 MT",
    metrics: [
      { label: "Altura Total", value: "284,4 M" },
      { label: "Total de Andares", value: "64 Pavimentos" },
      { label: "Deriva Lateral", value: "H/520 Rajada de Pico" }
    ],
    feaEquilibrium: "Amortecedor de Massa Ativo: 0,18 Hz"
  }
];
