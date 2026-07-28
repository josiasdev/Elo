import { NavLink } from 'react-router-dom'

import { navigationRoutes } from '@/app/router/routes'

export function AppNavigation() {
  return (
    <nav aria-label="Navegação principal" className="app-navigation">
      {navigationRoutes.map((route) => {
        const Icon = route.icon

        return (
          <NavLink
            activeClassName="is-active"
            className="app-navigation__link"
            key={route.path}
            to={route.path}
          >
            <Icon aria-hidden="true" size={18} strokeWidth={2} />
            <span>{route.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
