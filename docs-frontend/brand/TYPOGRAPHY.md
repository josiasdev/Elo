# Typography

## Fontes do guia

Títulos:

- Fonte principal: Sifonn
- Alternativa indicada: League Spartan
- Uso: títulos, números, chamadas e navegação

Textos:

- Fonte principal: Nunito Sans
- Pesos: Regular e Negrito
- Alternativa indicada: DM Sans
- Uso: descrições, formulários, cartões, relatórios e textos longos

## Estratégia web

Não há arquivo licenciado da fonte Sifonn no repositório. Por isso:

- `Sifonn` permanece no início da pilha para uso quando o arquivo oficial for fornecido e configurado legalmente.
- `League Spartan` é o fallback de títulos.
- `Nunito Sans` é a fonte preferencial de texto.
- `DM Sans` é fallback alternativo.
- Todas as pilhas terminam com `sans-serif`.

Nenhum arquivo de fonte de origem desconhecida foi adicionado.

## Hierarquia original

- Título: 32-48 pt
- Subtítulo: 18-24 pt
- Corpo: 10-12 pt
- Legenda: mínimo de 8 pt

## Mapeamento web

O CSS usa `rem` e `clamp()` para preservar hierarquia sem reduzir legibilidade:

| Token        | Uso                 | Valor web                      |
| ------------ | ------------------- | ------------------------------ |
| `display`    | chamadas principais | `clamp(2.5rem, 8vw, 4.5rem)`   |
| `heading-1`  | título de página    | `clamp(2rem, 5vw, 3rem)`       |
| `heading-2`  | seção               | `clamp(1.5rem, 3vw, 2rem)`     |
| `heading-3`  | card ou bloco       | `1.25rem`                      |
| `subtitle`   | subtítulo           | `clamp(1.125rem, 2vw, 1.5rem)` |
| `body-large` | apoio destacado     | `1.125rem`                     |
| `body`       | texto padrão        | `1rem`                         |
| `body-small` | metadados           | `0.875rem`                     |
| `caption`    | legenda             | `0.75rem`                      |
| `button`     | controles           | `0.95rem`                      |
| `navigation` | navegação           | `0.95rem`                      |
| `label`      | rótulos             | `0.78rem`                      |

## Line-height e letter-spacing

- Títulos usam line-height entre `1.05` e `1.2`.
- Textos longos usam line-height `1.6`.
- Letter spacing padrão é `0`.
- Rótulos curtos podem usar letter spacing positivo leve para legibilidade em caixa alta.
