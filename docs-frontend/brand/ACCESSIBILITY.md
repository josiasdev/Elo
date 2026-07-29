# Accessibility

## Auditoria de contraste

Combinações aprovadas:

- Azul-marinho sobre marfim.
- Marfim sobre azul-marinho.
- Azul-marinho sobre azul claro.
- Azul-marinho sobre rosa com borda azul-marinho.
- Azul-marinho sobre amarelo com borda azul-marinho.

Combinações restritas:

- Ameixa sobre azul-marinho apenas em grafismos grandes, não em texto.
- Azul claro como fundo de texto longo somente com texto azul-marinho.
- Rosa e amarelo em componentes pequenos somente com peso de fonte adequado e borda.

Combinações proibidas:

- Texto marfim pequeno sobre azul claro, rosa ou amarelo.
- Texto amarelo, rosa ou azul claro sobre marfim.
- Status visual comunicado apenas por cor.

## Navegação e foco

- Todos os links e botões devem manter foco visível.
- O anel de foco usa azul-marinho com offset.
- Componentes decorativos não devem receber foco.

## Landmarks e headings

- O layout preserva `header`, `main`, `footer` e `nav`.
- Páginas devem ter um `h1` claro.
- Seções internas devem seguir hierarquia lógica.

## Imagens e SVG

- Logos devem ter `alt` descritivo.
- Grafismos decorativos usam `aria-hidden="true"`.
- SVGs informativos devem receber `role="img"` ou `aria-label`.

## Formulários

Quando formulários forem implementados:

- usar labels visíveis;
- não comunicar erro apenas por cor;
- associar mensagens a campos;
- preservar tamanho mínimo de alvo interativo.

## Reduced motion

Animações futuras devem respeitar `prefers-reduced-motion`.
