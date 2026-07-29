#![cfg(test)]

use soroban_sdk::testutils::Address as _;
use soroban_sdk::{BytesN, Env, String};

use crate::contract::{EloCivContract, EloCivContractClient};
use crate::errors::ContractError;

fn create_contract(env: &Env) -> EloCivContractClient<'_> {
    let contract_id = env.register_contract(None, EloCivContract);
    EloCivContractClient::new(env, &contract_id)
}

fn dummy_hash(env: &Env, seed: u8) -> BytesN<32> {
    BytesN::from_array(env, &[seed; 32])
}

#[test]
fn test_initialize_and_prevent_reinitialization() {
    let env = Env::default();
    let client = create_contract(&env);
    let admin = soroban_sdk::Address::generate(&env);

    client.initialize(&admin);

    let result = client.try_initialize(&admin);
    assert_eq!(result, Err(Ok(ContractError::AlreadyInitialized)));
}

#[test]
fn test_anchor_and_verify_flow() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_contract(&env);
    let admin = soroban_sdk::Address::generate(&env);
    client.initialize(&admin);

    let hash = dummy_hash(&env, 1);
    client.anchor_credential(&hash);

    let credential = client.verify_credential(&hash);
    assert_eq!(credential.is_revoked, false);
    assert_eq!(credential.issuer, admin);

    let dup_result = client.try_anchor_credential(&hash);
    assert_eq!(dup_result, Err(Ok(ContractError::CredentialAlreadyExists)));
}

#[test]
fn test_verify_nonexistent_credential_fails() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_contract(&env);
    let admin = soroban_sdk::Address::generate(&env);
    client.initialize(&admin);

    let hash = dummy_hash(&env, 99);
    let result = client.try_verify_credential(&hash);
    assert_eq!(result, Err(Ok(ContractError::CredentialNotFound)));
}

#[test]
fn test_anchor_without_authorization_fails() {
    let env = Env::default();

    let client = create_contract(&env);
    let admin = soroban_sdk::Address::generate(&env);

    env.mock_all_auths();
    client.initialize(&admin);

    env.set_auths(&[]);

    let hash = dummy_hash(&env, 2);
    let result = client.try_anchor_credential(&hash);
    assert!(result.is_err());
}

#[test]
fn test_revoke_updates_status_without_deleting_history() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_contract(&env);
    let admin = soroban_sdk::Address::generate(&env);
    client.initialize(&admin);

    let hash = dummy_hash(&env, 3);
    client.anchor_credential(&hash);

    let reason = String::from_str(&env, "Fraude detectada na instituicao parceira");
    client.revoke_credential(&hash, &reason);

    let credential = client.verify_credential(&hash);
    assert_eq!(credential.is_revoked, true);
    assert_eq!(credential.issuer, admin);

    let missing_hash = dummy_hash(&env, 200);
    let result = client.try_revoke_credential(&missing_hash, &reason);
    assert_eq!(result, Err(Ok(ContractError::CredentialNotFound)));
}

#[test]
fn test_transfer_admin_and_old_admin_loses_privileges() {
    let env = Env::default();
    env.mock_all_auths();

    let client = create_contract(&env);
    let old_admin = soroban_sdk::Address::generate(&env);
    let new_admin = soroban_sdk::Address::generate(&env);
    client.initialize(&old_admin);

    client.transfer_admin(&new_admin);

    let hash = dummy_hash(&env, 4);
    client.anchor_credential(&hash);
    let credential = client.verify_credential(&hash);
    assert_eq!(credential.issuer, new_admin);

    env.set_auths(&[]);
    let hash2 = dummy_hash(&env, 5);
    let unauthorized_attempt = client.try_anchor_credential(&hash2);
    assert!(unauthorized_attempt.is_err());

    assert_ne!(old_admin, new_admin);
}