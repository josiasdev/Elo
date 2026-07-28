# Especificação de APIs (Endpoints REST)

O backend disponibiliza uma API RESTful formatada em JSON.

---

## Autenticação e Segurança

A autenticação é realizada via cabeçalho HTTP standard:

```http
Authorization: Bearer <TOKEN_JWT>
```

---

## 1. Módulo Autenticação (`/auth`)

### `POST /auth/request-code`
Solicita a geração e envio de um código OTP de 6 dígitos para o e-mail fornecido.

**Requisição**:
```json
{
  "email": "jovem@exemplo.com",
  "role": "young"
}
```
*(Valores aceitos em `role`: `"young"`, `"institution_user"`, `"admin"`)*

**Resposta (200 OK)**:
```json
{
  "message": "Se este e-mail estiver cadastrado, um código foi enviado."
}
```

---

### `POST /auth/verify-code`
Valida o OTP digitado pelo usuário e emite o token JWT de acesso.

**Requisição**:
```json
{
  "email": "jovem@exemplo.com",
  "code": "123456",
  "role": "young"
}
```

**Resposta (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. Módulo Jovem (`/young`)

### `POST /young`
Cadastra um novo jovem no sistema (dados mínimos + consentimento).

**Requisição**:
```json
{
  "email": "jovem@exemplo.com",
  "ano_nascimento": 2009,
  "municipio_id": "1302603",
  "apelido": "jovem_amazonia",
  "interesses": ["TECNOLOGIA", "EDUCACAO"],
  "consentimento_versao": "1.0"
}
```

**Resposta (201 Created)**:
```json
{
  "id": "c62b5d40-8a21-4f9e-a031-1b2c3d4e5f6a",
  "email": "jovem@exemplo.com",
  "ano_nascimento": 2009,
  "municipio_id": "1302603",
  "apelido": "jovem_amazonia",
  "interesses": ["TECNOLOGIA", "EDUCACAO"],
  "status": "ATIVO",
  "criado_em": "2026-07-28T20:00:00.000Z"
}
```

---

### `GET /young/me`
Retorna o perfil do jovem autenticado (Exige JWT `role: "young"`).

---

### `PATCH /young/me`
Atualiza preferências, apelido ou opt-in do jovem.

---

## 3. Módulo Instituição (`/institutions`)

### `POST /institutions`
Cadastra uma nova organização parceira (inicia com status `PENDENTE`).

**Requisição**:
```json
{
  "nome": "Instituto Filadélfia da Amazônia",
  "cnpj": "31767100000171",
  "categoria": "ONG",
  "descricao": "Acolher, cuidar e transformar comunidades através da educação e tecnologia.",
  "ods": [1, 4, 10, 17],
  "responsavel_nome": "Maria Silva",
  "responsavel_email": "contato@filadelfia.org",
  "responsavel_cargo": "Diretora",
  "municipios_atuacao": ["1302603"]
}
```

---

### `POST /institutions/:id/documents`
Upload de documento comprobatório (`multipart/form-data`).

---

## 4. Módulo Administração (`/admin`)

### `GET /admin/institutions?status=pending`
Lista instituições aguardando análise de cadastro (Exige JWT `role: "admin"`).

---

### `POST /admin/institutions/:id/decision`
Registra decisão de aprovação, rejeição ou complemento sobre uma instituição.

**Requisição**:
```json
{
  "decisao": "APROVADA",
  "motivo": "Documentação CEBAS e CNPJ validados com sucesso."
}
```

---

## 5. Módulo Oportunidades (`/opportunities`)

### `POST /opportunities`
Cria uma oportunidade de participação (Exige JWT `role: "institution_user"` de instituição `APROVADA`).

**Requisição**:
```json
{
  "titulo": "Oficina de Introdução ao Desenvolvimento Web",
  "descricao": "Curso prático de HTML, CSS e lógica de programação para jovens da Colônia Terra Nova.",
  "tipo": "CURSO_PROFISSIONALIZANTE",
  "ods": [4, 10],
  "faixa_etaria_alvo": "DE_15_A_17",
  "frequencia": "CONTINUA",
  "data_inicio": "2026-08-01T00:00:00.000Z",
  "data_fim": "2026-10-30T00:00:00.000Z",
  "modalidade": "PRESENCIAL",
  "endereco": "Rua Amos, 151 — Colônia Terra Nova, Manaus/AM",
  "vagas": 25,
  "ponto_contato": "contato@filadelfia.org",
  "municipio_id": "1302603",
  "criterio_conclusao": "Presença mínima de 75% nas oficinas"
}
```

---

### `GET /opportunities`
Busca pública de oportunidades com filtros opcionais: `municipio_id`, `tipo`, `ods`, `faixa_etaria`, `modalidade`, `page`, `limit`.

---

## 6. Módulo Participação (`/participations`)

### `POST /opportunities/:id/interest`
Registra interesse em uma oportunidade (Exige JWT `role: "young"`). Retorna o código curto de check-in de 6 caracteres.

---

### `GET /institution/opportunities/:id/interests`
Lista os interessados em uma oportunidade (Exige JWT `role: "institution_user"`). Exibe apenas e-mail e faixa etária derivada dos inscritos.

---

### `POST /participations/:id/confirm`
Confirma a conclusão da participação pelo operador da ONG.

---

## 7. Módulo Credenciais e Ancoragem (`/credentials`)

### `POST /credentials/:id/anchor`
Emite o JSON no formato Verifiable Credential W3C, calcula o hash SHA-256 e envia a transação de ancoragem para o smart contract Soroban.

---

### `GET /credentials/:id/verify`
Retorna a credencial completa e executa a consulta on-chain no contrato para demonstrar a prova de existência.

---

## 8. Módulo Carteira (`/wallet`)

### `GET /wallet/public/:slug`
Endpoint de acesso público que renderiza o "currículo cívico" do jovem contendo apenas as credenciais marcadas como `PUBLICA`. Nunca exibe e-mail ou dados de contato.

---

## 9. Módulo Analytics (`/analytics`)

### `GET /analytics/territories`
Retorna os indicadores territoriais agregados por município (oportunidades ativas, funil de engajamento, ODS cobertos e ODS ausentes).
