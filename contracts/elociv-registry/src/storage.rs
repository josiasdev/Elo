use soroban_sdk::{symbol_short, Address, BytesN, Env, Symbol};

use crate::errors::ContractError;
use crate::types::Credential;

/// Chave usada no Instance Storage para o endereco do admin.
const ADMIN_KEY: Symbol = symbol_short!("ADMIN");

/// TTL (em ledgers) estendido a cada escrita no Instance Storage.
const INSTANCE_TTL_THRESHOLD: u32 = 100_000;
const INSTANCE_TTL_EXTEND_TO: u32 = 100_000;

/// TTL (em ledgers) estendido a cada escrita em uma credencial no
/// Persistent Storage. Provas de existencia nao devem expirar.
const CREDENTIAL_TTL_THRESHOLD: u32 = 500_000;
const CREDENTIAL_TTL_EXTEND_TO: u32 = 500_000;

/// Retorna true se o admin ja foi configurado.
pub fn has_admin(env: &Env) -> bool {
    env.storage().instance().has(&ADMIN_KEY)
}

/// Define o admin e estende o TTL da instance storage.
pub fn set_admin(env: &Env, admin: &Address) {
    env.storage().instance().set(&ADMIN_KEY, admin);
    env.storage()
        .instance()
        .extend_ttl(INSTANCE_TTL_THRESHOLD, INSTANCE_TTL_EXTEND_TO);
}

/// Busca o admin atual. Retorna `NotAuthorized` se ainda nao foi definido.
pub fn get_admin(env: &Env) -> Result<Address, ContractError> {
    env.storage()
        .instance()
        .get(&ADMIN_KEY)
        .ok_or(ContractError::NotAuthorized)
}

/// Retorna true se ja existe uma credencial ancorada para esse hash.
pub fn has_credential(env: &Env, hash: &BytesN<32>) -> bool {
    env.storage().persistent().has(hash)
}

/// Busca uma credencial pelo hash. Retorna `CredentialNotFound` se nao existir.
pub fn get_credential(env: &Env, hash: &BytesN<32>) -> Result<Credential, ContractError> {
    env.storage()
        .persistent()
        .get(hash)
        .ok_or(ContractError::CredentialNotFound)
}

/// Salva (cria ou atualiza) uma credencial e estende seu TTL.
pub fn set_credential(env: &Env, hash: &BytesN<32>, credential: &Credential) {
    env.storage().persistent().set(hash, credential);
    env.storage().persistent().extend_ttl(
        hash,
        CREDENTIAL_TTL_THRESHOLD,
        CREDENTIAL_TTL_EXTEND_TO,
    );
}