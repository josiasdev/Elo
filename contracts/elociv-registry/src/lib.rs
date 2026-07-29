#![no_std]

mod contract;
mod errors;
mod storage;
mod types;
mod test;

pub use contract::{EloCivContract, EloCivContractClient};
pub use errors::ContractError;
pub use types::Credential;