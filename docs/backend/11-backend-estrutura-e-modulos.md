# Estrutura de Código e Módulos do Backend

## Árvore de Diretórios

O código do backend reside no diretório `backend/` na raiz do projeto:

```
backend/
├── package.json               # Dependências do projeto e scripts npm
├── tsconfig.json              # Configurações do compilador TypeScript
├── vitest.config.ts           # Configurações da suíte de testes Vitest
├── .env.example               # Modelo de variáveis de ambiente do backend
├── .gitignore                 # Regras de exclusão do git para o backend
├── prisma/
│   ├── schema.prisma          # Definção do modelo de dados PostgreSQL
│   └── seed.ts                # Script de povoamento inicial (IBGE + Institutos Piloto)
├── src/
│   ├── server.ts              # Ponto de entrada e bootstrap da aplicação Fastify
│   ├── config.ts              # Carregamento e validação de env vars via Zod
│   ├── types.d.ts             # Augmentations de tipos para Fastify e JWT
│   ├── lib/
│   │   ├── prisma.ts          # Singleton do PrismaClient com logs de dev
│   │   └── logger.ts          # Configuração do logger Pino com pino-pretty
│   ├── services/
│   │   ├── otp.ts             # Geração e validação de códigos OTP
│   │   ├── credential.ts      # Montagem de VC W3C e hash SHA-256 canônico
│   │   └── blockchain.ts      # Comunicação com a rede Stellar Soroban
│   └── modules/
│       ├── auth/              # Módulo de autenticação OTP e JWT
│       ├── young/             # Módulo de cadastro e gestão do jovem
│       ├── institution/       # Módulo de cadastro de ONGs e upload de documentos
│       ├── admin/             # Módulo administrativo de verificação e auditoria
│       ├── opportunity/       # Módulo de cadastro e busca de oportunidades
│       ├── participation/     # Módulo de registro de interesse e confirmação
│       ├── credential/        # Módulo de ancoragem e verificação de credenciais
│       ├── wallet/            # Módulo de carteira cívica (pública e privada)
│       ├── analytics/         # Módulo de indicadores agregados e territoriais
│       └── report/            # Módulo de denúncias e suspensão preventiva
├── test/
│   └── integration/           # Testes de integração (ex: hash canônico)
└── uploads/                   # Armazenamento local de documentos comprobatórios
```

## Descrição dos Módulos Funcionais

### 1. Módulo `auth` (`src/modules/auth/`)
Responsável pela autenticação baseada em OTP de 6 dígitos enviada ao e-mail informado.
- Gera códigos válidos por 10 minutos com limite de 3 tentativas incorretas.
- Retorna JWT assinado com as propriedades `sub` (ID do usuário) e `role` (`young`, `institution_user`, `admin`).

### 2. Módulo `young` (`src/modules/young/`)
Gerencia o cadastro mínimo de adolescentes (12 a 18 anos).
- Armazena apenas ano de nascimento (para cálculo de faixa etária), código IBGE do município, e-mail e registro de consentimento dos termos.
- Permite definição de apelido único para geração da carteira cívica pública.

### 3. Módulo `institution` (`src/modules/institution/`)
Trata do onboarding das instituições parceiras.
- Cadastra informações institucionais, responsável adulto, categorias, ODS e regiões de atuação.
- Suporta upload seguro de documentos comprobatórios (PDF, PNG, JPEG, WebP) gravados em armazenamento privado local.

### 4. Módulo `admin` (`src/modules/admin/`)
Painel de controle para administradores do sistema.
- Lista instituições na fila de análise (`PENDENTE`, `EM_ANALISE`).
- Registra decisões formais de aprovação, rejeição ou solicitação de complemento, gravando obrigatoriamente um registro no `AuditLog`.
- Permite a suspensão preventiva de instituições.

### 5. Módulo `opportunity` (`src/modules/opportunity/`)
Gerencia a oferta de atividades e oportunidades de desenvolvimento.
- Apenas instituições com status `APROVADA` possuem permissão para publicar oportunidades.
- Aplica validações condicionais de negócios (ex: endereço obrigatório para atividades presenciais; link para online; critério de conclusão para atividades contínuas).

### 6. Módulo `participation` (`src/modules/participation/`)
Controla o funil de engajamento do jovem.
- Permite ao jovem registrar interesse, gerando um código curto alfanumérico único para check-in.
- Disponibiliza para a instituição uma visão restrita contendo apenas e-mail e faixa etária dos interessados.
- Permite a confirmação da participação por usuário autorizado da instituição, bloqueando confirmações antecipadas em atividades pontuais antes da data de término.

### 7. Módulo `credential` (`src/modules/credential/`)
Módulo responsável pelo ciclo de vida da credencial.
- Monta a estrutura da Verifiable Credential (VC) sem dados sensíveis e gera o hash SHA-256 canônico.
- Executa a invocação da função `anchor_credential` no smart contract Soroban via `@stellar/stellar-sdk`.
- Permite consulta da prova de ancoragem on-chain e ajuste da visibilidade (pública/privada) pelo jovem.

### 8. Módulo `wallet` (`src/modules/wallet/`)
Exibe o histórico do currículo cívico do adolescente.
- Endpoint público (`/wallet/public/:slug`): exibe somente credenciais marcadas como `PUBLICA` e oculta todo e qualquer dado pessoal de contato.
- Endpoint privado (`/wallet/me`): exibe a linha do tempo completa do jovem autenticado.

### 9. Módulo `analytics` (`src/modules/analytics/`)
Apresenta indicadores territoriais agregados para consulta pública e relatórios.
- Agrupa estatísticas por código IBGE do município, cobrindo contagem de oportunidades, funil de participação e cobertura/ausência de ODS.

### 10. Módulo `report` (`src/modules/report/`)
Canal para denúncias de inconsistências ou comportamentos inadequados em oportunidades ou instituições.
- Denúncias de gravidade `ALTA` ou `CRITICA` disparam automaticamente a suspensão preventiva do alvo para apuração.
