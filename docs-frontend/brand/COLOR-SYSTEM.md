# Color System

## Paleta oficial

| Token bruto     | Função no guia   | HEX       | RGB             | CMYK                |
| --------------- | ---------------- | --------- | --------------- | ------------------- |
| `supportYellow` | Cor de suporte   | `#F4DC67` | `244, 220, 103` | `0%, 10%, 58%, 4%`  |
| `supportPink`   | Cor de suporte   | `#EDA9C2` | `237, 169, 194` | `0%, 29%, 18%, 7%`  |
| `primaryBlue`   | Cor primária     | `#8DD8F0` | `141, 216, 240` | `41%, 10%, 0%, 6%`  |
| `contrastNavy`  | Cor de contraste | `#20283A` | `32, 40, 58`    | `45%, 31%, 0%, 77%` |
| `contrastPlum`  | Cor de contraste | `#69475F` | `105, 71, 95`   | `0%, 32%, 10%, 59%` |
| `baseIvory`     | Cor base         | `#FFFDF7` | `255, 253, 247` | `0%, 1%, 3%, 0%`    |

## Tokens brutos

Os tokens brutos representam exatamente o guia e não devem ser alterados:

- `brand.raw.colors.supportYellow`
- `brand.raw.colors.supportPink`
- `brand.raw.colors.primaryBlue`
- `brand.raw.colors.contrastNavy`
- `brand.raw.colors.contrastPlum`
- `brand.raw.colors.baseIvory`

## Tokens semânticos

Os tokens semânticos mapeiam decisões de interface:

- `brand.semantic.colors.background.canvas`
- `brand.semantic.colors.background.surface`
- `brand.semantic.colors.background.inverse`
- `brand.semantic.colors.text.primary`
- `brand.semantic.colors.text.inverse`
- `brand.semantic.colors.text.muted`
- `brand.semantic.colors.border.default`
- `brand.semantic.colors.action.primary`
- `brand.semantic.colors.action.secondary`
- `brand.semantic.colors.status.noOpportunity`
- `brand.semantic.colors.status.scarceOpportunity`
- `brand.semantic.colors.status.availableOpportunity`

## Combinações recomendadas

- Texto azul-marinho sobre marfim.
- Texto azul-marinho sobre azul claro em botões e destaques.
- Texto marfim sobre azul-marinho em áreas inversas.
- Rosa e amarelo como fundos de suporte com texto azul-marinho e borda azul-marinho.

## Combinações restritas

- Rosa, amarelo e azul claro como texto pequeno sobre marfim.
- Ameixa como texto pequeno sobre azul-marinho.
- Amarelo sobre azul claro sem borda ou contraste adicional.

## Combinações proibidas

- Texto branco/marfim pequeno sobre amarelo, rosa ou azul claro.
- Estados comunicados somente por cor.
- Criação de novas cores de marca sem registro em `brand.semantic.functional`.

## Estados funcionais

Estados de hover, focus, disabled, erro e sucesso usam composição, borda, opacidade e transparência sobre as cores oficiais. Quando uma cor funcional adicional for necessária, ela deve ficar documentada como token funcional, não como cor oficial da marca.
