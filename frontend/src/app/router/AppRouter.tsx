import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { appRoutes } from '@/constants/routes'
import { LoadingState } from '@/components/feedback/LoadingState'
import { AppLayout } from '@/components/layout/AppLayout'

const LandingPage = lazy(() => import('@/features/landing/pages/LandingPage'))
const OpportunitiesPage = lazy(
  () => import('@/features/opportunities/pages/OpportunitiesPage'),
)
const OpportunityDetailsPage = lazy(
  () => import('@/features/opportunities/pages/OpportunityDetailsPage'),
)
const CivicWalletPage = lazy(
  () => import('@/features/civic-wallet/pages/CivicWalletPage'),
)
const YouthProfilePage = lazy(
  () => import('@/features/youth-profile/pages/YouthProfilePage'),
)
const InstitutionsPage = lazy(
  () => import('@/features/institutions/pages/InstitutionsPage'),
)
const TerritorialAnalyticsPage = lazy(
  () => import('@/features/territorial-analytics/pages/TerritorialAnalyticsPage'),
)
const AdminPage = lazy(() => import('@/features/admin/pages/AdminPage'))
const NotFoundPage = lazy(() => import('@/components/feedback/NotFoundPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState label="Carregando página" />}>
        <Switch>
          <Route exact path={appRoutes.home}>
            <LandingPage />
          </Route>
          <Route>
            <AppLayout>
              <Switch>
                <Route exact path={appRoutes.opportunities}>
                  <OpportunitiesPage />
                </Route>
                <Route path={appRoutes.opportunityDetails}>
                  <OpportunityDetailsPage />
                </Route>
                <Route path={appRoutes.civicWallet}>
                  <CivicWalletPage />
                </Route>
                <Route path={appRoutes.youthProfile}>
                  <YouthProfilePage />
                </Route>
                <Route path={appRoutes.institutions}>
                  <InstitutionsPage />
                </Route>
                <Route path={appRoutes.territorialAnalytics}>
                  <TerritorialAnalyticsPage />
                </Route>
                <Route path={appRoutes.admin}>
                  <AdminPage />
                </Route>
                <Route>
                  <NotFoundPage />
                </Route>
              </Switch>
            </AppLayout>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
