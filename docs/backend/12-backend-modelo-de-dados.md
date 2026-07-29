# Modelo de Dados (Prisma & PostgreSQL)

O modelo de dados do EloCiv foi definido em `backend/prisma/schema.prisma` respeitando as regras de minimização de dados e LGPD/ECA.

---

## Diagrama Entidade-Relacionamento (Simplificado)

```
[Municipality] <──── [Young] ───────> [Participation] <──── [Opportunity] <──── [Institution]
       │                 │                    │                  │                   │
       │                 v                    v                  │                   v
       └──────────> [OtpCode]           [Credential]             └─────────> [InstitutionDocument]
                         │
                         v
                     [Report]
```

---

## Detalhamento dos Modelos

### `Municipality` (`municipalities`)
Catálogo de municípios do Brasil importado via API do IBGE.
- `id` (String): Código IBGE de 7 dígitos (Chave Primária).
- `nome` (String): Nome do município (ex: "Manaus", "Fortaleza").
- `uf` (String): Sigla do estado (ex: "AM", "CE").
- `regiao` (String): Região geográfica (ex: "Norte", "Nordeste").

---

### `Young` (`youngs`)
Cadastro mínimo de adolescentes de 12 a 18 anos.
- `id` (UUID): Identificador único do jovem.
- `email` (String Unique): E-mail de login e contato para OTP.
- `ano_nascimento` (Int): Ano de nascimento (utilizado para derivação dinâmica da faixa etária 12-14, 15-17 ou 18+).
- `municipio_id` (String): Referência ao município no IBGE.
- `interesses` (String[]): Array de categorias de interesse.
- `apelido` (String Unique Nullable): Apelido para a URL da carteira pública (`/wallet/public/:slug`).
- `opt_in_comunicacao` (Json Nullable): Preferências de comunicação.
- `consentimento_em` (DateTime): Registro exato do aceite dos termos.
- `consentimento_versao` (String): Versão dos termos aceitos (default "1.0").
- `status` (Enum `YoungStatus`): `PENDENTE_VERIFICACAO`, `ATIVO`, `INATIVO`, `SUSPENSO`.

---

### `OtpCode` (`otp_codes`)
Tabela temporária de códigos de autenticação.
- `id` (UUID): Identificador interno.
- `email` (String): E-mail associado ao código.
- `code` (String): Código de 6 dígitos numéricos.
- `expires_at` (DateTime): Timestamp de expiração (10 minutos).
- `attempts` (Int): Contador de erros de digitação (máximo 3).
- `used` (Boolean): Flag de utilização prévia.

---

### `Institution` (`institutions`)
Organizações parceiras responsáveis por oferecer oportunidades.
- `id` (UUID): Identificador da instituição.
- `nome` (String): Razão social ou nome fantasia.
- `cnpj` (String Unique Nullable): CNPJ com 14 dígitos sem formatação (opcional para coletivos informais).
- `categoria` (Enum `InstitutionCategory`): `ONG`, `COLETIVO_INFORMAL`, `ESCOLA`, `PODER_PUBLICO`, `INICIATIVA_EMPRESARIAL`.
- `descricao` (String): Apresentação institucional.
- `ods` (Int[]): Objetivos de Desenvolvimento Sustentável associados (números de 1 a 17).
- `responsavel_nome` / `responsavel_email` / `responsavel_cargo` (String): Dados do adulto responsável.
- `status_verificacao` (Enum `VerificationStatus`): `PENDENTE`, `EM_ANALISE`, `APROVADA`, `REJEITADA`, `SUSPENSA`.
- `nivel_plano` (Enum `PlanLevel`): `GRATUITO`, `PREMIUM`.
- `aprovada_por` (String Nullable): FK para o Admin responsável.
- `aprovada_em` (DateTime Nullable): Data de aprovação.
- `motivo_decisao` (String Nullable): Justificativa para rejeição ou complemento.

---

### `InstitutionDocument` (`institution_documents`)
Documentos de comprovação cadastral.
- `id` (UUID): Identificador do documento.
- `institution_id` (String): Referência à instituição.
- `filename` (String): Nome original do arquivo enviado.
- `stored_path` (String): Caminho do armazenamento privado em disco (`uploads/institutions/:id/`).
- `mime_type` (String): Tipo MIME do arquivo (`application/pdf`, `image/png`, etc).

---

### `InstitutionUser` (`institution_users`)
Usuários cadastrados para operar o painel da instituição.
- `id` (UUID): Identificador do usuário.
- `institution_id` (String): Instituição vinculada.
- `email` (String Unique): E-mail corporativo/pessoal de login.
- `nome` (String): Nome do operador.
- `status` (Enum `InstitutionUserStatus`): `ATIVO`, `INATIVO`.

---

### `Opportunity` (`opportunities`)
Atividades oferecidas às adolescentes.
- `id` (UUID): Identificador da oportunidade.
- `institution_id` (String): Instituição proprietária.
- `titulo` / `descricao` (String): Dados de apresentação da oportunidade.
- `tipo` (Enum `OpportunityType`): `VOLUNTARIADO`, `ACAO_PONTUAL`, `GRUPO_DE_JOVENS`, `CURSO_PROFISSIONALIZANTE`, `CURSO_EDUCACIONAL`, `PALESTRA`, `OFICINA_TECNICA`, `FORMACAO_COMPLEMENTAR`, `OUTROS`.
- `ods` (Int[]): Mapeamento de ODS específicos da atividade.
- `faixa_etaria_alvo` (Enum `FaixaEtaria`): `DE_12_A_14`, `DE_15_A_17`, `DE_18`, `TODAS`.
- `frequencia` (Enum `Frequencia`): `PONTUAL`, `CONTINUA`.
- `data_inicio` / `data_fim` (DateTime Nullable): Período de realização.
- `modalidade` (Enum `Modalidade`): `PRESENCIAL`, `ONLINE`.
- `endereco` (String Nullable): Obrigatório se presencial.
- `link_online` (String Nullable): Obrigatório se online.
- `vagas` (Int Nullable): Limite de vagas (null para ilimitado).
- `ponto_contato` (String): E-mail ou formulário institucional de contato.
- `municipio_id` (String): Local da oferta (código IBGE).
- `criterio_conclusao` (String Nullable): Regra de conclusão se contínua.
- `status` (Enum `OpportunityStatus`): `RASCUNHO`, `EM_ANALISE`, `PUBLICADA`, `ENCERRADA`, `ARQUIVADA`.

---

### `Participation` (`participations`)
Vínculo entre o jovem e a oportunidade.
- `id` (UUID): Identificador da participação.
- `young_id` / `opportunity_id` (String): Vínculo único por jovem e oportunidade (`@@unique([young_id, opportunity_id])`).
- `status` (Enum `ParticipationStatus`): `INTERESSE_REGISTRADO`, `CONFIRMADA_PELA_INSTITUICAO`, `CERTIFICADO_EMITIDO`, `NAO_COMPARECEU`, `CANCELADA`.
- `codigo_checkin` (String Unique): Código curto de 6 caracteres alfanuméricos gerado automaticamente para validação presencial.
- `data_confirmacao` (DateTime Nullable): Data de confirmação.
- `confirmado_por_id` (String Nullable): Usuário institucional que confirmou a presença.

---

### `Credential` (`credentials`)
Representação off-chain da credencial ancorada na Stellar.
- `id` (UUID): Identificador da credencial.
- `participation_id` (String Unique): Referência à participação confirmada.
- `young_id` (String): Referência ao jovem proprietário.
- `dados_credencial` (Json): JSON no padrão Verifiable Credential W3C sem PII.
- `hash_ancorado` (String Unique): Hash SHA-256 de 64 caracteres hexadecimais enviado à blockchain.
- `tx_id` (String Nullable): Hash da transação Stellar confirmada.
- `block_number` (Int Nullable): Número do ledger na Stellar.
- `emissor` (String): Endereço público da carteira custodiante.
- `visibilidade` (Enum `Visibilidade`): `PUBLICA`, `PRIVADA`.
- `status` (Enum `CredentialStatus`): `ATIVA`, `PENDENTE_ANCORAGEM`, `REVOGADA`, `EXPIRADA`.

---

### `AuditLog` (`audit_logs`)
Trilha de auditoria imutável para ações críticas.
- `id` (UUID): Identificador do log.
- `ator_id` / `ator_tipo` (String): Identificação do executor (ex: Admin, InstitutionUser).
- `acao` (String): Nome da ação (ex: `INSTITUTION_DECISION_APROVADA`).
- `entidade_tipo` / `entidade_id` (String): Entidade afetada.
- `contexto` (Json Nullable): Metadados sem dados pessoais sensíveis.

---

### `Report` (`reports`)
Denúncias de irregularidades.
- `id` (UUID): Identificador da denúncia.
- `young_id` (String): Jovem autor da denúncia.
- `alvo_tipo` / `alvo_id` (String): "Institution" ou "Opportunity".
- `descricao` (String): Relato da ocorrência.
- `gravidade` (Enum `ReportGravidade`): `BAIXA`, `MEDIA`, `ALTA`, `CRITICA`.
- `status` (Enum `ReportStatus`): `ABERTA`, `EM_APURACAO`, `RESOLVIDA`, `ARQUIVADA`.
