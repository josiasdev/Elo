interface BrandSectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  supportingText?: string
  level?: 1 | 2 | 3
}

export function BrandSectionHeading({
  eyebrow,
  title,
  description,
  supportingText,
  level = 1,
}: BrandSectionHeadingProps) {
  const HeadingTag = `h${level}` as const

  return (
    <header className="brand-section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <HeadingTag className="brand-heading">{title}</HeadingTag>
      {description ? (
        <p className="brand-section-heading__description">{description}</p>
      ) : null}
      {supportingText ? (
        <p className="brand-section-heading__supporting">{supportingText}</p>
      ) : null}
    </header>
  )
}
