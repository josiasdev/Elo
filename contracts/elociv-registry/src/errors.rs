use soroban_sdk::contracterror;

/// Erros do contrato, mapeados para `u32` para facilitar a conversao
/// em codigos HTTP no backend Node.js (Fastify/Express).
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    /// O contrato ja foi inicializado. Erro interno (500).
    AlreadyInitialized = 1,
    /// Quem chamou nao e o admin, ou o admin ainda nao foi definido. (403)
    NotAuthorized = 2,
    /// O hash informado nao existe no storage. (404)
    CredentialNotFound = 3,
    /// Ja existe uma credencial ancorada com esse hash. (409)
    CredentialAlreadyExists = 4,
}