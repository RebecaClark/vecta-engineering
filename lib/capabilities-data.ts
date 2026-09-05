export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  specCode: string;
  metric: string;
  deliverables: string[];
}

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: "structural-engineering",
    number: "01",
    title: "Engenharia Estrutural",
    description:
      "Modelagem avançada por elementos finitos não-lineares (FEM), balanços hiper-vãos, sistemas de dissipação cinética de carga e isolamento sísmico de base.",
    specCode: "FEA // SÍSMICO P-DELTA",
    metric: "TOLERÂNCIA: L/800",
    deliverables: [
      "Análise dinâmica temporal não-linear (Time-History)",
      "Estabilização de momentos secundários P-Delta",
      "Arranjos de isolamento de base e amortecedores viscosos",
      "Integração com ensaios aerodinâmicos em túnel de vento"
    ]
  },
  {
    id: "project-management",
    number: "02",
    title: "Gestão de Projetos & 5D",
    description:
      "Integração BIM Nível 3, cronogramas determinísticos 4D/5D, telemetria contínua de custos e mitigação de riscos em compras internacionais.",
    specCode: "BIM NÍVEL 3 // 5D",
    metric: "CONFORMIDADE ISO 19650",
    deliverables: [
      "Detecção de interferências por nuvem de pontos milimétrica",
      "Verificação metalúrgica da cadeia de suprimentos",
      "Telemetria de avanço físico-financeiro (Valor Agregado)",
      "Governança técnica para entidades governamentais e corporativas"
    ]
  },
  {
    id: "construction",
    number: "03",
    title: "Construção & Montagem Estrutural",
    description:
      "Concretos de alta resistência autoadensáveis, ascensão contínua de fôrmas deslizantes para núcleos de concreto, montagem de aço em tandem e pós-tensionamento.",
    specCode: "C90/105 ALTO DESEMPENHO",
    metric: "SUBIDA DO NÚCLEO: 3,5M/DIA",
    deliverables: [
      "Torres hidráulicas com fôrmas autotrepantes",
      "Concretagem massiva contínua com controle criogênico de temperatura",
      "Içamento de estruturas de aço guiado por laser com guindastes múltiplos",
      "Protensão e tensionamento de cordoalhas não aderentes"
    ]
  },
  {
    id: "infrastructure",
    number: "04",
    title: "Infraestrutura & Obras Marítimas",
    description:
      "Túneis subterrâneos rodoviários e ferroviários, tubulões marítimos profundos, viadutos estaiados e ancoragens geológicas em rocha matriz.",
    specCode: "SUBTERRÂNEO // MARÍTIMO",
    metric: "HIDROSTÁTICA: 12 BAR",
    deliverables: [
      "Paredes-diafragma moldadas no solo com lama bentonítica",
      "Cravação pneumática de tubulões marítimos em águas profundas",
      "Viadutos em concreto protendido com aduelas pré-moldadas",
      "Blindagem catódica anticorrosiva para alta salinidade"
    ]
  },
  {
    id: "technical-consulting",
    number: "05",
    title: "Consultoria Técnica & Perícia",
    description:
      "Interação solo-estrutura geotécnica, ensaios aerodinâmicos em túnel de vento de camada limite, patologia estrutural e reforço de patrimônio histórico.",
    specCode: "TÚNEL DE CAMADA LIMITE",
    metric: "DISSIPAÇÃO DE VÓRTICES",
    deliverables: [
      "Amortecimento de vibrações por flutter aeroelástico",
      "Acoplamento mecânico de rochas geológicas profundas",
      "Dossiês de retrofitting para vulnerabilidade sísmica",
      "Auditoria independente de cálculo e revisão por pares"
    ]
  },
  {
    id: "digital-engineering",
    number: "06",
    title: "Engenharia Digital & Gêmeos Digitais",
    description:
      "Otimização topológica paramétrica generativa, gêmeos digitais conectados a sensores IoT de deformação e escaneamento LiDAR com precisão submimétrica.",
    specCode: "OTIMIZAÇÃO TOPOLÓGICA",
    metric: "TOLERÂNCIA LIDAR: ±0,4MM",
    deliverables: [
      "Minimização algorítmica de massa de materiais",
      "Telemetria de deformação contínua por fibra óptica",
      "Malhas de fotogrametria 'as-built' geradas por drones",
      "Alertas autônomos de fadiga durante o ciclo de vida"
    ]
  }
];
