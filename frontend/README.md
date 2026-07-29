# Frontend EloCiv

Frontend React do EloCiv, inicializado com Vite, TypeScript, Tailwind CSS e dados mockados. Backend Node.js e integração blockchain serão desenvolvidos separadamente.

## Arquitetura

A pasta `src/` está organizada por responsabilidades:

- `app/`: providers, roteamento e composição da aplicação.
- `components/`: componentes compartilhados de layout, feedback, formulários e UI.
- `features/`: módulos por funcionalidade, com páginas, tipos, services e componentes locais.
- `services/`: API client e repositories substituíveis.
- `mocks/`: dados fictícios usados enquanto a API REST não existe.
- `config/`: leitura tipada de variáveis de ambiente.
- `styles/`: estilos globais.
- `test/`: setup do Vitest e React Testing Library.

## Mocks

Os componentes não importam arrays mockados diretamente. O fluxo atual é:

```text
página ou componente
-> service da feature
-> repository
-> implementação mockada
```

Os dados são fictícios e não incluem nomes completos, documentos, endereços ou contatos reais de adolescentes.

## Variáveis de ambiente

Crie um arquivo `.env` a partir de `.env.example` quando precisar alterar valores locais:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCKS=true
```

Variáveis `VITE_` ficam expostas no bundle do navegador. Não coloque segredos, chaves privadas ou tokens sensíveis nelas.

## Troca para repositories HTTP

Cada repository já possui interface e implementação mockada. Para integrar com o backend:

1. manter os componentes chamando apenas os services de `features/*/services`;
2. implementar endpoints reais no repository HTTP usando `apiRequest`;
3. definir `VITE_USE_MOCKS=false`;
4. validar contratos de resposta com tipos e, quando necessário, schemas Zod.

O frontend não deve assinar transações, armazenar chaves privadas ou falar diretamente com blockchain. Qualquer comunicação com Stellar/Soroban deverá passar pelo backend.

## Convenções

- Textos visíveis ao usuário em português do Brasil.
- Arquivos, componentes, funções, variáveis e tipos em inglês.
- TypeScript em modo estrito.
- Não usar `any`.
- Preferir componentes pequenos e services/repositories desacoplados.
- Usar `fetch` nativo via `apiClient.ts` antes de adicionar bibliotecas HTTP.

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
npm run format:check
```
