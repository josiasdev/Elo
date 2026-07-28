import { BrandSectionHeading } from '@/components/brand'

interface PageIntroProps {
  title: string
  description: string
}

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <BrandSectionHeading
      description={description}
      eyebrow="Funcionalidade em preparação"
      supportingText="Esta tela será implementada nas próximas etapas do produto."
      title={title}
    />
  )
}
