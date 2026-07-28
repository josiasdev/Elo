import { useEffect, useState } from 'react'

import { LoadingState } from '@/components/feedback/LoadingState'
import { PageIntro } from '@/components/ui/PageIntro'
import { opportunityTypeLabels } from '@/constants/opportunityTypes'
import { youthProfileService } from '@/features/youth-profile/services/youthProfileService'
import type { YouthProfile } from '@/features/youth-profile/types/youthProfile'

export default function YouthProfilePage() {
  const [profile, setProfile] = useState<YouthProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void youthProfileService.getCurrentYouthProfile().then((item) => {
      if (isMounted) {
        setProfile(item)
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-section">
      <PageIntro
        title="Meu perfil"
        description="Área futura para preferências, participações e dados mínimos do jovem."
      />
      <div className="content-panel">
        {isLoading ? (
          <LoadingState label="Carregando perfil" />
        ) : (
          <>
            <h2>{profile?.nickname ?? 'Perfil demonstrativo'}</h2>
            <p>
              {profile
                ? `${profile.city} (${profile.state})`
                : 'Nenhum perfil demonstrativo disponível.'}
            </p>
            {profile ? (
              <p className="muted-text">
                Interesses:{' '}
                {profile.interests
                  .map((interest) => opportunityTypeLabels[interest])
                  .join(', ')}
              </p>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
