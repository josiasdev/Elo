import { randomInt } from 'crypto'
import { prisma } from '../lib/prisma.js'
import { logger } from '../lib/logger.js'
import { config } from '../config.js'

/**
 * Gera um código OTP de 6 dígitos e o persiste no banco.
 * No MVP, o código é exibido apenas no log do servidor (mock de e-mail).
 */
export async function generateOtp(email: string): Promise<string> {
  // Invalida OTPs anteriores não usados para este e-mail
  await prisma.otpCode.updateMany({
    where: { email, used: false },
    data: { used: true },
  })

  const code = String(randomInt(100000, 999999))
  const expires_at = new Date(Date.now() + config.OTP_TTL_MINUTES * 60 * 1000)

  await prisma.otpCode.create({
    data: { email, code, expires_at },
  })

  // MVP: exibe o código no log do servidor em vez de enviar e-mail
  logger.info(
    { email, code, expires_at },
    '[OTP MOCK] Código gerado — em produção, este código seria enviado por e-mail',
  )

  return code
}

/**
 * Valida um OTP. Retorna true se válido e marca como usado.
 * Incrementa o contador de tentativas e bloqueia após o limite.
 */
export async function validateOtp(
  email: string,
  code: string,
): Promise<{ valid: boolean; reason?: string }> {
  const otp = await prisma.otpCode.findFirst({
    where: { email, used: false },
    orderBy: { criado_em: 'desc' },
  })

  if (!otp) {
    return { valid: false, reason: 'Nenhum código ativo encontrado para este e-mail.' }
  }

  if (otp.expires_at < new Date()) {
    return { valid: false, reason: 'Código expirado.' }
  }

  if (otp.attempts >= config.OTP_MAX_ATTEMPTS) {
    return { valid: false, reason: 'Número máximo de tentativas atingido.' }
  }

  if (otp.code !== code) {
    await prisma.otpCode.update({
      where: { id: otp.id },
      data: { attempts: { increment: 1 } },
    })
    return { valid: false, reason: 'Código inválido.' }
  }

  await prisma.otpCode.update({
    where: { id: otp.id },
    data: { used: true },
  })

  return { valid: true }
}
