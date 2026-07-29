import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full bg-elociv-blue text-elociv-navy font-heading font-bold overflow-hidden border-2 border-elociv-navy shrink-0 shadow-sm',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 text-sm',
        md: 'h-14 w-14 text-lg',
        lg: 'h-20 w-20 text-2xl',
      },
      variant: {
        blue: 'bg-elociv-blue text-elociv-navy',
        yellow: 'bg-elociv-yellow text-elociv-navy',
        pink: 'bg-elociv-pink text-elociv-navy',
        plum: 'bg-elociv-plum text-elociv-ivory border-elociv-ivory',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'blue',
    },
  },
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  initials?: string
  src?: string
  alt?: string
}

export function Avatar({
  className,
  size,
  variant,
  initials,
  src,
  alt,
  ...props
}: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size, variant }), className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-label={alt ? `Avatar com iniciais de ${alt}` : undefined}>
          {initials || '?'}
        </span>
      )}
    </div>
  )
}
