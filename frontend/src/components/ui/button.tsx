import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-heading font-semibold rounded-xl text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-elociv-navy text-elociv-ivory hover:bg-elociv-navy/90 shadow-md hover:shadow-lg',
        secondary:
          'bg-elociv-blue text-elociv-navy hover:bg-elociv-blue/90 shadow-sm',
        outline:
          'border-2 border-elociv-navy text-elociv-navy hover:bg-elociv-navy hover:text-elociv-ivory',
        ghost: 'text-elociv-navy hover:bg-elociv-navy/5',
        negative:
          'bg-elociv-ivory text-elociv-navy hover:bg-elociv-ivory/90 shadow-md hover:shadow-lg',
        plum: 'bg-elociv-plum text-elociv-ivory hover:bg-elociv-plum/90 shadow-md',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base tracking-wide',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
