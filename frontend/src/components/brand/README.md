# Brand Components

Componentes visuais reutilizáveis da EloCiv.

- `BrandLogo` e `BrandIcon`: usam assets oficiais quando disponíveis. Em desenvolvimento, mostram placeholder técnico para assets pendentes.
- `BrandMark`: composição institucional usando `BrandLogo` e tagline.
- `Hexagon`, `HexagonCluster` e `ConnectionPattern`: elementos gráficos de rede, território e oportunidade. Não recriam o logotipo.
- `OpportunityStatus`: estados de densidade de oportunidades com texto, padrão visual e `aria-label`.
- `BrandSectionHeading`, `BrandBadge`, `BrandButton` e `BrandCard`: primitives de interface baseadas nos tokens.

Todos os componentes devem usar tokens CSS e evitar hexadecimais locais.
