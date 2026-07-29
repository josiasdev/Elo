# Visão Geral do Projeto EloCiv

## O que é o EloCiv

O EloCiv é uma plataforma de tecnologia cívica voltada a adolescentes, com o objetivo de conectá-los a oportunidades de desenvolvimento em seus territórios — cursos, atividades em ONGs, oficinas e outras formas de participação social. A plataforma emite credenciais digitais verificáveis que compõem o chamado "currículo cívico" do jovem: um histórico portátil e auditável de suas participações, independente da continuidade de qualquer instituição específica.

O projeto foi desenvolvido para o UNICEF Youth Challenge Blockchain 2026.

## Problema que o Projeto Resolve

A participação de jovens em atividades sociais e educacionais é, em geral, fragmentada e invisível. Certificados e registros ficam retidos nas instituições emissoras, e são perdidos caso a organização encerre suas atividades ou o jovem mude de cidade. O EloCiv resolve essa fragmentação garantindo que as credenciais sejam ancoradas em uma blockchain pública, tornando-as:

- Portáteis: o jovem carrega seu histórico independente de qualquer ONG.
- Verificáveis: qualquer parte pode confirmar a autenticidade e o estado de uma credencial.
- Imutáveis quanto à prova de existência: uma credencial ancorada nunca é apagada, mesmo que seja revogada.

## Arquitetura Geral

O sistema EloCiv é composto por três camadas:

```
[Instituição Parceira]
        |
        | (envia dados da credencial via API privada)
        v
[Backend Node.js — Fastify/Express]  (planejado, não implementado neste repositório)
        |
        | (gera SHA-256 off-chain, assina e submete transação)
        v
[Smart Contract Soroban — elociv-registry]
        |
        | (armazena apenas o hash, timestamp e status)
        v
[Blockchain Stellar — Testnet / Futuramente Mainnet]
```

### Camada de Aplicação (planejada)

Um backend em Node.js (Fastify ou Express) será responsável por:

1. Receber os dados da credencial de instituições parceiras via API privada autenticada.
2. Gerar o hash SHA-256 dos dados da credencial, fora da blockchain.
3. Submeter apenas o hash ao smart contract Soroban, assinando a transação com a chave da conta custodiante.

O backend em Node.js não está implementado neste repositório. Os documentos desta pasta descrevem o smart contract e orientam a futura integração.

### Camada de Contrato (implementada)

O smart contract `elociv-registry`, escrito em Rust com o Soroban SDK, é a peça central já implementada neste repositório. Ele armazena o hash e metadados mínimos (timestamp, endereço do emissor, status de revogação) na blockchain Stellar.

## O Modelo de Custodiante Único

O EloCiv adota um modelo em que existe um único emissor técnico — chamado de admin ou custodiante — que detém autoridade sobre o contrato. Esse custodiante é o backend EloCiv, operado pela equipe do projeto.

Esse modelo implica que:

- Múltiplas instituições parceiras (ONGs, escolas, organizações) solicitam credenciais ao backend EloCiv.
- O backend valida a solicitação e, se aprovada, assina e submete a transação ao contrato usando a chave da conta custodiante.
- Do ponto de vista do contrato, há um único endereço autorizado a ancorar e revogar credenciais a qualquer momento.

A troca do custodiante é possível via a função `transfer_admin`, que transfere imediatamente os privilégios para um novo endereço e invalida o endereço anterior.

## Privacy by Design

O smart contract não armazena nenhum dado pessoal. O hash SHA-256 é uma representação matemática irreversível dos dados da credencial. A partir do hash sozinho, não é possível recuperar o nome do jovem, o nome da instituição, o tipo de atividade ou qualquer outra informação identificável.

O que fica registrado on-chain para cada credencial é:

| Campo      | Tipo       | Descrição                                               |
|------------|------------|---------------------------------------------------------|
| hash       | BytesN<32> | Chave do registro (SHA-256 dos dados, gerado off-chain) |
| timestamp  | u64        | Timestamp do ledger no momento da ancoragem             |
| is_revoked | bool       | Indica se a credencial foi revogada                     |
| issuer     | Address    | Endereço do admin que ancorou a credencial              |

Nunca deve ser enviado ao contrato: nome do jovem, data de nascimento, CPF, e-mail, nome da instituição em texto claro ou qualquer outro dado que permita identificação direta ou indireta de uma pessoa.

## Papel do Smart Contract no Sistema

O contrato cumpre uma função deliberadamente restrita:

1. Provar que um determinado hash existia em um determinado momento (timestamp de ledger).
2. Indicar se essa prova foi subsequentemente revogada pelo custodiante.
3. Registrar qual endereço realizou a ancoragem.

O contrato não valida os dados da credencial, não conhece o conteúdo do hash e não tem relação com a identidade do jovem. Toda a lógica de negócio (autenticação de instituições, validação de dados, geração do hash) reside no backend.
