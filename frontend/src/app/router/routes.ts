import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  UserRound,
  WalletCards,
} from 'lucide-react'

import { appRoutes } from '@/constants/routes'

export interface NavigationRoute {
  path: string
  label: string
  icon: LucideIcon
}

export const navigationRoutes: NavigationRoute[] = [
  {
    path: appRoutes.opportunities,
    label: 'Oportunidades',
    icon: BriefcaseBusiness,
  },
  {
    path: appRoutes.civicWallet,
    label: 'Carteira',
    icon: WalletCards,
  },
  {
    path: appRoutes.youthProfile,
    label: 'Meu perfil',
    icon: UserRound,
  },
  {
    path: appRoutes.institutions,
    label: 'Instituições',
    icon: Building2,
  },
  {
    path: appRoutes.territorialAnalytics,
    label: 'Painel territorial',
    icon: BarChart3,
  },
  {
    path: appRoutes.admin,
    label: 'Admin',
    icon: ShieldCheck,
  },
]
