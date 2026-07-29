import type { MouseEvent } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Redireciona para a âncora com rolagem suave (smooth scroll) e impede que
 * o identificador ("#") apareça na barra de endereços do URL.
 */
export function scrollToAnchor(
  e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string,
  onAfterScroll?: () => void
) {
  e.preventDefault()
  const cleanId = targetId.replace(/^#/, '')
  const element = document.getElementById(cleanId)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    
    // Se a URL já contiver um "#", limpamos o hash da barra do navegador sem recarregar
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      )
    }
  }

  if (onAfterScroll) {
    onAfterScroll()
  }
}
