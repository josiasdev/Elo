# Graphic Elements

## Elementos principais

- Hexágonos
- Agrupamentos de hexágonos
- Linhas de conexão
- Trechos de linha pontilhada
- Círculos vazados nos pontos de conexão
- Combinações de amarelo, azul, rosa, ameixa e azul-marinho
- Estruturas que representam territórios, redes e oportunidades

## Hexágonos

Hexágonos representam territórios, células de rede e pontos de oportunidade. Devem ser implementados como SVG ou CSS limpo, sem rasterizar elementos do PDF.

## Conexões

Linhas e nós indicam relação entre jovens, oportunidades, comunidades e organizações. Quando decorativos, devem usar `aria-hidden="true"` e não bloquear eventos.

## Status de oportunidade

- Nenhuma oportunidade: hexágonos sem preenchimento e contorno azul-marinho.
- Oportunidades escassas: preenchimento rosa e contorno azul-marinho.
- Oportunidades disponíveis: preenchimento azul e contorno azul-marinho.

Os estados também devem conter texto, ícone ou padrão visual e `aria-label`.

## Regras de acessibilidade

- Não depender somente da cor.
- Preservar contraste com texto azul-marinho.
- Respeitar `prefers-reduced-motion` se houver animação.
- Não posicionar grafismos por cima de texto interativo.

## Restrição

Esses elementos não devem ser usados para recriar o logotipo.
