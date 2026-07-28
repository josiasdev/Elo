export const appRoutes = {
  home: '/',
  opportunities: '/oportunidades',
  opportunityDetails: '/oportunidades/:opportunityId',
  civicWallet: '/carteira',
  youthProfile: '/meu-perfil',
  institutions: '/instituicoes',
  territorialAnalytics: '/painel-territorial',
  admin: '/admin',
} as const

export type AppRouteKey = keyof typeof appRoutes
