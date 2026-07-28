use soroban_sdk::{contracttype, Address};

/// Representa uma credencial ancorada on-chain.
///
/// Privacy by design: nenhum dado pessoal (nome, e-mail, etc.) e
/// armazenado aqui. Apenas o hash (usado como chave no storage) e
/// metadados minimos de prova de existencia/integridade.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Credential {
    /// Timestamp do ledger no momento da ancoragem.
    pub timestamp: u64,
    /// Indica se a credencial foi revogada. O registro nunca e apagado.
    pub is_revoked: bool,
    /// Endereco do emissor tecnico (admin) que ancorou a credencial.
    pub issuer: Address,
}