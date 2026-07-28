import {
  rpc as SorobanRpc,
  TransactionBuilder,
  Networks,
  Keypair,
  Contract,
  scValToNative,
  xdr,
  BASE_FEE,
} from '@stellar/stellar-sdk'
import { config } from '../config.js'
import { logger } from '../lib/logger.js'

// Cliente RPC Soroban
const server = new SorobanRpc.Server(config.STELLAR_RPC_URL, {
  allowHttp: config.NODE_ENV !== 'production',
})

// Par de chaves do custodiante (emissor técnico único)
const issuerKeypair = Keypair.fromSecret(config.ELOCIV_ISSUER_SECRET_KEY)

// Referência ao contrato
const contract = new Contract(config.ELOCIV_CONTRACT_ID)

/**
 * Mapeia erros numéricos do ContractError para mensagens legíveis e HTTP status.
 * Baseado em contracts/elociv-registry/src/errors.rs
 */
const CONTRACT_ERRORS: Record<number, { message: string; httpStatus: number }> = {
  1: { message: 'Contrato já inicializado.', httpStatus: 500 },
  2: { message: 'Não autorizado. A conta não tem permissão.', httpStatus: 403 },
  3: { message: 'Credencial não encontrada para o hash informado.', httpStatus: 404 },
  4: { message: 'Já existe uma credencial registrada com este hash.', httpStatus: 409 },
}

export interface AnchorResult {
  tx_id: string
  ledger: number
}

/**
 * Ancora um hash SHA-256 (64 hex chars) no contrato elociv-registry.
 * Chama a função anchor_credential(hash: BytesN<32>).
 * Assina com a chave do custodiante.
 */
export async function anchorCredential(hashHex: string): Promise<AnchorResult> {
  // Converte o hash hex (64 chars) para Buffer de 32 bytes
  const hashBytes = Buffer.from(hashHex, 'hex')
  if (hashBytes.length !== 32) {
    throw new Error('Hash inválido: deve ter exatamente 32 bytes (64 hex chars)')
  }

  const account = await server.getAccount(issuerKeypair.publicKey())

  const hashScVal = xdr.ScVal.scvBytes(hashBytes)

  const operation = contract.call('anchor_credential', hashScVal)

  const networkPassphrase =
    config.STELLAR_NETWORK === 'mainnet'
      ? Networks.PUBLIC
      : Networks.TESTNET

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(operation)
    .setTimeout(30)
    .build()

  // Simula a transação para obter os dados de fee e footprint
  const preparedTx = await server.prepareTransaction(tx)
  preparedTx.sign(issuerKeypair)

  const result = await server.sendTransaction(preparedTx)

  if (result.status === 'ERROR') {
    logger.error({ result }, 'Erro ao enviar transação para Stellar')
    throw new Error(`Falha na transação Stellar: ${result.errorResult}`)
  }

  // Aguarda confirmação
  const confirmation = await waitForConfirmation(result.hash)

  logger.info(
    { hash: hashHex, tx_id: result.hash, ledger: confirmation.ledger },
    'Credencial ancorada com sucesso no Soroban',
  )

  return {
    tx_id: result.hash,
    ledger: confirmation.ledger,
  }
}

/**
 * Consulta o estado de uma credencial no contrato pelo hash.
 * Chama verify_credential(hash: BytesN<32>). Função pública, sem assinatura.
 */
export async function verifyCredentialOnChain(hashHex: string): Promise<{
  found: boolean
  is_revoked?: boolean
  timestamp?: number
  issuer?: string
}> {
  const hashBytes = Buffer.from(hashHex, 'hex')
  if (hashBytes.length !== 32) {
    return { found: false }
  }

  try {
    const hashScVal = xdr.ScVal.scvBytes(hashBytes)
    const operation = contract.call('verify_credential', hashScVal)

    const account = await server.getAccount(issuerKeypair.publicKey())
    const networkPassphrase =
      config.STELLAR_NETWORK === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(operation)
      .setTimeout(30)
      .build()

    const simulation = await server.simulateTransaction(tx)

    if (SorobanRpc.Api.isSimulationError(simulation)) {
      // CredentialNotFound (código 3) é esperado — não é erro interno
      logger.debug({ hashHex }, 'verify_credential: credencial não encontrada on-chain')
      return { found: false }
    }

    if (!simulation.result) {
      return { found: false }
    }

    const credential = scValToNative(simulation.result.retval) as {
      timestamp: bigint
      is_revoked: boolean
      issuer: string
    }

    return {
      found: true,
      is_revoked: credential.is_revoked,
      timestamp: Number(credential.timestamp),
      issuer: credential.issuer,
    }
  } catch (err) {
    logger.error({ err, hashHex }, 'Erro ao consultar credencial on-chain')
    return { found: false }
  }
}

/**
 * Aguarda a confirmação de uma transação submetida, fazendo polling no RPC.
 */
async function waitForConfirmation(
  txHash: string,
  maxAttempts = 15,
  intervalMs = 2000,
): Promise<{ ledger: number }> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await sleep(intervalMs)

    const response = await server.getTransaction(txHash)

    if (response.status === SorobanRpc.Api.GetTransactionStatus.SUCCESS) {
      return { ledger: response.ledger }
    }

    if (response.status === SorobanRpc.Api.GetTransactionStatus.FAILED) {
      throw new Error(`Transação ${txHash} falhou na rede Stellar`)
    }

    logger.debug({ txHash, attempt }, 'Aguardando confirmação da transação Stellar...')
  }

  throw new Error(`Timeout aguardando confirmação da transação ${txHash}`)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
