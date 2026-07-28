import type { MouseEventHandler, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type BrandButtonVariant = 'primary' | 'secondary' | 'ghost'

interface BrandButtonBaseProps extends PropsWithChildren {
  variant?: BrandButtonVariant
  className?: string
  ariaLabel?: string
  disabled?: boolean
}

type BrandButtonAsRoute = BrandButtonBaseProps & {
  to: string
  href?: never
}

type BrandButtonAsAnchor = BrandButtonBaseProps & {
  href: string
  to?: never
  rel?: string
  target?: string
}

type BrandButtonAsButton = BrandButtonBaseProps & {
  href?: never
  to?: never
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

type BrandButtonProps = BrandButtonAsRoute | BrandButtonAsAnchor | BrandButtonAsButton

function getButtonClassName(
  variant: BrandButtonVariant,
  className: string | undefined,
) {
  return `brand-button brand-button--${variant} ${className ?? ''}`
}

export function BrandButton(props: BrandButtonProps) {
  const { ariaLabel, children, disabled, variant = 'primary', className } = props
  const buttonClassName = getButtonClassName(variant, className)

  if ('to' in props && props.to !== undefined) {
    return (
      <Link
        aria-disabled={disabled ? 'true' : undefined}
        aria-label={ariaLabel}
        className={buttonClassName}
        to={props.to}
      >
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    return (
      <a
        aria-disabled={disabled ? 'true' : undefined}
        aria-label={ariaLabel}
        className={buttonClassName}
        href={props.href}
        rel={props.rel}
        target={props.target}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      aria-label={ariaLabel}
      className={buttonClassName}
      disabled={disabled}
      onClick={props.onClick}
      type={props.type ?? 'button'}
    >
      {children}
    </button>
  )
}
