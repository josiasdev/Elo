use soroban_sdk::{contract, contractimpl, symbol_short, Address, BytesN, Env, String};

use crate::errors::ContractError;
use crate::storage;
use crate::types::Credential;

#[contract]
pub struct EloCivContract;

#[contractimpl]
impl EloCivContract {
    /// Configura o admin inicial (emissor tecnico/custodiante).
    /// So pode ser chamada uma unica vez.
    pub fn initialize(env: Env, admin: Address) -> Result<(), ContractError> {
        if storage::has_admin(&env) {
            return Err(ContractError::AlreadyInitialized);
        }

        storage::set_admin(&env, &admin);

        Ok(())
    }

    /// Registra um hash inedito de credencial (SHA-256 gerado off-chain).
    /// Exige autorizacao do admin.
    pub fn anchor_credential(env: Env, hash: BytesN<32>) -> Result<(), ContractError> {
        let admin = storage::get_admin(&env)?;
        admin.require_auth();

        if storage::has_credential(&env, &hash) {
            return Err(ContractError::CredentialAlreadyExists);
        }

        let credential = Credential {
            timestamp: env.ledger().timestamp(),
            is_revoked: false,
            issuer: admin.clone(),
        };

        storage::set_credential(&env, &hash, &credential);

        env.events()
            .publish((symbol_short!("anchor"), hash), credential.timestamp);

        Ok(())
    }

    /// Retorna os dados de uma credencial pelo hash.
    pub fn verify_credential(env: Env, hash: BytesN<32>) -> Result<Credential, ContractError> {
        storage::get_credential(&env, &hash)
    }

    /// Marca uma credencial como revogada, sem apagar o historico.
    /// Exige autorizacao do admin.
    pub fn revoke_credential(
        env: Env,
        hash: BytesN<32>,
        reason: String,
    ) -> Result<(), ContractError> {
        let admin = storage::get_admin(&env)?;
        admin.require_auth();

        let mut credential = storage::get_credential(&env, &hash)?;
        credential.is_revoked = true;

        storage::set_credential(&env, &hash, &credential);

        env.events()
            .publish((symbol_short!("revoke"), hash), reason);

        Ok(())
    }

    /// Transfere a titularidade do contrato para um novo admin.
    /// Exige autorizacao do admin atual.
    pub fn transfer_admin(env: Env, new_admin: Address) -> Result<(), ContractError> {
        let current_admin = storage::get_admin(&env)?;
        current_admin.require_auth();

        storage::set_admin(&env, &new_admin);

        env.events()
            .publish((symbol_short!("transfer"), current_admin), new_admin);

        Ok(())
    }
}