# Logo Usage

## Variantes previstas

O guia define quatro versões:

1. Logo principal
2. Versão negativa
3. Ícone
4. Ícone negativo

## Contexto de uso

- Use a versão principal em fundos claros, especialmente marfim.
- Use a versão negativa em fundos escuros, especialmente azul-marinho.
- Use ícone somente quando o espaço não comportar a assinatura completa.
- Não substitua o logotipo por texto HTML comum.

## Assets esperados

- `public/brand/logos/elociv-logo-primary.svg`
- `public/brand/logos/elociv-logo-negative.svg`
- `public/brand/icons/elociv-icon-primary.svg`
- `public/brand/icons/elociv-icon-negative.svg`
- `public/brand/icons/elociv-favicon.svg`

## Área de proteção

Regra exata do guia:

- 35 px de respiro
- considerando uma aplicação com 286 px de altura e 543 px de largura

Na aplicação, a área de proteção deve ser proporcional ao tamanho renderizado. Não fixe 35 px para todas as dimensões.

## Regras obrigatórias

- Manter proporção original.
- Nunca esticar horizontalmente.
- Nunca esticar verticalmente.
- Nunca alterar as cores.
- Nunca remover elementos.
- Nunca utilizar somente o nome "EloCiv" separado do símbolo.
- Nunca reconstruir, vetorizar ou aproximar o logotipo a partir do PDF.
- Usar `object-fit: contain` quando aplicável.
- Definir largura e altura preservando `aspect-ratio`.
- Fornecer `alt` adequado.

## Usos incorretos

- Esticar horizontalmente.
- Esticar verticalmente.
- Alterar coloração.
- Remover elementos.
- Usar somente o nome.
- Usar grafismos de hexágonos como substituto do símbolo oficial.

## Status atual

Os arquivos oficiais de logo ainda não foram encontrados. Os componentes estão preparados para os caminhos esperados e usam placeholder técnico apenas em desenvolvimento.
