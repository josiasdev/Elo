interface PageIntroProps {
  title: string
  description: string
}

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <header className="page-intro">
      <p className="eyebrow">Funcionalidade em preparação</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="muted-text">
        Esta tela será implementada nas próximas etapas do produto.
      </p>
    </header>
  )
}
