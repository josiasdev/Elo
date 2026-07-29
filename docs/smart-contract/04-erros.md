# Erros do Contrato

## Enum `ContractError`

Definido em `contracts/elociv-registry/src/errors.rs`:

```rust
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    AlreadyInitialized    = 1,
    NotAuthorized         = 2,
    CredentialNotFound    = 3,
    CredentialAlreadyExists = 4,
}
```

A anotação `#[contracterror]` do Soroban SDK instrui o compilador a tratar cada variante como um código de erro numérico `u32`. Quando uma função retorna `Err(ContractError::X)`, o Soroban host converte esse valor para um erro de contrato identificável na resposta da transação na Stellar.

## Tabela de Erros

| Variante                | Valor u32 | Descrição                                              | HTTP sugerido |
|-------------------------|-----------|--------------------------------------------------------|---------------|
| `AlreadyInitialized`    | 1         | O contrato já foi inicializado. Tentativa de chamar `initialize` novamente. | 500 Internal Server Error |
| `NotAuthorized`         | 2         | O endereço que assinou a transação não é o admin, ou o admin ainda não foi configurado. | 403 Forbidden |
| `CredentialNotFound`    | 3         | Não existe credencial registrada com o hash informado. | 404 Not Found |
| `CredentialAlreadyExists` | 4       | Já existe uma credencial com esse hash no storage. Ancoragem duplicada. | 409 Conflict  |

## Mapeamento HTTP para o Backend

O comentário no código-fonte de `errors.rs` indica explicitamente o mapeamento previsto:

```
/// Erros do contrato, mapeados para u32 para facilitar a conversão
/// em códigos HTTP no backend Node.js (Fastify/Express).
```

O backend deve inspecionar o código numérico de erro retornado pela transação e mapeá-lo para a resposta HTTP correspondente:

| ContractError u32 | Resposta HTTP sugerida      | Mensagem de resposta sugerida                                   |
|-------------------|-----------------------------|------------------------------------------------------------------|
| 1                 | 500 Internal Server Error   | "Contrato já inicializado. Operação inválida."                   |
| 2                 | 403 Forbidden               | "Não autorizado. A conta não tem permissão para esta operação."  |
| 3                 | 404 Not Found               | "Credencial não encontrada para o hash informado."               |
| 4                 | 409 Conflict                | "Já existe uma credencial registrada com este hash."             |

## Observações sobre `NotAuthorized` (código 2)

O erro `NotAuthorized` com código 2 é retornado pelo contrato em duas situações distintas:

1. O contrato ainda não foi inicializado e uma chamada a `anchor_credential`, `revoke_credential` ou `transfer_admin` foi feita — pois `storage::get_admin` retorna `NotAuthorized` quando não há admin configurado.
2. A chamada foi assinada por uma conta diferente do admin atual — nesse caso, `require_auth` lança um erro de host do Soroban antes mesmo do código do contrato ser executado. Esse erro de host não é necessariamente o `ContractError::NotAuthorized`, mas é também um erro de autorização da perspectiva da rede.

O backend deve tratar ambos os casos como 403 na camada HTTP.

## Erros de Host vs Erros de Contrato

Quando `require_auth` falha (porque a transação não foi assinada corretamente), o Soroban host lança um erro de host nativo, não um `ContractError`. Esse erro aparece na resposta da transação com um código de erro distinto do `u32` de `ContractError`. O backend deve tratar erros de host de autorização como equivalentes ao 403 na camada HTTP.
