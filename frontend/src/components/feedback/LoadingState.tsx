interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Carregando' }: LoadingStateProps) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
