interface ConnectionPatternProps {
  decorative?: boolean
  label?: string
}

export function ConnectionPattern({
  decorative = true,
  label = 'Linhas de conexão entre territórios',
}: ConnectionPatternProps) {
  return (
    <svg
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      className="connection-pattern"
      role={decorative ? undefined : 'img'}
      viewBox="0 0 420 180"
    >
      <path className="connection-pattern__line" d="M28 92 C92 18 148 36 208 92" />
      <path
        className="connection-pattern__line connection-pattern__line--dashed"
        d="M208 92 C266 148 326 152 392 56"
      />
      <circle className="connection-pattern__node" cx="28" cy="92" r="10" />
      <circle className="connection-pattern__node" cx="208" cy="92" r="10" />
      <circle className="connection-pattern__node" cx="392" cy="56" r="10" />
    </svg>
  )
}
