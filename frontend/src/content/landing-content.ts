import { BarChart3, HeartHandshake, MapPinned, ShieldCheck } from 'lucide-react'

import { brandContent } from '@/content/brand-content'

export const landingContent = {
  navigation: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Solução', href: '#solucao' },
    { label: 'Parceiros', href: '#parceiros' },
    { label: 'Time', href: '#time' },
  ],
  hero: {
    eyebrow: 'Plataforma comunitária',
    title: brandContent.tagline.title,
    subtitle: brandContent.tagline.subtitle,
    description:
      'A EloCiv conecta jovens, organizações e territórios para que oportunidades sejam encontradas, participações sejam reconhecidas e lacunas virem evidências para ação.',
    primaryAction: {
      label: 'Conhecer a solução',
      href: '#solucao',
    },
    secondaryAction: {
      label: 'Ver oportunidades',
      href: '/oportunidades',
    },
  },
  about: {
    eyebrow: 'Sobre',
    title: 'Visibilidade para o que já floresce no território',
    description: brandContent.essence,
    highlights: [
      {
        title: 'Trajetórias reconhecidas',
        description:
          'Experiências de participação deixam de se perder e passam a compor uma história cívica clara.',
      },
      {
        title: 'Oportunidades mais visíveis',
        description:
          'Cursos, oficinas, voluntariado e mentorias aparecem de forma organizada para quem pode participar.',
      },
      {
        title: 'Dados para equidade',
        description:
          'Lacunas territoriais se tornam evidências para orientar novos projetos e investimentos.',
      },
    ],
  },
  solution: {
    eyebrow: 'Solução',
    title: 'Uma jornada simples para jovens, comunidades e organizações',
    description:
      'A tecnologia apoia o reconhecimento, mas a experiência principal é comunitária: encontrar, participar, registrar e transformar dados em ação.',
    steps: [
      {
        title: 'Encontrar oportunidades',
        description:
          'Jovens descobrem atividades alinhadas aos seus interesses, idade, território e disponibilidade.',
        icon: MapPinned,
      },
      {
        title: 'Participar e construir trajetórias',
        description:
          'Cada participação confirmada passa a compor uma trajetória cívica permanente e portátil.',
        icon: HeartHandshake,
      },
      {
        title: 'Receber reconhecimento verificável',
        description:
          'Organizações emitem credenciais para registrar experiências de forma transparente e segura.',
        icon: ShieldCheck,
      },
      {
        title: 'Transformar dados em ação',
        description:
          'Indicadores agregados ajudam a revelar desigualdades e orientar novas iniciativas territoriais.',
        icon: BarChart3,
      },
    ],
  },
  partners: {
    eyebrow: 'Parceiros',
    title: 'Rede parceira em construção',
    description:
      'Os parceiros oficiais serão exibidos quando a equipe fornecer nomes e assets autorizados.',
    emptyState:
      'Nenhum logo oficial de parceiro foi encontrado no repositório nesta etapa.',
  },
  team: {
    eyebrow: 'Time',
    title: 'Equipe EloCiv',
    description:
      'A seção de time está preparada para receber integrantes reais, funções e fotos autorizadas.',
    emptyState:
      'Nenhum integrante com dados públicos autorizados foi encontrado no repositório.',
  },
  footer: {
    description:
      'Civic Tech para conectar jovens às oportunidades de participação e desenvolvimento nos seus territórios.',
    copyright: `© ${new Date().getFullYear()} EloCiv. Dados demonstrativos no frontend.`,
  },
} as const
