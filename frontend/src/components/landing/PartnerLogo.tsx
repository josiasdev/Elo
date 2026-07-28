import type { Partner } from '@/content/partners'

interface PartnerLogoProps {
  partner: Partner
}

export function PartnerLogo({ partner }: PartnerLogoProps) {
  const content = partner.logoSrc ? (
    <img alt={`Logo de ${partner.name}`} loading="lazy" src={partner.logoSrc} />
  ) : (
    <span>{partner.name}</span>
  )

  if (partner.websiteUrl) {
    return (
      <a
        className="partner-logo"
        href={partner.websiteUrl}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    )
  }

  return <div className="partner-logo">{content}</div>
}
