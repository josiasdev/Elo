import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        yellow: 'bg-elociv-yellow text-elociv-navy border border-elociv-navy/10 shadow-xs',
        blue: 'bg-elociv-blue text-elociv-navy border border-elociv-navy/10',
        pink: 'bg-elociv-pink text-elociv-navy border border-elociv-navy/10',
        plum: 'bg-elociv-plum text-elociv-ivory',
        navy: 'bg-elociv-navy text-elociv-ivory',
        outline: 'border border-elociv-navy/20 text-elociv-navy bg-elociv-ivory/80',
      },
    },
    defaultVariants: {
      variant: 'yellow',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean
  dotColor?: 'pink' | 'blue' | 'yellow' | 'navy'
}

export function Badge({
  className,
  variant,
  showDot = true,
  dotColor = 'navy',
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', {
            'bg-elociv-navy': dotColor === 'navy',
            'bg-elociv-pink': dotColor === 'pink',
            'bg-elociv-blue': dotColor === 'blue',
            'bg-elociv-yellow': dotColor === 'yellow',
          })}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
