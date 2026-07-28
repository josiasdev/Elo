export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatSdgs(sdgs: readonly number[]): string {
  return sdgs.map((sdg) => `ODS ${sdg}`).join(', ')
}
