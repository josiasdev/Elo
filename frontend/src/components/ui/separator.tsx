import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const separatorVariants = cva('w-full transition-colors', {
  variants: {
    variant: {
      default: 'border-t border-border',
      dotted: 'border-t-2 border-dotted border-elociv-navy/20',
      dashed: 'border-t border-dashed border-elociv-navy/30',
      bold: 'border-t-2 border-elociv-navy/40',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof separatorVariants> {}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(separatorVariants({ variant }), className)}
        role="separator"
        {...props}
      />
    )
  },
)
Separator.displayName = 'Separator'
