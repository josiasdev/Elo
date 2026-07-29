import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-2xl transition-all duration-200 overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-elociv-ivory border-2 border-elociv-navy/15 hover:border-elociv-navy/40 text-elociv-navy p-6 md:p-8 shadow-sm hover:shadow-md',
        surface:
          'bg-elociv-blue/15 border border-elociv-blue/30 text-elociv-navy p-6 md:p-8 shadow-sm',
        navy: 'bg-elociv-navy text-elociv-ivory p-6 md:p-8 shadow-md border border-elociv-ivory/10',
        plum: 'bg-elociv-plum text-elociv-ivory p-6 md:p-8 shadow-md',
        outline:
          'bg-transparent border border-border text-elociv-navy p-6 md:p-8 hover:border-elociv-navy/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    )
  },
)
Card.displayName = 'Card'
