export const homeContent = {
  header: {
    links: [
      { label: 'Início', href: '#inicio' },
      { label: 'Problema', href: '#problema' },
      { label: 'Solução', href: '#solucao' },
      { label: 'Diferenciais', href: '#diferenciais' },
      { label: 'Blockchain', href: '#blockchain' },
      { label: 'Impacto', href: '#impacto' },
      { label: 'Parceiros', href: '#parceiros' },
    ],
    cta: {
      label: 'Conhecer a solução',
      href: '/oportunidades',
    },
  },
  hero: {
    badge: 'O elo da cidadania jovem',
    title: 'O território já tem oportunidades. O EloCiv ajuda você a encontrá-las.',
    description:
      'Descubra cursos, oficinas, voluntariado e ações comunitárias no seu território. Registre sua participação e construa uma trajetória cívica segura, portátil e verificável.',
    primaryCta: {
      label: 'Descobrir como funciona',
      href: '#solucao',
    },
    secondaryCta: {
      label: 'Conhecer o EloCiv',
      href: '#problema',
    },
    stats: [
      { highlight: '12-18 anos', label: 'Público prioritário' },
      { highlight: '3 frentes', label: 'Visibilizar, oportunizar e registrar' },
      { highlight: '0 dados pessoais', label: 'On-chain' },
    ],
  },
  problem: {
    id: 'problema',
    label: 'O problema',
    title: 'Participações que não se perdem. Territórios que deixam de ser invisíveis.',
    paragraphs: [
      'Todos os dias, adolescentes participam de oficinas, cursos, mentorias, projetos culturais, coletivos e ações voluntárias. Nessas experiências, desenvolvem habilidades, criam vínculos e transformam suas comunidades.',
      'Mas, quando um projeto termina, uma organização encerra suas atividades ou o jovem muda de território, grande parte dessa trajetória pode se perder. Ao mesmo tempo, localidades com poucas oportunidades continuam invisíveis porque essa ausência raramente se transforma em dado.',
      'O EloCiv conecta essas duas necessidades: preserva o reconhecimento das experiências juvenis e torna visíveis os territórios que precisam de novas oportunidades.',
    ],
    cards: [
      {
        title: 'Trajetórias fragmentadas',
        description:
          'Certificados e registros ficam espalhados entre organizações e podem desaparecer quando um projeto termina.',
      },
      {
        title: 'Oportunidades difíceis de encontrar',
        description:
          'Cursos, oficinas, mentorias e ações comunitárias estão distribuídos em diferentes canais e nem sempre chegam aos jovens.',
      },
      {
        title: 'Territórios sem evidência',
        description:
          'A falta de oportunidades raramente se transforma em informação comparável para orientar projetos, políticas e investimentos.',
      },
    ],
    values: ['Protagonismo juvenil', 'Transparência', 'Pertencimento', 'Inclusão'],
  },
  solution: {
    id: 'solucao',
    label: 'A solução',
    title: 'Um elo entre jovens, oportunidades e territórios.',
    description:
      'O EloCiv cria uma jornada simples para o jovem e uma infraestrutura confiável para organizações que desejam divulgar oportunidades, reconhecer participações e transformar lacunas territoriais em evidências.',
    steps: [
      {
        number: '01',
        title: 'Encontre',
        description:
          'Descubra oportunidades presenciais e online por localização, faixa etária, tema e modalidade.',
        icon: 'MapPinned',
        collectiveResult: false,
      },
      {
        number: '02',
        title: 'Demonstre interesse',
        description:
          'Escolha uma oportunidade e siga para o canal oficial da instituição responsável. O EloCiv não substitui o processo da organização.',
        icon: 'MousePointerClick',
        collectiveResult: false,
      },
      {
        number: '03',
        title: 'Participe e receba reconhecimento',
        description:
          'Depois da participação, uma instituição verificada confirma a experiência e emite uma credencial.',
        icon: 'BadgeCheck',
        collectiveResult: false,
      },
      {
        number: '04',
        title: 'Transforme em evidência',
        description:
          'O jovem constrói sua trajetória cívica, enquanto dados agregados revelam onde novas oportunidades ainda são necessárias.',
        icon: 'ChartNoAxesCombined',
        collectiveResult: true,
      },
    ],
  },
  differentials: {
    id: 'diferenciais',
    label: 'Diferenciais',
    title: 'Mais do que um catálogo de oportunidades.',
    description:
      'O EloCiv conecta descoberta, participação, reconhecimento e inteligência territorial em uma única jornada, sem transformar adolescentes em produtos de dados.',
    items: [
      {
        title: 'Carteira cívica portátil',
        description:
          'O reconhecimento acompanha o jovem e não fica preso à plataforma ou à instituição que realizou a atividade.',
      },
      {
        title: 'Instituições verificadas',
        description:
          'Somente organizações autorizadas podem publicar oportunidades e emitir credenciais.',
      },
      {
        title: 'Privacidade desde a concepção',
        description:
          'Dados pessoais e informações sensíveis permanecem fora da blockchain e são tratados com minimização e controle de acesso.',
      },
      {
        title: 'Padrões abertos',
        description:
          'Credenciais verificáveis e identificadores descentralizados reduzem dependência de um fornecedor ou banco de dados único.',
      },
      {
        title: 'Inteligência territorial',
        description:
          'Dados agregados ajudam organizações e financiadores a visualizar onde há oportunidades e onde novas ações são necessárias.',
      },
    ],
  },
  blockchain: {
    id: 'blockchain',
    badge: 'Arquitetura essencial do piloto',
    title:
      'Blockchain não é um carimbo. É a camada de confiança entre instituições independentes.',
    paragraphs: [
      'Sem uma infraestrutura compartilhada, cada organização manteria seus próprios registros e o jovem dependeria da continuidade de cada banco de dados. A arquitetura do EloCiv distribui a confiança entre o jovem, as organizações emissoras e uma rede verificável.',
      'O EloCiv está estruturando o piloto para que cada jovem possua um identificador descentralizado, com custódia assistida quando necessário, e para que organizações verificadas emitam credenciais assinadas com suas próprias chaves. Assim, nenhuma instituição - nem mesmo o EloCiv - concentra sozinha a autoridade sobre toda a trajetória.',
    ],
    pillars: [
      {
        title: 'Uma identidade controlada pelo jovem',
        description:
          'Cada jovem recebe um identificador descentralizado, ou DID, ao qual suas credenciais podem ser vinculadas. Para adolescentes, a custódia pode ser assistida e evoluir para controle pleno.',
      },
      {
        title: 'Múltiplas âncoras de confiança',
        description:
          'Cada organização verificada emite e assina suas próprias credenciais. O EloCiv coordena o ecossistema, mas não decide sozinho o que conta como participação válida.',
      },
      {
        title: 'Reconhecimento que pertence ao jovem',
        description:
          'A credencial é vinculada à identidade do jovem e segue uma lógica de não transferibilidade. Ela não pode ser vendida, cedida ou atribuída a outra pessoa.',
      },
      {
        title: 'Prova pública, dados privados',
        description:
          'Nomes, contatos, idade, endereço, documentos e detalhes da atividade não são publicados on-chain. A rede registra somente informações criptográficas mínimas necessárias para verificar integridade, origem e estado da credencial.',
      },
    ],
    callout:
      'Se uma organização encerrar suas atividades, a credencial poderá continuar verificável porque não depende exclusivamente do banco de dados daquela instituição.',
    flow: [
      'Jovem e seu DID',
      'Organizações verificadas emitem credenciais independentes',
      'Carteira cívica controlada pelo jovem',
      'Terceiros verificam origem e integridade',
    ],
    comparison: {
      title: 'O que muda quando a confiança é descentralizada?',
      centralized: {
        title: 'Plataforma centralizada',
        items: [
          'uma única organização controla o registro',
          'a trajetória depende do banco de dados da plataforma',
          'instituições precisam confiar no mesmo administrador',
          'portabilidade limitada quando um sistema deixa de existir',
        ],
      },
      elociv: {
        title: 'Arquitetura EloCiv',
        items: [
          'instituições assinam credenciais de forma independente',
          'o jovem controla a apresentação da própria trajetória',
          'verificadores consultam provas criptográficas compartilhadas',
          'nenhuma organização concentra sozinha toda a confiança',
        ],
      },
    },
    roadmapLabel: 'Roadmap técnico - não faz parte da entrega imediata do protótipo',
    roadmap: [
      {
        title: 'Divulgação seletiva',
        description:
          'Provas de conhecimento zero permitirão comprovar aspectos da trajetória sem revelar atividades, instituições ou dados pessoais.',
      },
      {
        title: 'Indicadores multiassinados',
        description:
          'Organizações poderão coassinar informações territoriais, reduzindo a capacidade de qualquer ator alterar silenciosamente evidências usadas para advocacy.',
      },
      {
        title: 'Transição de custódia aos 18 anos',
        description:
          'O controle assistido das chaves poderá ser transferido formalmente para o jovem ao atingir a maioridade.',
      },
      {
        title: 'Elegibilidade auditável',
        description:
          'Contratos inteligentes poderão verificar critérios públicos para bolsas, mentorias e reconhecimentos, sem movimentar ativos financeiros para menores.',
      },
    ],
  },
  impact: {
    id: 'impacto',
    label: 'Impacto esperado',
    title: 'Reconhecer trajetórias também é ampliar oportunidades.',
    description:
      'O EloCiv transforma participação juvenil em reconhecimento individual e desigualdade territorial em evidência coletiva.',
    blocks: [
      {
        title: 'Para jovens',
        description:
          'Mais acesso a oportunidades e um histórico contínuo de participação, aprendizagem e contribuição comunitária.',
      },
      {
        title: 'Para organizações',
        description:
          'Uma forma confiável de divulgar ações, reconhecer participações e demonstrar impacto.',
      },
      {
        title: 'Para territórios',
        description:
          'Mais visibilidade sobre onde existem oportunidades e onde ainda há lacunas.',
      },
      {
        title: 'Para financiadores e gestores',
        description:
          'Evidências agregadas para orientar novos programas, parcerias e investimentos sociais.',
      },
    ],
  },
  partners: {
    id: 'parceiros',
    label: 'Parceiros confirmados',
    title: 'Nenhum território se transforma sozinho.',
    description:
      'O EloCiv cresce por meio da colaboração entre organizações comprometidas com juventude, educação, participação cidadã, inovação e desenvolvimento territorial.',
    items: [
      {
        name: 'Shanti Brasil',
        url: 'https://shantibrasil.org.br',
        logo: '/brand/patterns/shanti-logo.svg',
      },
      {
        name: 'TETO Brasil',
        url: 'https://teto.org.br',
        logo: '/brand/patterns/teto-logo.svg',
      },
      {
        name: 'IIRes da Amazônia',
        url: 'https://iiresamazonia.org.br',
        logo: '/brand/patterns/iires-logo.png',
      },
      {
        name: 'Instituto Filadélfia',
        url: 'https://www.institutofiladelfia.org.br',
        logo: '/brand/patterns/filadelfia-logo.png',
      },
      {
        name: 'Interact Brasil',
        url: 'https://interactbrasil.org.br',
        logo: '/brand/patterns/interact-logo.png',
      },
      {
        name: 'Instituto Povo do Mar (IPOM)',
        url: 'https://institutopovodomar.org.br',
        logo: '/brand/patterns/ipom-logo.svg',
      },
    ],
    message:
      'Essas conexões apoiam a construção, articulação e validação do ecossistema inicial do EloCiv.',
  },
  team: {
    title: 'Quem constrói o Elo',
    description:
      'Uma equipe jovem conectada por tecnologia, participação e impacto social.',
    members: [
      {
        name: 'Stephani Domenighi',
        role: 'Liderança e coordenação',
        initials: 'SD',
        linkedinUrl:
          'https://www.linkedin.com/in/stephani-domenighi-565309258?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      },
      {
        name: 'Francisco Josias Batista',
        role: 'Desenvolvimento e arquitetura',
        initials: 'FB',
        linkedinUrl: 'https://www.linkedin.com/in/josias-batista/',
      },
      {
        name: 'Timóteo Bentes',
        role: 'Desenvolvimento e interface',
        initials: 'TB',
        linkedinUrl: 'https://www.linkedin.com/in/timoteo-bentes/',
      },
      {
        name: 'Michelle Xie',
        role: 'Marketing e Suporte',
        initials: 'MX',
        linkedinUrl: 'https://www.linkedin.com/in/michelle-ruixin-xie/',
      },
      {
        name: 'Ana Azevedo',
        role: 'Documentação e Conteúdo',
        initials: 'AA',
        linkedinUrl:
          'https://www.linkedin.com/in/anaeduardatsa?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      },
    ],
  },
  finalCta: {
    title: 'Vamos conectar mais jovens às oportunidades do seu território?',
    description:
      'O EloCiv transforma participação em reconhecimento, confiança entre instituições e ausência de oportunidades em evidência para ação.',
    primaryCta: {
      label: 'Voltar ao início',
      href: '#inicio',
    },
    secondaryCta: {
      label: 'Entender a blockchain',
      href: '#blockchain',
    },
  },
  footer: {
    brandDescription:
      'Uma civic tech para conectar adolescentes a oportunidades e construir trajetórias cívicas seguras, verificáveis, permanentes e portáteis.',
    links: [
      { label: 'Problema', href: '#problema' },
      { label: 'Solução', href: '#solucao' },
      { label: 'Diferenciais', href: '#diferenciais' },
      { label: 'Blockchain', href: '#blockchain' },
      { label: 'Impacto', href: '#impacto' },
      { label: 'Parceiros', href: '#parceiros' },
    ],
    social: {
      label: 'Instagram do EloCiv',
      href: 'https://www.instagram.com/elociv.br',
    },
    copyright: '© 2026 EloCiv. Todos os direitos reservados.',
  },
} as const
